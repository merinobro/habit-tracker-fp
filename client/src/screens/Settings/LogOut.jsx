import React, { useState, useContext } from "react";
import "../Settings/LogOut.css";
import { logout } from "../../apiCalls/usersApiCalls";
import { DataContext } from "../../store/context";
import { useNavigate } from "react-router-dom";

function Logout() {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const { dispatchUsers } = useContext(DataContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(dispatchUsers);
      navigate("/", { replace: true });
      setMessage("Logged out successfully.");
      setSuccess(true);
    } catch (error) {
      console.error(error);
      setMessage("An error occurred. Please try again later.");
      setSuccess(false);
    }
  };

  return (
    <div className='text-wrapper-2'>
      <div onClick={handleLogout}>Logout</div>
      {message && (
        <div
          className={success ? "success" : "error"}
          style={{ fontSize: success ? "inherit" : "12px" }}
        >
          {message}
        </div>
      )}
      <hr className='line-separation-8'></hr>
    </div>
  );
}

export default Logout;
