// backend/server.js
import express from "express";
import mongoose from "mongoose";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import { router as userRoutes } from "./routes/userRoutes.js";
import { router as adminRoutes } from "./routes/adminRoutes.js";
import { router as teacherRoutes } from "./routes/teacherRoutes.js";
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


//port
const port = process.env.PORT || 3000;
//listen port
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});
