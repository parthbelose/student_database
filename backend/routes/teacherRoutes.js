import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getTeacherInfoController, updateProfileController,CourseSelection,changeAccountStudentController,getAllStudentsController, getAllCoursesController } from '../controllers/teacherCtrl.js';

const router = express.Router();

//POST SINGLE Teacher INFO
router.post("/getTeacherInfo", authMiddleware, getTeacherInfoController);

//POST UPDATE PROFILE
router.post("/updateProfile", authMiddleware, updateProfileController);

//POST SINGLE Course
router.post("/course-selection", authMiddleware, CourseSelection);

//GET METHOD || Students
router.get("/getAllStudents", authMiddleware, getAllStudentsController);

//GET METHOD || Courses
router.get("/getAllCourses", authMiddleware,  getAllCoursesController);

//POST ACCOUNT STATUS
router.post( "/changeStudentStatus",  authMiddleware, changeAccountStudentController );

export { router };