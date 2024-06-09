import express from "express";
import { Course } from "../models/course.js"; 
import { Student } from "../models/student.js";

const getStudentInfoController = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "student data fetch success",
      data: student,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching Student Details",
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Student Profile Updated"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Student Profile Update issue",
      error,
    });
  }
};

const updateEnrolledCourses = async (req, res) => {
  try {
    console.log(req.body);
    const { userId, courseData} = req.body;
    
    const student = await Student.findOne({userId: userId});

    if (!student) {
      return res.status(404).send({ success: false, message: 'Student not found' });
    }

    const course = await Course.findOne({ course_name: courseData.course_name });

    if (!course) {
      return res.status(400).send({ success: false, message: 'Course not found' });
    }

    student.enrolledCourses.push(course._id); 
    await student.save();

    res.status(201).send({ success: true, message: 'Enrolled courses updated successfully', data: courseData });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal server error' });
  }
};

export { updateEnrolledCourses, getStudentInfoController, updateProfileController };