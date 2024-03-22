import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  ],
  Name: { type: String },
  Id: { type: Number },
  Birthdate: { type: Number },
  Address: { type: String },
  Gender: { type: String },
  Status:  { type: String },
  Photo:{ type: String }
},
{ timestamps: true }
);

export const Student = mongoose.model('Student', userSchema);