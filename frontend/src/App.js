import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import StudentRegistration from './pages/studentInfo';
import Login1 from './pages/Login1'; // Import Login1 component
import ProfSignup from './pages/ProfSignup';
import ProfLogin from './pages/ProfLogin'; // Import Login1 component
import StudentSignup from './pages/StudentSignup';
import StudentLogin from './pages/StudentLogin';
import CourseForm from './pages/courseAddition'
import NavigationBar from './pages/NavigationBar';
import { useSelector } from 'react-redux';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/Login" element={user ? <Navigate to="/" /> : <Login1 />} /> {/* Include Login1 route */}
        <Route path="/profsignup" element={user ? <Navigate to="/" /> : <ProfSignup />} />
        <Route path="/proflogin" element={user ? <Navigate to="/" /> : <ProfLogin />} />
        <Route path="/studentsignup" element={user ? <Navigate to="/" /> : <StudentSignup />} />
        <Route path="/studentlogin" element={user ? <Navigate to="/" /> : <StudentLogin />} />
        {/* <Route path="/generate-pdf" element={user ? <GeneratePDF /> : <Navigate to="/Login" />} /> */}
        <Route path="/register-student" element={!user ? <StudentRegistration /> : <Navigate to="/Login" />} />
        <Route path="/enter-course" element={user ? <CourseForm /> : <Navigate to="/Login" />} />
        {/* <Route path="/" element={user ? <Home /> : <Navigate to="/Login" />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

