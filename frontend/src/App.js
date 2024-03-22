import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
// import GeneratePDF from './pages/generatepdf';
import StudentRegistration from './pages/studentInfo';
// import CourseEntryForm from './pages/courseaddition';
import {Login} from './pages/login';
import {Signup} from './pages/signup';
import NavigationBar from './pages/NavigationBar'; // Adjust the path based on your structure
import { useSelector } from 'react-redux';

function App() {
  const { user } = useSelector((state) => state.auth); // Assuming the auth state structure

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
        {/* <Route path="/generate-pdf" element={user ? <GeneratePDF /> : <Navigate to="/login" />} /> */}
        <Route path="/register-student" element={user ? <StudentRegistration /> : <Navigate to="/login" />} />
        {/* <Route path="/enter-course" element={user ? <CourseEntryForm /> : <Navigate to="/login" />} /> */}
        {/* Home page or default route */}
        {/* <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} /> */}
        {/* Replace <Home /> with your actual home component */}
      </Routes>
    </Router>
  );
}

export default App;
