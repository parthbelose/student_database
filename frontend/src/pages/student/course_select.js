import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, message, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import Layout from "./../../components/Layout";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // Fetch all courses
  const getCourses = async () => {
    try {
      const res = await axios.get("/api/v1/teacher/getAllCourses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setCourses(res.data.data);
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch courses");
    }
  };

  // Fetch student information
  const getStudentInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/student/getStudentInfo",
        { userId: userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setStudent(res.data.data);
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch student information");
    }
  };

  useEffect(() => {
    getStudentInfo();
    getCourses();
  }, []);

  // Enroll in a course
  const enrollInCourse = async (record) => {
    if (!student) {
      message.error("Student details not found!");
      return;
    }

    try {
      const res = await axios.post(
        "/api/v1/student/student-courses",
        {
          userId: student.userId,
          courseData: {
            course_name: record.course_name,
            semester: record.semester,
            year: record.year,
            faculty: record.faculty,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success("Enrolled in course successfully!");
        // Refresh student info and enrolled courses
        await getStudentInfo();
      } else {
        message.error(res.data.message || "Failed to enroll in course");
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to enroll in course");
    }
  };

  // Check if student is enrolled in a course
  const isEnrolled = (courseId) => {
    return student?.enrolledCourses?.includes(courseId);
  };

  // Define columns for the Table component
  const columns = [
    {
      title: "Course",
      dataIndex: "course_name",
    },
    {
      title: "Semester",
      dataIndex: "semester",
    },
    {
      title: "Year",
      dataIndex: "year",
    },
    {
      title: "Faculty",
      dataIndex: "faculty",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => enrollInCourse(record)}
          disabled={isEnrolled(record._id)} 
        >
          {isEnrolled(record._id) ? "Enrolled" : "Enroll"} 
        </Button>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-3">COURSES</h1>
      <Table columns={columns} dataSource={courses} rowKey="_id" />
    </Layout>
  );
};

export default Courses;
