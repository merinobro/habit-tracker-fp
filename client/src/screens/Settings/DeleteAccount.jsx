import React, { useState } from "react";
import axios from "axios";

import "./DeleteAccount.css";

function DeleteAccount() {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      // Send a request to the server to delete the account
      const response = await axios.delete("/api/delete-account");

      if (response.data.statusCode === 200) {
        setMessage("Account deleted successfully.");
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

  const showConfirmation = () => {
    setButtonClicked(true);
  };

  return (
    <div className='text-wrapper'>
      {buttonClicked ? (
        <div>
          <p className='confirmation-message'>
            Are you sure you want to delete your account?
          </p>
          <button onClick={handleDeleteAccount} className='delete'>
            Delete Account
          </button>
          {message && (
            <div className={success ? "success" : "error"}>{message}</div>
          )}
        </div>
      ) : (
        <button onClick={showConfirmation} className='delete-button'>
          Delete Account
        </button>
      )}
    </div>
  );
}

export default DeleteAccount;
