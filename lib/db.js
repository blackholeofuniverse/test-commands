import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

export const connectToDatabase = async () => {
    try {
        const connection = await mongoose.connect(MONGODB_URI)
        console.log(`Connected to Database: ${connection.name}`)
    } catch (error) {
        console.log("Error connecting to database", error)
    }
}