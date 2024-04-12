import express from "express";
import { loginController, registerController, authController, applyTeacherController, getAllNotificationController, deleteAllNotificationController,applyStudentController } from "../controllers/userCtrl.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//Auth || POST
router.post("/getUserData", authMiddleware, authController);

//Apply Teacher || POST
router.post("/apply-teacher", authMiddleware, applyTeacherController);

//Apply Student || POST
router.post("/apply-student", authMiddleware, applyStudentController);

//Notifiaction Teacher || POST
router.post("/get-all-notification", authMiddleware, getAllNotificationController );

//Notifiaction  Doctor || POST
router.post("/delete-all-notification",authMiddleware,deleteAllNotificationController);

export { router };