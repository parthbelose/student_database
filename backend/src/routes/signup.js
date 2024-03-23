import express from "express";
const router = express.Router();
import { user } from "../models/user.js";
import { Teacher } from "../models/teacher.js";
import { Student } from "../models/student.js";
import bcrypt from 'bcrypt';

router.post("/signup", async (req, res) => {
    console.log(req.body)
    const { email, password, role } = req.body;
    try {
        // Check if user already exists
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // // Create a new user instance
         const newUser = new user({
             email,
             password: hashedPassword,
             role
         });
         await newUser.save();
         if (role === 'teacher') {
            const newTeacher = new Teacher({
                user: newUser._id,
            });
            await newTeacher.save();
        }
        if (role === 'student') {
            const newStudent = new Student({
                user: newUser._id,
            });
            await newStudent.save();
        }
        res.status(201).json({ 
            success: true,
            message: 'Signed up successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export { router as signupRouter };
