import React from "react";
import Layout from "./../components/Layout";
import { Col, Form, Input, Row, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";

const ApplyStudent = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/apply-student",
        { ...values, userId: user._id },
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
      <h1 className="text-center">Apply Student</h1>
      <Form layout="vertical" onFinish={handleFinish} className="m-3">
        <h4 className="">Personal Details : </h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your first name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Last Name"
              name="lastName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your last name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="reg-no"
              name="regNumber"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your registration no" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your address" />
            </Form.Item>
          </Col>
        </Row>
        <h4>Professional Details :</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Batch"
              name="batch"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your batch" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
            <button className="btn btn-primary form-btn" type="submit">
              Submit
            </button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default ApplyStudent;
// import React from 'react';
// import { Form, Input, Select, Button, message } from 'antd';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { showLoading, hideLoading } from '../redux/features/alertSlice';
// import axios from 'axios';
// import Layout from "./../components/Layout";
// import '../styles/apply_student.css'
// const { Option } = Select;

// const ApplyStudent = () => {
//   const { user } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleFinish = async (values) => {
//     try {
//       dispatch(showLoading());
//       const res = await axios.post(
//         '/api/v1/user/apply-student',
//         { ...values, userId: user._id },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );
//       dispatch(hideLoading());
//       if (res.data.success) {
//         message.success(res.data.success);
//         navigate('/');
//       } else {
//         message.error(res.data.success);
//       }
//     } catch (error) {
//       dispatch(hideLoading());
//       console.error(error);
//       message.error('Something went wrong.');
//     }
//   };

//   return (
//     <Layout className="container">
//     <div >
//       <h1>Student Registration</h1>
//       <div className="sections">
//         <div className="form-section left-section">
//           <Form id="left-form" layout="vertical" onFinish={handleFinish}>
//             <Form.Item
//               label="Name"
//               name="name"
//               required
//               rules={[{ required: true }]}
//             >
//               <Input id="name" type="text" />
//             </Form.Item>

//             <Form.Item
//               label="Registration Number"
//               name="regNumber"
//               required
//               rules={[{ required: true }]}
//             >
//               <Input id="reg-number" type="text" />
//             </Form.Item>

//             <Form.Item
//               label="Birthdate"
//               name="birthdate"
//               required
//               rules={[{ required: true }]}
//             >
//               <Input id="birthdate" type="date" />
//             </Form.Item>

//             <Form.Item
//               label="Address"
//               name="address"
//               required
//               rules={[{ required: true }]}
//             >
//               <Input id="address" type="text" />
//             </Form.Item>
//           </Form>
//         </div>

//         <div className="form-section right-section">
//           <Form id="right-form" layout="vertical">
//             <Form.Item
//               label="Gender"
//               name="gender"
//               required
//               rules={[{ required: true }]}
//             >
//               <Select id="gender">
//                 <Option value="male">Male</Option>
//                 <Option value="female">Female</Option>
//                 <Option value="other">Other</Option>
//               </Select>
//             </Form.Item>

//             <Form.Item
//               label="Status"
//               name="status"
//               required
//               rules={[{ required: true }]}
//             >
//               <Select id="status">
//                 <Option value="local">Local</Option>
//                 <Option value="hostelite">Hostelite</Option>
//               </Select>
//             </Form.Item>

//             <Form.Item label="Photo (optional)" name="photo">
//               <Input id="photo" type="file" />
//             </Form.Item>

//             <Button type="submit" className="register-button" htmlType="submit">
//               Register
//             </Button>
//           </Form>
//         </div>
//       </div>
//     </div>
//     </Layout>
//   );
// };

// export default ApplyStudent;
