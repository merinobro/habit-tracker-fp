import React from "react";
import Header from "../components/Header";
import InputFieldWithHeader from "../components/InputFieldWithHeader";
import Button from "../components/SignButton";
import "../styles/signUpScreen.css";

function SignUpScreen() {
  return (
    <div className='signup-screen-container'>
      <Header title='Create Account' />
      <InputFieldWithHeader headerText='name' placeholder='your name' />
      <InputFieldWithHeader headerText='email' placeholder='your email' />
      <InputFieldWithHeader headerText='password' placeholder='password' />
      <InputFieldWithHeader
        headerText='confirm password'
        placeholder='password'
      />
      <Button text='Sign Up' />
    </div>
  );
}

export default SignUpScreen;
