import React, { useState } from "react";
import axios from "axios";
import "../Settings/LogOut.css";

function Logout() {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogout = async () => {
    try {
      
      const response = await axios.post("/api/logout"); //! Change the URL 

      if (response.data.statusCode === 200) {
        setMessage("Logged out successfully.");
        setSuccess(true);
      } else {
        setMessage("An error occurred. Please try again later.");
        setSuccess(false);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
      setSuccess(false);
    }
  };

  return (
    <div className='text-wrapper-2'>
      <div onClick={handleLogout}>Logout</div>
      {message && (
        <div className={success ? "success" : "error"} style={{ fontSize: success ? "inherit" : "12px" }}>{message}</div>
      )}

      <hr className="line-separation-8"></hr>
    </div>

  );
}

export default Logout;
