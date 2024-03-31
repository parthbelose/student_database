import { user } from "../models/user.js";
import { Teacher } from "../models/teacher.js";

const getTeacherInfoController = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "teacher data fetch success",
      data: teacher,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching Teacher Details",
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const teacher = await Teacher.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Teacher Profile Updated"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Teacher Profile Update issue",
      error,
    });
  }
};

export { getTeacherInfoController, updateProfileController };