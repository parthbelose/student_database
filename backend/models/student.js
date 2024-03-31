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
  enrolledCourses: [{ type: String  }],
}, { timestamps: true });

export const Student = mongoose.model('Student', userSchema);


