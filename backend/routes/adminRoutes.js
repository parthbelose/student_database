import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {getAllTeachersController, getAllUsersController, changeAccountStatusController} from '../controllers/adminCtrl.js';

const router = express.Router();

//GET METHOD || USERS
router.get("/getAllUsers", authMiddleware, getAllUsersController);

//GET METHOD || Teachers
router.get("/getAllTeachers", authMiddleware, getAllTeachersController);

//POST ACCOUNT STATUS
router.post( "/changeAccountStatus",  authMiddleware,   changeAccountStatusController );

export { router };