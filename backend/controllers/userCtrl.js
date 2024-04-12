import express from "express";
import bcrypt  from 'bcrypt';
import  jwt from 'jsonwebtoken' ;
import { user } from "../models/user.js";
import { Teacher } from "../models/teacher.js";
import { Student } from "../models/student.js";

const loginController = async (req, res) => {
    try {
        // Find user by email
        const existingUser = await user.findOne({ email: req.body.email });
        if (!user) {
          return res
            .status(200)
            .send({ message: "user not found", success: false });
        }
        const isMatch = await bcrypt.compare(req.body.password, existingUser.password);
        if (!isMatch) {
          return res
            .status(200)
            .send({ message: "Invalid EMail or Password", success: false });
        }
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1d",  });
        res.status(200).json({
            success: true,
            message: 'Logged in successfully',
         //   user: {   id: existingUser._id,  email: existingUser.email,  role: existingUser.role  }
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
    }
};

const registerController = async (req, res) => {
    try {
        const exisitingUser = await user.findOne({ email: req.body.email });
        if (exisitingUser) {
          return res
            .status(200)
            .send({ message: "User Already Exist", success: false });
        }
        // Hash the password
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
       // Create a new user instance
       const newUser = new user(req.body);
       await newUser.save();
        res.status(201).json({ 
            success: true,
            message: 'Signed up successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const authController = async (req, res) => {
    try {
      const users = await user.findById({ _id: req.body.userId });
      users.password = undefined;
      if (!users) {
        return res.status(200).send({
          message: "user not found",
          success: false,
        });
      } else {
        res.status(200).send({
          success: true,
          data: users,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "auth error",
        success: false,
        error,
      });
    }
  };

const applyTeacherController = async (req, res) => {
    try {
      const newTeacherData = { ...req.body, status: "pending" };
      const newTeacher = await Teacher.create(newTeacherData); 

      const userId = req.body.userId; 
      const users = await user.findById(userId);
      if (!users) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      users.isTeacher = true;
      await users.save();

      const adminUser = await user.findOne({ isAdmin: true });

      let notification = adminUser.notification || [];
      notification.push({
        type: "apply-teacher-request",
        message: `${newTeacher.firstName} ${newTeacher.lastName} Has Applied For A Teacher Account`,
        data: {
          TeacherId: newTeacher._id,
          name: newTeacher.firstName + " " + newTeacher.lastName,
          onClickPath: "/admin/teachers",
        },
      });
      await user.findByIdAndUpdate(adminUser._id, { notification });
      res.status(201).send({
        success: true,
        message: "Teacher Account Applied Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error WHile Applying For Teacher",
      });
    }
  };

const applyStudentController = async (req, res) => {
    try {
      const newStudentData = { ...req.body, status: "pending" };
      const newStudent = await Student.create(newStudentData); 

      const userId = req.body.userId; 
      const users = await user.findById(userId);
      if (!users) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      users.isStudent = true;
      await users.save();

      const adminUser = await user.findOne({ isAdmin: true });

      let notification = adminUser.notification || [];
      notification.push({
        type: "apply-student-request",
        message: `${newStudent.firstName} ${newStudent.lastName} Has Applied For A Student Account`,
        data: {
          TeacherId: newStudent._id,
          name: newStudent.firstName + " " + newStudent.lastName,
          onClickPath: "/teacher/students",
        },
      });
      await user.findByIdAndUpdate(adminUser._id, { notification });
      res.status(201).send({
        success: true,
        message: " Account Applied Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error WHile Applying For Student",
      });
    }
  };

const getAllNotificationController = async (req, res) => {
  try {
    const cuser = await user.findOne({ _id: req.body.userId });
    const seennotification = cuser.seen_notification;
    const notification = cuser.notification;
    seennotification.push(...notification);
    cuser.notification = [];
    cuser.seen_notification = notification;
    const updatedUser = await cuser.save();
    res.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in notification",
      success: false,
      error,
    });
  }
};

const deleteAllNotificationController = async (req, res) => {
  try {
    const users = await user.findOne({ _id: req.body.userId });
    users.notification = [];
    users.seen_notification = [];
    const updatedUser = await users.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notifications Deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to delete all notifications",
      error,
    });
  }
};

export { loginController, registerController, authController,applyStudentController, applyTeacherController, getAllNotificationController, deleteAllNotificationController };