import express from "express";
import { Course } from "../models/course.js"; 
import { Student } from "../models/student.js";

const updateEnrolledCourses = async (req, res) => {
  try {
    const { studentId, ...courseData } = req.body;

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).send({ success: false, message: 'Student not found' });
    }

    // Find the course document based on course name only
    const course = await Course.findOne({ course_name: courseData.course_name });

    if (!course) {
      return res.status(400).send({ success: false, message: 'Course not found' });
    }

    student.enrolledCourses.push(course._id); // Push the course ID

    await student.save();

    res.status(201).send({ success: true, message: 'Enrolled courses updated successfully', data: courseData });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal server error' });
  }
};

 

export { updateEnrolledCourses };