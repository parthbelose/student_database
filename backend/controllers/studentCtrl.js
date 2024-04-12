import express from "express";
import { Course } from "../models/course.js"; 
import { Student } from "../models/student.js";

const updateEnrolledCourses = async (req,res) => {
    try {
      const courseData = { ...req.body };
      const studentid = req.body.studentId;
      const student = await Student.findById(studentid);
  
      if (!student) {
        return { success: false, message: 'Student not found' };
      }

      student.enrolledCourses.push(courseData);
      await student.save();
  
      res.status(201).send({ success: true, message: 'Enrolled courses updated successfully',data: courseDataourse });
    } catch (error) {
      console.error(error);
      res.status(500).send({ success: false, message: 'Internal server error' });
    }
  };
  

export { updateEnrolledCourses };