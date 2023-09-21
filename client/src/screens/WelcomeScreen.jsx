import React, { useState } from "react";
import "../styles/WelcomeScreen.css"; //styling

import logoPlaceholder from "../imgs/logoPlaceholder.png";

import SignButton from "../components/SignButton";
import RegistrationLink from '../components/RegistrationLink';
import InputFieldWithHeader from "../components/InputFieldWithHeader";

function WelcomeScreen() {
  const [email, setEmail] = useState("");
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);

  const handleEmailChange = (e) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);

    // Simple email validation using a regular expression
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValidEmail = emailPattern.test(enteredEmail);

    // Update the state to indicate if the email is invalid
    setIsInvalidEmail(!isValidEmail);
  };

  const handlePasswordChange = (e) => {
    const enteredPassword = e.target.value;
    setPassword(enteredPassword);

    // Password validation logic - requiring a minimum length of 6 characters
    const isValidPassword = enteredPassword.length >= 6;

    // Update the state to indicate if the password is invalid
    setIsInvalidPassword(!isValidPassword);
  };

  const handleSignInClick = () => {
    // Implement your sign-in logic here, e.g., sending the email and password to a server
    console.log("Sign-In button clicked");
  };

  return (
    <div className="welcome-page">
      {/* Logo image */}
      <img src={logoPlaceholder} alt="Logo" className="logoPlaceholder" />

      <InputFieldWithHeader
        headerText="email"
        placeholder="Enter your email"
        value={email}
        onChange={handleEmailChange}
      />
      {isInvalidEmail && (
        <p style={{ color: "red" }}>Please enter a valid email address.</p>
      )}

      <InputFieldWithHeader
        headerText="password"
        placeholder="Enter your password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      {isInvalidPassword && (
        <p style={{ color: "red" }}>
          Password must be at least 6 characters long.
        </p>
      )}

      {/* Use the SignButton component with the handleSignInClick function */}
      <SignButton text="Sign-In" onClick={handleSignInClick} />

     {/* the RegistrationLink component */}
      <RegistrationLink />
    </div>
  );
}

export default WelcomeScreen;
