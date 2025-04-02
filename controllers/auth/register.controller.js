import { connectToDatabase } from "../../lib/db"
import User from "../../models/user.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export const register = async (req, res) => {
    try {

        const { username, email, password } = req.body

        await connectToDatabase()

        const user = User.find({ email })

        if (user) {
            res.status(400).json({
                success: false,
                message: "User already exists. Please login or use another email"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = User.create({ username, email, password: hashedPassword })

        const token = jwt.sign({ email, user: newUser._id }, process.env.JWT_SECRET)

        req.cookie("token", token)

        if (!newUser) {
            res.status(400).json({
                success: false,
                message: "Error creating user"
            })
        }

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            token,
            user: newUser
        })

    } catch (error) {
        console.log("Error in register control", error);
        res.status(500).json({
            success: false,
            message: "Error in register control",
            error: error.message
        })
    }
}