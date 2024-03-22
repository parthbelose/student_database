import express from "express";
import { Student } from "../models/student.js";

const router = express.Router();

router.put("/students/:id/update", async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
  
    try {
      // Find the student by ID
      const student = await Student.findById(id);
  
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      // Update student information with the submitted data
      Object.assign(student, updatedData);
  
      // Save the updated student data
      await student.save();
  
      res.status(200).json({ message: "Student information updated successfully", student });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating student information", error: error.message });
    }
  });

export { router as registerStudentRouter };
