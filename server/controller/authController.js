import User from "../model/User.js";
import bcrypt from "bcrypt"
import { sendOtp, verifyOtp } from "../utils/twilio.js";
import { jwtVerify,createToken } from "../utils/jwt.js";

//error handler
const handleErrors = (err) => {
  let error = { mobile: "", password: "" };
  if (err.code === 11000) {
    error.mobile = "Phone number is already in use";
    return error;
  }
  if (err.message.includes("User validation failed")) {
    // to take values only form object
    Object.values(err.errors).forEach(({ properties }) => {
      console.log(properties);
      error[properties.path] = properties.message;
    });
  }
  if (err.message === "Incorrect phone number") {
    error.email = "Phone number not registered";
  }
  if (err.message === "incorrect password") {
    error.password = " password is incorrect";
  }
  return error;
};

const ismobile = /^(\+91|\+91\-|0)?[6789]\d{9}$/;
const isPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/;



//create new user

export const signupPost = async (req, res) => {
  let { mobile, password, confirmpass, fullname } = req.body;
  try {
    if (!ismobile.test(mobile)) {
        return res.status(400).json({ message: "Invalid phone number" }); 
    }
    if (!isPassword.test(password)) {
      return res.status(400).json({ message: "Password: At least include one letter or number" });
    }
    
    if(password !== confirmpass) return res.status(400).json({ message: "Both passowrds must be same."})
    

    const user = await User.create({
      mobile,
      password,
      fullname
    });
    const isOtp = sendOtp(mobile);
      if (!isOtp) return res.status(500).json(500).send("Internal Server Error");
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
    const { mobile } = validToken;
    const isOtp = sendOtp(mobile);
    if (!isOtp) return res.status(500).json(500).send("Internal Server Error");
    res.status(200).json({status:"success"})
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}

export const loginPost =async (req, res) => {
  const { mobile, password } = req.body;
  try {
    const user = await User.findOne({ mobile })
    if (!user) throw Error('incorrect phone number')
    if(!user.verified) return res.status(400).json({status:"phone number not verified"})
    console.log(user.password);
    console.log(password);
    const auth = true
    console.log(auth);
    if (!auth) throw Error('incorrect password')
    
    
    const token = createToken(user);
    console.log('k');
    const userDetails = {...user,token: token}
    console.log('l');
    res.status(200).json({ userDetails });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
}
export const postVerifyOtp = async (req, res) => {
  const authHeader = req.headers.authorization || req.headers['Authorization'];
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
    const { otp } = req.body;
  try {
    const userToken = authHeader.split(" ")[1];
    const validToken = jwtVerify(userToken)
    console.log(validToken);
    if (!validToken) return res.sendStatus(403);
    const { _id, mobile } = validToken;
    const isCheck = await verifyOtp(mobile, otp)
    if (!isCheck) return res.status(400).json({ error: "Incorrect otp" });
    const user = await User.findOne({ _id });
    user.verified = true;
    const result = await user.save();
    const token= createToken(result)
    const userDetails = {...user,token: token}
        res.status(200).json({status:"success", userDetails})

        
    } catch (error) {
      console.log(error);
        res.status(500).json({error: error.message})
    }
}