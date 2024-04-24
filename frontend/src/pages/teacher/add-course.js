import React from "react";
import "../../styles/CourseStyles.css";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import axios from "axios";
import Layout from "../../components/Layout";
const AddCourse = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

    const onfinishHandler = async (values) => {
        try {
          dispatch(showLoading());
          const res = await axios.post(
            "/api/v1/teacher/course-selection",
            { ...values },
                //, userId: user._id },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          dispatch(hideLoading());
          if (res.data.success) {
            message.success(res.data.success);
            navigate("/");
          } else {
            message.error(res.data.success);
          }
        } catch (error) {
          dispatch(hideLoading());
          console.log(error);
          message.error("Somthing Went Wrrong ");
        }
      };
  return (
    <Layout>
    <div className="form-container ">
      <Form
        layout="vertical"
        onFinish={onfinishHandler}
        className="register-form"
      >
        <h3 className="text-center">Add Course From</h3>

        <Form.Item label="Course Name" name="course_name">
        <Input type="text" required />
        </Form.Item>
        <Form.Item label="Year" name="year">
        <Input type="text" required />
        </Form.Item>
        <Form.Item label="Semester" name="semester">
        <Input type="text" required />
        </Form.Item>
        <Form.Item label="Faculty" name="faculty">
        <Input type="text" required />
        </Form.Item>
        <Link to="/teacher/courses" className="m-2">
          View Courses
        </Link>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </Form>
    </div>
    </Layout>
  );
};

export default AddCourse;