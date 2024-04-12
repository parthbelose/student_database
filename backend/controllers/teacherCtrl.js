import { user } from "../models/user.js";
import { Teacher } from "../models/teacher.js";
import { Course } from "../models/course.js";
import { Student } from "../models/student.js";

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

const CourseSelection = async (req, res) => {
  const newCourseData = { ...req.body };
  try {
    const newCourse = await Course.create(newCourseData);
    res.status(201).json({ success: true, message: 'Course created successfully', data: newCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const changeAccountStudentController = async (req, res) => {
  try {
    const { studentId, status } = req.body;
    const student = await Student.findByIdAndUpdate(studentId, { status });
    console.log(student)
    const users = await user.findOne({ _id: student.userId });
    console.log(users)
    let notification = users.notification || [];
    notification.push({
      type: "student-account-request-updated",
      message: `Your Student Account Request Has ${status} `,
      onClickPath: "/notification",
    });
    users.isStudent === "approved" ? true : false;
    await users.save();
    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: student,
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

export { getTeacherInfoController, updateProfileController, CourseSelection, changeAccountStudentController };