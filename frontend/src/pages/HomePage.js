// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Layout from "../components/Layout";
// import { useSelector } from "react-redux";

// const HomePage = () => {
//   const { user } = useSelector((state) => state.user); // This hooks into Redux to grab the current user state

//   const getUserData = async () => {
//     try {
//       const res = await axios.post(
//         "/api/v1/user/getUserData",
//         {},
//         {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("token"),
//           },
//         }
//       );
//       // Consider this place for handling the response appropriately
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getUserData();
//   }, []);
//   const userName = user ? user.name : '';
//   return(
//     <Layout>
//       <div 
//         style={{
//           fontSize: "48px",
//           fontWeight: "bold",
//           padding: "40px",
//           background: "linear-gradient(to right, #ff5f6d, #ffc371)", // Modern gradient background
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           textAlign: "center",
//           borderRadius: "10px",
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//           color: "white", // Changed text color to white for better visibility
//           height: "100%"
//         }}
//       >
//         {user && <p>Welcome, {userName}!</p>}
//       </div>
//     </Layout>
//   );

// };

// export default HomePage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Fetch user data from the server
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getUserData",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Handle the response if necessary
    } catch (error) {
      console.log(error);
    }
  };

  // Use effect hook to fetch user data on component mount
  useEffect(() => {
    getUserData();
  }, []);

  // Obtain user name
  const userName = user ? user.name : '';

  // Get a greeting based on the time of day
  const greeting = getGreeting();

  // Function to handle navigation to the profile page
  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
        style={{
          fontSize: "36px",
          fontWeight: "bold",
          padding: "40px",
          background: "linear-gradient(to right, #ff5f6d, #ffc371)",
          textAlign: "center",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          color: "white",
          height: "100%",
        }}
      >
        {user && <p>{greeting}, {userName}!</p>}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* <Button
            type="primary"
            style={{ marginTop: "20px" }}
            onClick={goToProfile} // Changed navigation function to use goToProfile
          >
            Go to Profile
          </Button> */}
        </motion.div>
      </motion.div>
    </Layout>
  );

};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default HomePage;
