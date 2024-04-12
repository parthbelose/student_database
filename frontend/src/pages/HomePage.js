// import React, { useEffect } from "react";
// import axios from "axios";
// import Layout from "../components/Layout";
// const HomePage = () => {
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
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getUserData();
//   }, []);
//   return (
//     <Layout>
//       <h1>Home Page</h1>
//     </Layout>
//   );
// };

// export default HomePage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import bgimg from "../img/home.png"
// import "../styles/LayoutStyles.css"; // Assuming this imports your Layout CSS

const HomePage = () => {
  // const [backgroundImage, setBackgroundImage] = useState('url("../../img/home.png")'); // Adjust the path as needed
  const { user } = useSelector((state) => state.user); // This hooks into Redux to grab the current user state

  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      // Consider this place for handling the response appropriately
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  const userName = user ? user.name : '';
  return(
    <Layout>
      <div 
        style={{
          fontSize: "48px",
          fontWeight: "bold",
          padding: "40px",
          background: "linear-gradient(to right, #ff5f6d, #ffc371)", // Modern gradient background
          backgroundSize: "cover",
          backgroundPosition: "center",
          textAlign: "center",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          color: "white", // Changed text color to white for better visibility
          height: "100%"
        }}
      >
        {user && <p>Welcome, {userName}!</p>}
      </div>
    </Layout>
  );

};

export default HomePage;
