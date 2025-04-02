import express from "express"
import { login } from "../controllers/auth/login.controller.js"
import { register } from "../controllers/auth/register.controller.js"

const router = express.Router()

router.get('/register', register)

router.get('/login', login)

export default router