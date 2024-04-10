import React from 'react';
import { jsPDF } from 'jspdf';
import img from '../img/6133956.jpg';

class HallTicketGenerator extends React.Component {
    generatePDF = () => {
        const doc = new jsPDF();

        // Fetch JSON data from table
        const tableRows = document.querySelectorAll('#hall-ticket-table tr');
        const data = {};
        tableRows.forEach(row => {
            const key = row.cells[0].textContent.trim();
            const value = row.cells[1].textContent.trim();
            data[key] = value;
        });

        // Generate PDF
        doc.text('Hall Ticket Details', 10, 10);
        let yPos = 20;
        Object.entries(data).forEach(([key, value]) => {
            doc.text(`${key}: ${value}`, 10, yPos);
            yPos += 10;
        });

        doc.save('hall-ticket.pdf');
    };

    render() {
        return (
            <div className="container" style={{ display: 'flex',height:'100vh' }}>
                <div className="left-section" style={{ flex: '50%',textAlign:'center',display:'flex',flexDirection:'column',justifyContent:'space-around'}}>
                    <h1>Generate Hall Ticket</h1>
                    <div style={{alignSelf:'center'}}>
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
                                    <td id="name">John Doe</td>
                                </tr>
                                <tr>
                                    <td>Course</td>
                                    <td id="course">B.Tech. Computer Science</td>
                                </tr>
                                <tr>
                                    <td>Year</td>
                                    <td id="year">Final Year</td>
                                </tr>
                                <tr>
                                    <td>Hall Ticket Number</td>
                                    <td id="hall-ticket-number">1234567890</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button
                        id="generate-pdf"
                        onClick={this.generatePDF}
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
    }
}

export default HallTicketGenerator;
