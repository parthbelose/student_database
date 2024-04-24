// import React, { useEffect, useState } from "react";
// import { jsPDF } from 'jspdf';
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import img from '../../img/6133956.jpg';
// import Layout from "../../components/Layout";

// const HallTicketGenerator = () => {
//     const { id } = useParams();
//     const { user } = useSelector((state) => state.user);
//     const [student, setStudent] = useState(null);
//     const [courses, setCourses] = useState([]);

//     const generatePDF = () => {
//         const doc = new jsPDF();
//         const tableRows = document.querySelectorAll('#hall-ticket-table tbody tr');
//         const data = {};
//         tableRows.forEach(row => {
//             const key = row.cells[0].textContent.trim();
//             const value = row.cells[1].textContent.trim();
//             data[key] = value;
//         });

//         doc.text('Hall Ticket Details', 10, 10);
//         let yPos = 20;
//         Object.entries(data).forEach(([key, value]) => {
//             doc.text(${key}: ${value}, 10, yPos);
//             yPos += 10;
//         });

//         doc.save('hall-ticket.pdf');
//     };

//     const getStudentInfo = async () => {
//         try {
//             const res = await axios.post(
//                 "/api/v1/student/getStudentInfo",
//                 { userId: id },
//                 {
//                     headers: {
//                         Authorization: Bearer ${localStorage.getItem("token")},
//                     },
//                 }
//             );
//             if (res.data.success) {
//                 setStudent(res.data.data);
//                 await getCoursesInfo(res.data.data.enrolledCourses);
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const getCoursesInfo = async (courseIds) => {
//         try {
//             const promises = courseIds.map(async (courseId) => {
//                 const res = await axios.get(/api/v1/courses/${courseId});
//                 return res.data.data;
//             });
//             const coursesData = await Promise.all(promises);
//             setCourses(coursesData);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     useEffect(() => {
//         getStudentInfo();
//     }, []);

//     return (
//         <Layout>
//         <div className="container" style={containerStyle}>
//             <div>
//         <h1>Generate Hall Ticket</h1>
//         </div>
//         <div style={{display:"flex",height:"75%"}}>
//             <div className="left-section" style={leftSectionStyle}>
                
//                 <div>
//                     <table id="hall-ticket-table" style={tableStyle}>
//                         <thead>
//                             <tr>
//                                 {/* <th>Field</th>
//                                 <th>Value</th> */}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr style={{padding:"50px"}}>
//                                 <td>Name</td>
//                                 <td>{student?.firstName} {student?.lastName}</td>
//                             </tr>
//                             <tr>
//                                 <td>Registration no.</td>
//                                 <td>{student?.regNumber}</td>
//                             </tr>
//                             <tr>
//                                 <td>Batch</td>
//                                 <td>{student?.batch}</td>
//                             </tr>
//                             <tr style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
//                                 <td>Enrolled Courses</td>
//                                 <td>
//                                     <ul>
//                                         {courses.map((course, index) => (
//                                             <li key={index}>{course.course_name}</li>
//                                         ))}
//                                     </ul>
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//                 <button
//                     id="generate-pdf"
//                     onClick={generatePDF}
//                     style={buttonStyle}
//                 >
//                     Generate PDF
//                 </button>
//             </div>
//             <div className="right-section" style={rightSectionStyle}>
//             </div>
//             </div>
//         </div>
//         </Layout>
//     );
// };

// export default HallTicketGenerator;

// // Styles
// const containerStyle = {
//     display: 'flex',
//     height: '100vh',
//     alignItems: 'center',
//     flexDirection: 'column'
// };

// const leftSectionStyle = {
//     flex: '1',
//     textAlign: 'center',
//     padding: '2rem',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center'
// };

// const rightSectionStyle = {
//     // flex: '1',
//     width: '500px',
//     backgroundImage: url(${img}),
//     backgroundSize:"cover",
//     height:"518px",
//     marginRight:"0",
//     backgroundPosition: 'right',
    
// };

// const tableStyle = {
//     margin: '0 auto',
//     width: '90%',
//     boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
// };

// const buttonStyle = {
//     padding: '10px 20px',
//     fontSize: '16px',
//     backgroundColor: 'red',
//     color: 'white',
//     border: 'none',
//     borderRadius: '20px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s ease',
//     marginTop: '20px',
//     width: '200px'
// };
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import img from "../../img/6133956.jpg";
import Layout from "../../components/Layout";
import styled from "styled-components";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const HallTicketGenerator = () => {
    const { id } = useParams();
    const { user } = useSelector((state) => state.user);
    const [student, setStudent] = useState(null);
    const [courses, setCourses] = useState([]);

    const generatePDF = () => {
        const doc = new jsPDF();
    
        // Set up document title
        doc.setFont("Helvetica", "bold");
        doc.text("Hall Ticket Details", 20, 20);
        doc.setFont("Helvetica", "normal");
        let yOffset = 30;
    
        // Include student details
        if (student) {
            doc.text(`Name: ${student.firstName} ${student.lastName}`, 20, yOffset);
            yOffset += 10;
            doc.text(`Registration No.: ${student.regNumber}`, 20, yOffset);
            yOffset += 10;
            doc.text(`Batch: ${student.batch}`, 20, yOffset);
            yOffset += 10;
        }
    
        // Add a header row for the table
        const headers = [["Course", "Signature"]];
    
        // Collect data rows for courses
        const dataRows = courses.map((course) => [course.course_name, ""]);
    
        // Combine header and data rows
        const rows = headers.concat(dataRows);
    
        // Add the table to the PDF document
        doc.autoTable({
            startY: yOffset + 10, // Start the table below the student details
            head: headers,
            body: dataRows,
            styles: { font: "Helvetica", fontSize: 10, halign: "left" }, // Use default font and styling
            theme: "grid", // Use grid theme for the table
        });
    
        // Save the PDF
        doc.save("hall-ticket.pdf");
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
    }, [id]);

    return (
        <Layout>
            <Container>
                <Header>
                    <Title>Generate Hall Ticket</Title>
                </Header>
                <Content>
                    <LeftSection>
                        <HallTicketTable id="hall-ticket-table">
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>{student?.firstName} {student?.lastName}</td>
                                </tr>
                                <tr>
                                    <th>Registration No.</th>
                                    <td>{student?.regNumber}</td>
                                </tr>
                                <tr>
                                    <th>Batch</th>
                                    <td>{student?.batch}</td>
                                </tr>
                                <tr style={{ backgroundColor: "#f0f0f0", fontWeight: "bold" }}>
                                    <th>Enrolled Courses</th>
                                    <td>
                                        <ul>
                                            {courses.map((course, index) => (
                                                <li key={index}>{course.course_name}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </HallTicketTable>
                        <GenerateButton onClick={generatePDF}>
                            Generate PDF
                        </GenerateButton>
                    </LeftSection>
                    <RightSection style={{ backgroundImage: `url(${img})` }} />
                </Content>
            </Container>
        </Layout>
    );
};

export default HallTicketGenerator;

// Styled Components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
`;

const Header = styled.div`
    padding: 1rem;
    text-align: center;
`;

const Title = styled.h1`
    font-size: 2rem;
    font-weight: bold;
`;

const Content = styled.div`
    display: flex;
    width: 100%;
    height: 75%;
`;

const LeftSection = styled.div`
    flex: 1;
    text-align: center;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const HallTicketTable = styled.table`
    width: 90%;
    margin: 0 auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
`;

const GenerateButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 20px;
    width: 200px;
    margin: 20px auto 0; /* Center the button */

    &:hover {
        background-color: #0056b3;
    }
`;

const RightSection = styled.div`
    flex: 1;
    background-image: url(${img});
    background-size: cover;
    background-position: center;
    height: 100%;
`;
