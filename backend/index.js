import express from 'express'
import { config } from "dotenv"
import authRouter from "./routers/auth.router.js"
import { connectToDatabase } from './lib/db.js'
import protectedRoute from './middlewares/auth.middleware.js'
import cors from "cors"

config()

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter)

const PORT = process.env.PORT

app.get('/', protectedRoute, (req, res) => {
    res.send("Hello there!")
})

app.listen(PORT, async () => {
    console.log(`server listening on http://localhost:${PORT}`)
    await connectToDatabase()
})