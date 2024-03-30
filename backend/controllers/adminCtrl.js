import { user } from "../models/user.js";
import { Teacher } from "../models/teacher.js";

const getAllUsersController = async (req, res) => {
  try {
    const users = await user.find({});
    res.status(200).send({
      success: true,
      message: "users data list",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "erorr while fetching users",
      error,
    });
  }
};

const getAllTeachersController = async (req, res) => {
  try {
    const doctors = await Teacher.find({});
    res.status(200).send({
      success: true,
      message: "Teachers Data list",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting teachers data",
      error,
    });
  }
};

export { getAllTeachersController, getAllUsersController };