import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { Table, Button, message } from "antd";
import { useNavigate, Link } from "react-router-dom";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [student, setStudent] = useState(null);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");  

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
        }
    };

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
        }
    };

    useEffect(() => {
        getStudentInfo();
        getCourses();
    }, []);

    const enrollInCourse = async (record) => { // Pass the entire record object
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
                        faculty: record.faculty
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (res.data.success) {
                message.success("Enrolled in course successfully!");
                getStudentInfo();  // Refresh student info and enrolled courses
            } else {
                message.error(res.data.message || "Failed to enroll in course");
            }
        } catch (error) {
            console.error(error);
            message.error("Failed to enroll in course");
        }
    };
    
  
      const isEnrolled = (courseId) => {
          return student?.enrolledCourses?.includes(courseId);
      };
  
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
                <Button type="primary" onClick={() => enrollInCourse(record)} disabled={isEnrolled(record.id)}>
                    {isEnrolled(record.id) ? "Enrolled" : "Enroll"}
                </Button>
            ),
        },
      ];
  
      return (
          <Layout>
              <h1 className="text-center m-3">COURSES</h1>
              <Table columns={columns} dataSource={courses} rowKey="id" />
          </Layout>
      );
  };

export default Courses;
