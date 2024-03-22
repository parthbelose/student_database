import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home'; // Your home page component
import LoginPage from './pages/login'; // Your login page component
import GeneratePDF from './components/GeneratePDF'; // Your GeneratePDF component
import StudentRegistrationForm from './components/StudentRegistrationForm'; // Your StudentRegistrationForm component
import CourseEntryForm from './components/CourseEntryForm'; // Your CourseEntryForm component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    // Here, you'd have actual logic to validate login credentials
    setIsLoggedIn(true);
    console.log(`Login attempt: Username: ${username}, Password: ${password}`);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <HomePage /> : <LoginPage onLogin={handleLogin} />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/generate-pdf" element={<GeneratePDF />} />
        <Route path="/register-student" element={<StudentRegistrationForm />} />
        <Route path="/enter-course" element={<CourseEntryForm />} />
        {/* Add more routes as needed for other components/pages */}
      </Routes>
    </Router>
  );
}

export default App;
