// import { Student } from "../models/student.js";

// // Controller function for student registration
// export const registerStudent = async (req, res) => {
//   try {
//     const { name, id, birthdate, address, gender, status, photo } = req.body;
//     const newStudent = new Student({
//       name,
//       id,
//       birthdate,
//       address,
//       gender,
//       status,
//       photo,
//     });
//     await newStudent.save();
//     res.status(201).json({ message: "Student registered successfully", student: newStudent });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error registering student", error: error.message });
//   }
// };

// // Controller function for teacher approval
// export const approveRegistration = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedStudent = await Student.findByIdAndUpdate(id, { status: "approved" }, { new: true });
//     if (!updatedStudent) {
//       return res.status(404).json({ message: "Student not found" });
//     }
//     res.status(200).json({ message: "Student registration approved", student: updatedStudent });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error approving registration", error: error.message });
//   }
// };