import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/signUpScreen.css";
import logo from "../assets/Logo.svg"
import { signup } from "../apiCalls/usersApiCalls";
import { DataContext } from "../store/context.js";

function SignUpScreen() {
  const { dispatchUsers, usersState } = useContext(DataContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    usersState.isUserLoggedIn && navigate("/main");
  }, [usersState.isUserLoggedIn, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(dispatchUsers, formData);
    } catch (err) {
      console.log("err ->", err);
    }
  };

  const handleChange = (e, field) => {
    const newValue = e.target.value;
    setFormData({
      ...formData,
      [field]: newValue,
    });
  };

  const inputs = [
    {
      headerText: "username",
      placeholder: "your name",
      defaultValue: "",
    },
    {
      headerText: "email",
      placeholder: "your email",
      defaultValue: "",
    },
    {
      headerText: "password",
      placeholder: "your password",
      defaultValue: "",
    },
  ];

  return (
    <div className='signup-screen-container'>
      <img src={logo} alt='Logo' className='logo' />

      <form onSubmit={onSubmit} className="content">
        <Header title='Create Account' className='header'/>
        {inputs.map((input) => (
          <div className='input-card' key={input.headerText}>
            <label className='input-header-label'>{input.headerText}</label>
            <input
              className='input-header-input'
              type='text'
              placeholder={input.placeholder}
              value={formData[input.headerText]}
              onChange={(e) => handleChange(e, input.headerText)}
            />
          </div>
        ))}
        <input type='submit' className='sign-button' />
      </form>
    </div>
  );
}

export default SignUpScreen;
