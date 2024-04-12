import mongoose from "mongoose";
import {Course} from "./course.js";

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  firstName: {
    type: String,
    required: [true, "first name is required"],
  },
  lastName: {
    type: String,
    required: [true, "last name is required"],
  },
  regNumber: { 
    type: Number,
    required: [true, "registration number is required"],
  },
  address: {
     type: String,
     required: [true, "Address is required"], 
    },
  batch: {
    type: String,
    required: [true, "Batch is required"], 
    },
    status: {
      type: String,
      default: "pending",
    },
    enrolledCourses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }],
}, { timestamps: true });

export const Student = mongoose.model('Student', userSchema);


