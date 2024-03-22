import express from "express";
import { Course } from "../models/course.js"; // Import the Course model

const router = express.Router();

router.post("/courses", async (req, res) => {
  const { name, description, teacher } = req.body;

  try {
    // Create a new course instance
    const newCourse = new Course({
      name,
      description,
      teacher,
    });

    // Save the course to the database
    await newCourse.save();

    // Send a success response
    res.status(201).json({ success: true, message: 'Course created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export { router as coursesRouter };
