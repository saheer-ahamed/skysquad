import jwt from "jsonwebtoken";


const maxAge = 3 * 24 * 60 * 60;
//create token
export const createToken = ({ _id, mobile, fullname }) => {
    return jwt.sign({ _id, fullname, mobile }, process.env.JWT_KEY, {
        expiresIn: maxAge,
    });
};


export const jwtVerify = (token) => {
    const slicedToken = token.slice(1, -1)
    return jwt.verify(slicedToken, process.env.JWT_KEY, (err, decode) => {
        if (err) return false;
        return decode;
    })
}