// backend/server.js
import express from "express";
import mongoose from "mongoose";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import { router as userRoutes } from "./routes/userRoutes.js";
import { router as adminRoutes } from "./routes/adminRoutes.js";
import { router as teacherRoutes } from "./routes/teacherRoutes.js";
import { router as studentRoutes } from "./routes/studentRoutes.js";
import { Course } from "./models/course.js";
import {connectDB} from "./config/db.js";

//dotenv conig
dotenv.config();

//connect to database
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/teacher", teacherRoutes);
app.use("/api/v1/student", studentRoutes);

app.get('/api/v1/courses/:id', async (req, res) => {
  try {
      const courseId = req.params.id;
      const course = await Course.findById(courseId);
      
      // Check if the course exists
      if (!course) {
          return res.status(404).json({ success: false, message: 'Course not found' });
      }
      
      // If the course exists, return it
      return res.status(200).json({ success: true, data: course });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

//port
const port = process.env.PORT || 3000;
//listen port
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});
