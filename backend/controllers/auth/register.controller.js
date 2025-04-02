import { connectToDatabase } from "../../lib/db.js"
import User from "../../models/user.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            })
        }

        await connectToDatabase()

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please login or use another email"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({ username, email, password: hashedPassword })

        const token = jwt.sign({ email, user: newUser._id }, process.env.JWT_SECRET)

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        })

        res.redirect('/')

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