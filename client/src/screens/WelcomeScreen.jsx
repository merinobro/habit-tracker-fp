import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WelcomeScreen.css";
import "../styles/InputFieldWithHeader.css";

import logo from "../assets/Logo.svg"

import RegistrationLink from "../components/RegistrationLink";
import { login } from "../apiCalls/usersApiCalls";
import { DataContext } from "../store/context";
import Header from "../components/Header";

function WelcomeScreen() {
  const { dispatchUsers, usersState } = useContext(DataContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    usersState.isUserLoggedIn && navigate("/main");
  }, [usersState.isUserLoggedIn, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(dispatchUsers, formData);
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
    <div className='welcome-page'>
      <img src={logo} alt='Logo' className='logo' />

      <form onSubmit={onSubmit} className='content'>
        <Header className='header' title='Sign in' />
        {inputs.map((input) => (
          <div className='input-card' key={input.headerText}>
            <label className='input-header-label'>{input.headerText}</label>
            <input
              className='input-header-input'
              type={input.headerText === "password" ? "password" : "text"}
              placeholder={input.placeholder}
              value={formData[input.headerText]}
              onChange={(e) => handleChange(e, input.headerText)}
            />
          </div>
        ))}
        <input type='submit' className='sign-button' />
      </form>
      <RegistrationLink />
    </div>
  );
}

export default WelcomeScreen;
