import React, { useState } from 'react';
import axios from 'axios';
import "../Settings/LogOut.css";

function Logout() {
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLogout = async () => {
    try {
      // Send a GET or POST request to the server-side logout endpoint
      const response = await axios.post('/api/logout'); // Change the URL if needed

      if (response.data.statusCode === 200) {
        setMessage('Logged out successfully.');
        setSuccess(true);
      } else {
        setMessage('An error occurred. Please try again later.');
        setSuccess(false);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
      setSuccess(false);
    }
  };

  return (
    <div className='text-wrapper-2'>
      <button onClick={handleLogout}>Logout</button>
      {message && <div className={success ? 'success' : 'error'}>{message}</div>}
    </div>
  );
}

export default Logout;