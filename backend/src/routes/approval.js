import express from "express";
import { Student } from "../models/student.js";

const router = express.Router();

// Endpoint for the teacher to update the approval status
router.put("/students/:id/approval", async (req, res) => {
  const { id } = req.params;
  const { approvalStatus } = req.body;

  try {
    // Find the student by ID
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Update the approval status
    student.approvalStatus = approvalStatus;

    // Save the updated student data
    await student.save();

    res.status(200).json({ message: "Approval status updated successfully", student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating approval status", error: error.message });
  }
});

export { router as updateApprovalStatusRouter };