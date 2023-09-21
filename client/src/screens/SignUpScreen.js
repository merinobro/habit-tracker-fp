



import React, { useState } from 'react';
import '../styles/signUpScreen.css';



function SignupForm() {

  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });



const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add form validation logic here if needed
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Simulate sending data to the server
    const registrationSuccess = await registerUser(formData);

    if (registrationSuccess) {
      setIsRegistered(true);
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    }
  };

  return (
    <div className="signup-form-container">
      {isRegistered ? (
        <p>Registration successful!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          {/* ... Form input fields ... */}
          <button type="submit">Sign Up</button>
        </form>
      )}
    </div>
  );
}

export default SignupForm;