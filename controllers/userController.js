import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registration = async (req, res) => {
    try {
        const {email, password} = req.body
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            return res.status(400).json({message: "Пользователь с таким именем или почтой уже существует"})
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const doc = new UserModel({
            email,
            password: hash,
        })
        const user = await doc.save()
        const token = jwt.sign({
            _id: user._id
        }, process.env.JWT_ACCESS_SECRET, {expiresIn: '30d'})

        res.json({user, token})
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Не удалось зарегистрироваться',
        });
    }
}


export const login = async (req, res) => {
    try {

    } catch (e) {

    }
}