import React, { useState } from 'react';
import img from '../img/5836.jpg';
const StudentRegistration = () => {
  const [name, setName] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const studentData = {
      name,
      regNumber,
      birthdate,
    };

    if (photo) {
      studentData.photo = photo;
    }

    fetch('/register-student', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Registration successful:', data);
      setName('');
      setRegNumber('');
      setBirthdate('');
      setPhoto(null);
    })
    .catch(error => {
      console.error('Registration failed:', error);
    });
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', backgroundColor: '#f9f9f9', color: '#333', lineHeight: '1.6', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 0, padding: '20px', backgroundImage:`url(${img})`, backgroundSize: '750px', backgroundPosition: 'center' }}>
      <div style={{ width: '90%', maxWidth: '1000px', margin: 'auto', padding: '20px', backgroundColor: '#fff', borderRadius: '20px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '2.5rem' }}>Student Registration</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, margin: '0 10px' }}>
            <form id="left-form">
              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '.5rem', color: '#555' }}>Name:</label>
                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '80%', padding: '12px', borderRadius: '8px', border: 'none', outline: 'none', fontSize: '1rem', color: '#333', background: '#f4f4f4' }} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="reg-number" style={{ display: 'block', marginBottom: '.5rem', color: '#555' }}>Registration Number:</label>
                <input type="text" id="reg-number" name="regNumber" value={regNumber} onChange={(e) => setRegNumber(e.target.value)} required style={{ width: '80%', padding: '12px', borderRadius: '8px', border: 'none', outline: 'none', fontSize: '1rem', color: '#333', background: '#f4f4f4' }} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="birthdate" style={{ display: 'block', marginBottom: '.5rem', color: '#555' }}>Birthdate:</label>
                <input type="date" id="birthdate" name="birthdate" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required style={{ width: '80%', padding: '12px', borderRadius: '8px', border: 'none', outline: 'none', fontSize: '1rem', color: '#333', background: '#f4f4f4' }} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="address" style={{ display: 'block', marginBottom: '.5rem', color: '#555' }}>Address:</label>
                <input type="text" id="address" name="address" required style={{ width: 'calc(100% - 20px)', padding: '12px', borderRadius: '8px', border: 'none', outline: 'none', fontSize: '1rem', color: '#333', background: '#f4f4f4' }} />
              </div>
            </form>
          </div>
          <div style={{ flex: 1, margin: '0 10px' }}>
            <form id="right-form">
              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="gender" style={{ display: 'block', marginBottom: '.5rem', color: '#555' }}>Gender:</label>
                <select name="gender" id="gender" required style={{ width: '80%', padding: '12px', borderRadius: '8px', border: 'none', outline: 'none', fontSize: '1rem', color: '#333', background: '#f4f4f4' }}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="status" style={{ display: 'block', marginBottom: '.5rem', color: '#555' }}>Status:</label>
                <select name="status" id="status" required style={{ width: '80%', padding: '12px', borderRadius: '8px', border: 'none', outline: 'none', fontSize: '1rem', color: '#333', background: '#f4f4f4' }}>
                  <option value="local">Local</option>
                  <option value="hostelite">Hostelite</option>
                </select>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="photo" style={{ display: 'block', marginBottom: '.5rem', color: '#555' }}>Photo (optional):</label>
                <input type="file" id="photo" name="photo" onChange={(e) => setPhoto(e.target.files[0])} />
              </div>
              <button type="submit" className="register-button" style={{ display: 'block', margin: '0 auto', cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase', background: '#007bff', color: 'white', transition: 'background-color 0.3s', padding: '12px', borderRadius: '8px', border: 'none', outline: 'none' }}>Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;
