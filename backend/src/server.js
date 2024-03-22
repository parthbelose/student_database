// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { reviewRouter } from "./routes/review.js";
import { signupRouter } from "./routes/signup.js";
import { loginRouter } from "./routes/login.js";
import { updateApprovalStatusRouter } from "./routes/approval.js"; 
import { registerStudentRouter } from  './routes/studentinfo.js';
const app = express();
app.use(cors());
app.use(express.json());

// Update your MongoDB connection URI with the correct database name
const mongoURI = "mongodb+srv://prj:prj1122@storage.totbn5d.mongodb.net/myDatabaseName?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  
app.use(reviewRouter)
app.use(signupRouter)
app.use(loginRouter)
app.use(updateApprovalStatusRouter)
app.use(registerStudentRouter)

app.listen(3001, () => console.log("Server started"));
