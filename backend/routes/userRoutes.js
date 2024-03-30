import express from "express";
import { loginController, registerController,authController,applyTeacherController,getAllNotificationController } from "../controllers/userCtrl.js";
import { authMiddleware  } from "../middlewares/authMiddleware.js";

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

//Notifiaction Teacher || POST
router.post("/get-all-notification", authMiddleware, getAllNotificationController );

export { router };