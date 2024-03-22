import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  faculty: { type: String },
  courses: [{
    type: mongoose.Types.ObjectId,
    ref: "Course",
  }],
}, { timestamps: true });

export const Teacher = mongoose.model('Teacher', userSchema);
