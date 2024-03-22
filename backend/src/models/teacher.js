import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  ],
  faculty: {
    type: String
  }
},
{ timestamps: true }
);

export const Teacher = mongoose.model('Teacher', userSchema);