import React, { useState } from 'react';
import './App.css'; // Assuming your CSS is adapted for React and renamed as App.css

function StudentInfo() {
  const [formData, setFormData] = useState({
    name: '',
    regNumber: '',
    birthdate: '',
    address: '',
    gender: 'male',
    status: 'local',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const studentData = { ...formData };
    delete studentData.photo; // Remove photo from JSON, handle separately if needed

    // Example fetch, adjust endpoint and form data handling as needed
    fetch('/register-student', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData),
    })
    .then(response => response.json())
    .then(data => console.log('Registration successful:', data))
    .catch(error => console.error('Registration failed:', error));

    // Reset form state if needed
    setFormData({
      name: '',
      regNumber: '',
      birthdate: '',
      address: '',
      gender: 'male',
      status: 'local',
      photo: null,
    });
  };

  return (
    <div className="container">
      <h1>Student Registration</h1>
      <div className="sections">
        <form id="student-form" onSubmit={handleSubmit}>
          <div className="form-section left-section">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="reg-number">Registration Number:</label>
              <input type="text" id="reg-number" name="regNumber" required value={formData.regNumber} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="birthdate">Birthdate:</label>
              <input type="date" id="birthdate" name="birthdate" required value={formData.birthdate} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input type="text" id="address" name="address" required value={formData.address} onChange={handleChange} />
            </div>
          </div>
          <div className="form-section right-section">
            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <select name="gender" id="gender" required value={formData.gender} onChange={handleChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="status">Status:</label>
              <select name="status" id="status" required value={formData.status} onChange={handleChange}>
                <option value="local">Local</option>
                <option value="hostelite">Hostelite</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="photo">Photo (optional):</label>
              <input type="file" id="photo" name="photo" onChange={handleChange} />
            </div>
            <button type="submit" className="register-button">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentInfo;
