import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  course_name: { type: String, required: true },
  semester: { type: String, required: true },
  year: { type: String, required: true },
  faculty: {  type: String, required: true },
}, { timestamps: true });

export const Course = mongoose.model('Course', courseSchema);
