import React, { useEffect, useState } from "react";
import { jsPDF } from 'jspdf';
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import img from '../../img/6133956.jpg';

const HallTicketGenerator = () => {
    const { id } = useParams();
    const { user } = useSelector((state) => state.user);
    const [student, setStudent] = useState(null);
    const [courses, setCourses] = useState([]);

    const generatePDF = () => {
        const doc = new jsPDF();
        const tableRows = document.querySelectorAll('#hall-ticket-table tbody tr');
        const data = {};
        tableRows.forEach(row => {
            const key = row.cells[0].textContent.trim();
            const value = row.cells[1].textContent.trim();
            data[key] = value;
        });

        doc.text('Hall Ticket Details', 10, 10);
        let yPos = 20;
        Object.entries(data).forEach(([key, value]) => {
            doc.text(`${key}: ${value}`, 10, yPos);
            yPos += 10;
        });

        doc.save('hall-ticket.pdf');
    };

    const getStudentInfo = async () => {
        try {
            const res = await axios.post(
                "/api/v1/student/getStudentInfo",
                { userId: id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (res.data.success) {
                setStudent(res.data.data);
                await getCoursesInfo(res.data.data.enrolledCourses);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getCoursesInfo = async (courseIds) => {
        try {
            const promises = courseIds.map(async (courseId) => {
                const res = await axios.get(`/api/v1/courses/${courseId}`);
                return res.data.data;
            });
            const coursesData = await Promise.all(promises);
            setCourses(coursesData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getStudentInfo();
    }, []);

    return (
        <div className="container" style={{ display: 'flex', height: '100vh' }}>
            <div className="left-section" style={{ flex: '50%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                <h1>Generate Hall Ticket</h1>
                <div style={{ alignSelf: 'center' }}>
                    <table id="hall-ticket-table">
                        <thead>
                            <tr>
                                <th>Field</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td id="name">{student?.firstName} {student?.lastName}</td>
                            </tr>
                            <tr>
                                <td>Registration no.</td>
                                <td id="registration_number">{student?.regNumber}</td>
                            </tr>
                            <tr>
                                <td>Batch</td>
                                <td id="batch">{student?.batch}</td>
                            </tr>
                            <tr>
                                <td>Enrolled Courses</td>
                                <td id="enrolled-courses">
                                    <ul>
                                        {courses.map((course, index) => (
                                            <li key={index}>{course.course_name}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button
                    id="generate-pdf"
                    onClick={generatePDF}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: 'red',
                        color: 'white',
                        border: 'none',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                        alignSelf: 'center',
                        width: '200px'
                    }}
                >
                    Generate PDF
                </button>
            </div>
            <div className="right-section" style={{ flex: '50%', backgroundImage: `url(${img})`, backgroundSize: 'cover' }}></div>
        </div>
    );
};

export default HallTicketGenerator;