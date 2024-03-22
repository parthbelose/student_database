import React, { useState } from 'react';

function CourseEntryForm() {
  const [courseID, setCourseID] = useState('');
  const [courseName, setCourseName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you might send the data to the server
    console.log(`Course ID: ${courseID}, Course Name: ${courseName}`);

    // Clear the form fields
    setCourseID('');
    setCourseName('');
  };

  return (
    <div className="h1bg">
      <h1>Enter Course Details</h1>
      <div id="imageforca">
        <form id="full-form" onSubmit={handleSubmit}>
          <div id="course-form">
            <div className="form-group">
              <label htmlFor="course-id">Course ID:</label>
              <input
                type="text"
                id="course-id"
                name="courseID"
                required
                value={courseID}
                onChange={(e) => setCourseID(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="course-name">Course Name:</label>
              <input
                type="text"
                id="course-name"
                name="courseName"
                required
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CourseEntryForm;
