// backend/server.js
import express from "express";
import mongoose from "mongoose";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import { router as userRoutes } from "./routes/userRoutes.js";
// import { reviewRouter } from "./routes/review.js";
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
// app.use(reviewRouter)
// app.use(signupRouter)
// app.use(loginRouter)
// app.use(updateApprovalStatusRouter)
// app.use(registerStudentRouter)
// app.use("/", registerStudentRouter);


//port
const port = process.env.PORT || 3001;
//listen port
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});
