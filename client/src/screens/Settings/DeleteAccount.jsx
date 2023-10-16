import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// this is a comment

import "./DeleteAccount.css";

import { deleteAccount } from "../../apiCalls/usersApiCalls.js";
import { DataContext } from "../../store/context.js";

function DeleteAccount() {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const { dispatchUsers, usersState } = useContext(DataContext);

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount(dispatchUsers, usersState.user);
      setMessage("Account deleted successfully");
      setSuccess(true);
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
      {success ? (
        <div className='success'>{message}</div>
      ) : buttonClicked ? (
        <div>
          <p className='confirmation-message'>
            Are you sure you want to delete your account?
          </p>
          <button onClick={handleDeleteAccount} className='delete'>
            Delete Account
          </button>
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


