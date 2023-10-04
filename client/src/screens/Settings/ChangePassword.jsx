import React, { useState } from "react";
import axios from "axios";
import "./Changepassword.css";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      // Send a request to the server to change the password
      const response = await axios.post("/api/change-password", {
        currentPassword,
        newPassword,
      });

      if (response.data.success) {
        setMessage("Password changed successfully.");
        setSuccess(true);
      } else {
        setMessage("Current password is incorrect.");
        setSuccess(false);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
      setSuccess(false);
    }
  };

  const handleShowPasswordFields = () => {
    setShowPasswordFields(true);
  };

  return (
    <>
      <div className='text-wrapper-3'>
        <form onSubmit={handleChangePassword}>
          {showPasswordFields && (
            <div className='password-field'>
              <label htmlFor='currentPassword' className='hover-label'>
                Current Password:
              </label>
              <input
                type='password'
                id='currentPassword'
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
          )}
          {showPasswordFields && (
            <div className='password-field'>
              <label htmlFor='newPassword' className='hover-label'>
                New Password:
              </label>
              <input
                type='password'
                id='newPassword'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
          )}
          {!showPasswordFields && (
            <button type='button' onClick={handleShowPasswordFields}>
              Change Password
            </button>
          )}
          {showPasswordFields && <button type='submit'>Change Password</button>}
        </form>
        {message && (
          <div className={success ? "success" : "error"}>{message}</div>
        )}
      </div>
    </>
  );
}

export default ChangePassword;
