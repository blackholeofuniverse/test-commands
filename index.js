import express from 'express'
import { config } from "dotenv"
import authRouter from "./routers/auth.router.js"

config()

const app = express()

app.use('/api/auth', authRouter)

const PORT = process.env.PORT

app.get('/', (req, res) => {
    res.send("Hello there!")
})

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})