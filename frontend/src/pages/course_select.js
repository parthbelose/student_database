import React, { useState } from 'react';
import coursesData from './course_select.json';
import './course_select.css'; 
import img1 from '../img/home.png';
function CourseSelectionForm() {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const handleCourseSelect = (course) => {
    if (selectedCourses.includes(course)) {
      setSelectedCourses(selectedCourses.filter(selectedCourse => selectedCourse !== course));
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Selected Courses:", selectedCourses);
    alert("Form submitted successfully!");
  };

  return (<div className="course_select_list" style={{backgroundImage:`url(${img1})`,display:'flex',justifyContent:'center',alignItems:'center',minHeight:'100vh'}}>
    <div className="course-selection-container " style={{backgroundImage:"linear-gradient(to right,#E3FDFD,#CBF1F5,#A6E3E9,#71C9CE)",justifyContent:'center',alignItems:'center'}}>
      <h2>Course Selection</h2>
      <form onSubmit={handleSubmit}>
        {coursesData.map(course => (
          <div key={course.id}>
            <input
              type="checkbox"
              id={course.id} class="check"
              checked={selectedCourses.includes(course)}
              onChange={() => handleCourseSelect(course)}
            />
            <label htmlFor={course.id}>{course.name}</label>
          </div>
        ))}
        <button type="submit" className="submit-button">Submit</button>
      </form>
      <div className="selected-courses-container">
        <h3>Selected Courses:</h3>
        <ul>
          {selectedCourses.map(selectedCourse => (
            <li key={selectedCourse.id}>{selectedCourse.name}</li>
          ))}
        </ul>
      </div>
    </div></div>
  );
}

export default CourseSelectionForm;
