import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home'; // Assuming your home page component resides here
import LoginPage from './pages/login'; // Assuming your login page component resides here

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    // Simulate successful login (replace with actual validation)
    setIsLoggedIn(true);
    console.log(`Login attempt: Username: ${username}, Password: ${password}`);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <HomePage /> : <LoginPage onLogin={handleLogin} />}
        />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        {/* Add other routes for different pages here */}
      </Routes>
    </Router>
  );
}

export default App;
