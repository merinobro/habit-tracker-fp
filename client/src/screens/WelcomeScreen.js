import React, { useState } from "react";
import '../styles/WelcomeScreen.css'; //styling

//import Logo from './Logo'; 

//import SignInButton from './SignInButton'; 
//import RegistrationLink from './RegistrationLink';


import InputFieldWithHeader from "../components/InputFieldWithHeader";

function WelcomePage() {
  const [email, setEmail] = useState('');
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);

  const handleEmailChange = (e) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);

    // Simple email validation using a regular expression
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValidEmail = emailPattern.test(enteredEmail);

    // Update the state to indicate if the email is invalid
    setIsInvalidEmail(!isValidEmail);
  };

  return (
    <div className="welcome-page">
      {/* <Logo />  */}
      <InputFieldWithHeader
        headerText="email"
        placeholder="enter your email"
        value={email}
        onChange={handleEmailChange}
      />
      {isInvalidEmail && <p style={{ color: 'red' }}>Please enter a valid email address.</p>}
      {/* <SignInButton /> 
      <RegistrationLink /> */}
    </div>
  );
}

export default WelcomePage;

