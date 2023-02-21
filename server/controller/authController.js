import User from "../model/User.js";
import bcrypt from "bcrypt"
import { sendOtp, verifyOtp } from "../utils/twilio.js";
import { jwtVerify,createToken } from "../utils/jwt.js";

//error handler
const handleErrors = (err) => {
  let error = { phoneNumber: "", password: "" };
  if (err.code === 11000) {
    error.phoneNumber = "phone number already in use";
    return error;
  }
  if (err.message.includes("User validation failed")) {
    // to take values only form object
    Object.values(err.errors).forEach(({ properties }) => {
      console.log(properties);
      error[properties.path] = properties.message;
    });
  }
  if (err.message === "incorrect phone number") {
    error.email = "phone number not registered";
  }
  if (err.message === "incorrect password") {
    error.password = " password is incorrect";
  }
  return error;
};

const isPhoneNumber = /^(\+91|\+91\-|0)?[6789]\d{9}$/;
const isPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/;



//create new user

export const signupPost = async (req, res) => {
  let { phoneNumber, password, fullName } = req.body;
  try {
    if (!isPhoneNumber.test(phoneNumber)) {
        return res.status(400).json({ message: "Invalid phone number" }); 
    }
    if (!isPassword.test(password)) {
      return res.status(400).json({ message: "At least include one letter or number" });
    } 
    

    const user = await User.create({
      phoneNumber,
      password,
      fullName
    });
    const isOtp = sendOtp(phoneNumber);
      if (!isOtp) return res.status(500).json(500).send("Internal Server Error");
    //   console.log(user);
    const token = createToken(user);
    res
      .status(200)
      .json({ user,token});
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

export const resendOtp = (req, res) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

  try {
    const userToken = authHeader.split(" ")[1];
    const validToken = jwtVerify(userToken)
    if (!validToken) return res.sendStatus(403);
    const { phoneNumber } = validToken;
    const isOtp = sendOtp(phoneNumber);
    if (!isOtp) return res.status(500).json(500).send("Internal Server Error");
    res.status(200).json({status:"success"})
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}

export const loginPost =async (req, res) => {
  const { phoneNumber, password } = req.body;
  try {
    const user = await User.findOne({ phoneNumber, verified: true })
    if (!user) throw Error('incorrect phone number')
    if(!user.verified) return res.status(400).json({status:"phone number not verified"})
    const auth = await bcrypt.compare(password,user.password)
  if (!auth) throw Error('incorrect password')
    
        
    const token = createToken(user);
    res.status(200).json({ user,token});
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
}
export const postVerifyOtp = async (req, res) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
    const { otp } = req.body;
  try {
    const userToken = authHeader.split(" ")[1];
    const validToken = jwtVerify(userToken)
    if (!validToken) return res.sendStatus(403);
    const { _id, phoneNumber } = validToken;
    const isCheck = await verifyOtp(phoneNumber, otp)
    if (!isCheck) return res.status(400).json({ error: "Incorrect otp" });
    const user = await User.findOne({ _id });
    user.verified = true;
    const result = await user.save();
    const token= createToken(result)
        res.status(200).json({status:"success",token,user})

        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}