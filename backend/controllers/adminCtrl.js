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

const changeAccountStatusController = async (req, res) => {
  try {
    const { teacherId, status } = req.body;
    const teacher = await Teacher.findByIdAndUpdate(teacherId, { status });
    const users = await user.findOne({ _id: teacher.userId });
    let notification = users.notification || [];
    notification.push({
      type: "teacher-account-request-updated",
      message: `Your Teacher Account Request Has ${status} `,
      onClickPath: "/notification",
    });
    users.isTeacher === "approved" ? true : false;
    await users.save();
    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: teacher,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror in Account Status",
      error,
    });
  }
};

export { getAllTeachersController, getAllUsersController, changeAccountStatusController };