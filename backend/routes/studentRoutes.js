import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { updateEnrolledCourses } from "../controllers/studentCtrl.js";

const router = express.Router();

//POST STUDENT COURSES
router.post( "/student-courses",  authMiddleware, updateEnrolledCourses );

export { router };