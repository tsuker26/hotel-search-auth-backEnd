import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    return jwt.sign({
        _id: user._id
    }, process.env.JWT_ACCESS_SECRET, {expiresIn: '30d'})
}