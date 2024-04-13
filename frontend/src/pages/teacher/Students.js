import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { Table, message } from "antd";
import { useNavigate } from "react-router-dom";

const Students = () => {
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate;
    const getDoctors = async () => {
      try {
        const res = await axios.get("/api/v1/teacher/getAllStudents", {
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
  
    // handle account
    const handleAccountStatus = async (record, status) => {
      try {
        const res = await axios.post(
          "/api/v1/teacher/changeStudentStatus",
          { studentId : record._id,  
            status: status },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.success) {
          message.success(res.data.message);
          //window.location.reload();
          navigate("/");
        }
      } catch (error) {
        message.error("Something Went Wrong");
      }
    };
  
    useEffect(() => {
      getDoctors();
    }, []);
  
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        render: (text, record) => (
          <span>
            {record.firstName} {record.lastName}
          </span>
        ),
      },
      {
        title: "Status",
        dataIndex: "status",
      },
      {
        title: "Batch",
        dataIndex: "batch",
      },
      {
        title: "Actions",
        dataIndex: "actions",
        render: (text, record) => (
          <div className="d-flex">
            {record.status === "pending" ? (
              <button
                className="btn btn-success"
                onClick={() => handleAccountStatus(record, "approved")}
              >
                Approve
              </button>
            ) : (
              <button className="btn btn-danger">Reject</button>
            )}
          </div>
        ),
      },
    ];
  
    return (
      <Layout>
        <h1 className="text-center m-3">All Students</h1>
        <Table columns={columns} dataSource={doctors} />
      </Layout>
    );
};

export default Students;