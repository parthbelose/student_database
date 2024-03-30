import express from "express";
import bcrypt  from 'bcrypt';
import  jwt from 'jsonwebtoken' ;
import { user } from "../models/user.js";
import { Teacher } from "../models/teacher.js";

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
      const user = await userModel.findById({ _id: req.body.userId });
      user.password = undefined;
      if (!user) {
        return res.status(200).send({
          message: "user not found",
          success: false,
        });
      } else {
        res.status(200).send({
          success: true,
          data: user,
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
      const newTeacher = await Teacher({ ...req.body, status: "pending" });
      await newTeacher.save();
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

export { loginController, registerController, authController, applyTeacherController, getAllNotificationController };