import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  teacher: {
    type: mongoose.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
}, { timestamps: true });

export const Course = mongoose.model('Course', courseSchema);
