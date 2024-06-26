// import React from "react";
// import Layout from "./../components/Layout";
// import { message, Tabs, Button, Card } from "antd";
// import { useSelector, useDispatch } from "react-redux";
// import { showLoading, hideLoading } from "../redux/features/alertSlice";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { motion } from 'framer-motion';

// const NotificationPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.user);

//   // Handle marking all notifications as read
//   const handleMarkAllRead = async () => {
//     try {
//       dispatch(showLoading());
//       const res = await axios.post(
//         "/api/v1/user/get-all-notification",
//         { userId: user._id },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       dispatch(hideLoading());
//       if (res.data.success) {
//         message.success(res.data.message);
//       } else {
//         message.error(res.data.message);
//       }
//     } catch (error) {
//       dispatch(hideLoading());
//       console.log(error);
//       message.error("Something went wrong");
//     }
//   };

//   // Handle deleting all read notifications
//   const handleDeleteAllRead = async () => {
//     try {
//       dispatch(showLoading());
//       const res = await axios.post(
//         "/api/v1/user/delete-all-notification",
//         { userId: user._id },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       dispatch(hideLoading());
//       if (res.data.success) {
//         message.success(res.data.message);
//       } else {
//         message.error(res.data.message);
//       }
//     } catch (error) {
//       dispatch(hideLoading());
//       console.log(error);
//       message.error("Something went wrong");
//     }
//   };

//   return (
//     <Layout>
//       <h4 className="p-3 text-center">Notification Page</h4>
//       <Tabs defaultActiveKey="1" centered>
//         <Tabs.TabPane tab="Unread" key="1">
//           <div className="d-flex justify-content-end">
//             <Button type="link" onClick={handleMarkAllRead}>
//               Mark All Read
//             </Button>
//           </div>
//           {user?.notification.map((notification, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//             >
//               <Card
//                 hoverable
//                 style={{ marginBottom: "10px", cursor: "pointer" }}
//                 onClick={() => navigate(notification.onClickPath)}
//               >
//                 {notification.message}
//               </Card>
//             </motion.div>
//           ))}
//         </Tabs.TabPane>
//         <Tabs.TabPane tab="Read" key="2">
//           <div className="d-flex justify-content-end">
//             <Button type="link" danger onClick={handleDeleteAllRead}>
//               Delete All Read
//             </Button>
//           </div>
//           {user?.seen_notification.map((notification, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//             >
//               <Card
//                 hoverable
//                 style={{ marginBottom: "10px", cursor: "pointer" }}
//                 onClick={() => navigate(notification.onClickPath)}
//               >
//                 {notification.message}
//               </Card>
//             </motion.div>
//           ))}
//         </Tabs.TabPane>
//       </Tabs>
//     </Layout>
//   );
// };

// export default NotificationPage;

import React, { useEffect } from "react";
import Layout from "./../components/Layout";
import { message, Tabs, Button, Card } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { updateUser } from "../redux/features/userSlice"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from 'framer-motion';

const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        dispatch(updateUser(res.data.data)); // Update user in Redux store
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Error marking all as read:", error);
      message.error("Something went wrong");
    }
  };

  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        dispatch(updateUser(res.data.data)); // Update user in Redux store
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Error deleting all read notifications:", error);
      message.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <h4 className="p-3 text-center">Notification Page</h4>
      <Tabs defaultActiveKey="1" centered>
        <Tabs.TabPane tab="Unread" key="1">
          <div className="d-flex justify-content-end">
            <Button type="link" onClick={handleMarkAllRead}>
              Mark All Read
            </Button>
          </div>
          {user?.notification.map((notification, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                hoverable
                style={{ marginBottom: "10px", cursor: "pointer" }}
                onClick={() => navigate(notification.onClickPath)}
              >
                {notification.message}
              </Card>
            </motion.div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key="2">
          <div className="d-flex justify-content-end">
            <Button type="link" danger onClick={handleDeleteAllRead}>
              Delete All Read
            </Button>
          </div>
          {user?.seen_notification.map((notification, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                hoverable
                style={{ marginBottom: "10px", cursor: "pointer" }}
                onClick={() => navigate(notification.onClickPath)}
              >
                {notification.message}
              </Card>
            </motion.div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default NotificationPage;

