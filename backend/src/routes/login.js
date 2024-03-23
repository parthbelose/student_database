import express from "express";
const router = express.Router();
import { user } from "../models/user.js";
import bcrypt from 'bcrypt';

router.post("/login", async (req, res) => {
    const { email, password, role } = req.body;
    try {
        // Find user by email
        const existingUser = await user.findOne({ email });
        console.log(existingUser)
        // Check if user exists
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Verify password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        // Check user role
        if (existingUser.role !== role) {
            return res.status(403).json({ message: 'Unauthorized role' });
        }
        
        // If all checks pass, user is logged in successfully
        res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            user: {
                id: existingUser._id,
                email: existingUser.email,
                role: existingUser.role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
    }
});

export { router as loginRouter };