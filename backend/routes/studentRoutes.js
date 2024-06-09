import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { updateEnrolledCourses, getStudentInfoController, updateProfileController } from "../controllers/studentCtrl.js";

const router = express.Router();

//POST SINGLE Student INFO
router.post("/getStudentInfo", authMiddleware, getStudentInfoController);

//POST STUDENT COURSES
router.post( "/student-courses",  authMiddleware, updateEnrolledCourses );

//POST UPDATE PROFILE
router.post("/updateProfile", authMiddleware, updateProfileController); 

export { router };