import mongoose from "mongoose"
import { config } from "dotenv"
config()

const MONGODB_URI = process.env.MONGODB_URI

export const connectToDatabase = async () => {
    try {
        const connection = await mongoose.connect(MONGODB_URI)
        console.log(`Connected to Database: ${connection.connection.name}`)
    } catch (error) {
        console.log("Error connecting to database", error)
    }
}