import jwt from "jsonwebtoken";


const maxAge = 3 * 24 * 60 * 60;
//create token
export const createToken = ({_id,phoneNumber,fullName}) => {
    return jwt.sign({ _id,fullName ,phoneNumber}, process.env.JWT_KEY, {
      expiresIn: maxAge,
    });
};


export const jwtVerify = (token) => {
    return jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
        if (err) return false;
        return decode;
    })
}