import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  name: { type: String },
  id: { type: Number },
  birthdate: { type: Number },
  address: { type: String },
  gender: { type: String },
  status: { type: String },
  photo: { type: String },
  enrolledCourses: [{
    type: mongoose.Types.ObjectId,
    ref: "Course",
  }],
}, { timestamps: true });

export const Student = mongoose.model('Student', userSchema);
