import React, { useState } from 'react';
import axios from 'axios';

function CourseForm() {
  const [courseID, setCourseID] = useState('');
  const [courseName, setCourseName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make an HTTP POST request to your backend API endpoint
      const response = await axios.post('http://localhost:3001/courses', {
        name: courseName,
        description: '', // Add description if needed
        teacher: '', // Add teacher ID if needed
      });

      console.log(response.data); // Log the response data

      // Optionally, clear the form after submission
      setCourseID('');
      setCourseName('');
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
      <div style={{ fontFamily: 'sans-serif', margin: 0, display: 'flex', alignItems: 'center', flexDirection: 'column', height: '100%', backgroundColor: '#DCF2F1' }}>
      <div style={{ backgroundColor: '#0F1035', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <h1 style={{ marginBottom: '20px', fontSize: '50px', height: '200px', marginLeft: '20px', alignSelf: 'center', color: '#FFF6E9' }}>Enter Course Details</h1>
      </div>
      <div style={{ width: '100%', marginBottom: 0 }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', margin: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', margin: '40px', fontSize: 'large' }}>
            <div className="form-group">
              <label htmlFor="course-id">Course ID:</label>
              <input type="text" id="course-id" name="courseID" value={courseID} onChange={(e) => setCourseID(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="course-name">Course Name:</label>
              <input type="text" id="course-name" name="courseName" value={courseName} onChange={(e) => setCourseName(e.target.value)} required />
            </div>
          </div>
          <button type="submit" style={{ padding: '1.3em 3em', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2.5px', fontWeight: 500, color: '#000', backgroundColor: 'blue', border: 'none', borderRadius: '45px', boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)', transition: 'all 0.3s ease 0s', cursor: 'pointer', outline: 'none', width: '200px', alignSelf: 'center' }}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CourseForm;
