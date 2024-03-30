import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  name: { type: String },
  regNumber: { type: Number },
  birthdate: { type: String },
  address: { type: String },
  year: { type: Number },
  gender: { type: String },
  status: { type: String },
  enrolledCourses: [{ type: String  }],
}, { timestamps: true });

export const Student = mongoose.model('Student', userSchema);
