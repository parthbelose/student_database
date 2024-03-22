import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GeneratePDF() {
  const [hallTicketData, setHallTicketData] = useState(null);

  useEffect(() => {
    // Fetch hall ticket data from the backend when the component mounts
    const fetchHallTicketData = async () => {
      try {
        const response = await axios.get('/api/hallticket'); // Replace with your actual API endpoint
        setHallTicketData(response.data);
      } catch (error) {
        console.error('Error fetching hall ticket data:', error);
      }
    };

    fetchHallTicketData();
  }, []); // Empty dependency array to run effect only once on component mount

  const generatePDF = () => {
    const { jsPDF } = window.jspdf;
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

  return (
    <div className="container">
      <div className="left-section">
        <div id="pdfheading1">
          <h1>Generate Hall Ticket</h1>
        </div>
        <div>
          <table id="hall-ticket-table">
            <tbody>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
              {hallTicketData && Object.entries(hallTicketData).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button id="generate-pdf" onClick={generatePDF}>Generate PDF</button>
      </div>
      <div className="right-section">
        <img src="6133956.jpg" alt="Image" style={{ height: "100%" }} />
      </div>
    </div>
  );
}

export default GeneratePDF;
