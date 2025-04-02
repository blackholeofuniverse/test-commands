import express from "express"
import { login } from "../controllers/auth/login.controller.js"
import { register } from "../controllers/auth/register.controller.js"
import protectedRoute from "../middlewares/auth.middleware.js" // Add this import

const router = express.Router()

// Public routes
router.get('/register', register)
router.get('/login', login)

// Protected routes
router.get('/protected', protectedRoute, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user })
})

// You can add more protected routes like this:
// router.get('/profile', protectedRoute, profileController)
// router.put('/settings', protectedRoute, updateSettingsController)

export default router