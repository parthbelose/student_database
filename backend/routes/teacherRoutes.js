import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getTeacherInfoController, updateProfileController } from '../controllers/teacherCtrl.js';

const router = express.Router();

//POST SINGLE Teacher INFO
router.post("/getTeacherInfo", authMiddleware, getTeacherInfoController);

//POST UPDATE PROFILE
router.post("/updateProfile", authMiddleware, updateProfileController);

export { router };