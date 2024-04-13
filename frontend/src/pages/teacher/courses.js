import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { Table, message } from "antd";
import { useNavigate, Link } from "react-router-dom";

const Courses = () => {
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate;
    const getDoctors = async () => {
      try {
        const res = await axios.get("/api/v1/teacher/getAllCourses", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data.success) {
          setDoctors(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getDoctors();
    }, []);
  
    const columns = [
      {
        title: "Course",
        dataIndex: "course_name",
        render: (text, record) => (
          <span>
            {record.course_name} 
          </span>
        ),
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
    ];
  
    return (
      <Layout>
        <h1 className="text-center m-3">COURSES</h1>
        <Table columns={columns} dataSource={doctors} />
        <Link to="/teacher/add-courses">ADD COURSES</Link>
      </Layout>
    );
};

export default Courses;