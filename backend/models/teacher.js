import mongoose from "mongoose";

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
  phone: {
    type: String,
    required: [true, "phone no is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  specialization: {
    type: String,
    required: [true, "specialization is require"],
  },
  experience: {
    type: String,
    required: [true, "experience is required"],
  },
  status: {
    type: String,
    default: "pending",
  },
}, { timestamps: true });

export const Teacher = mongoose.model('Teacher', userSchema);


