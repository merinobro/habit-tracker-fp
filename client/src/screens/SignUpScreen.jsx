
// import React, { useState } from "react";
// import "../styles/signUpScreen.css";
// import SignButton from "../components/SignButton"






// function SignUpForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // You can perform your registration logic here using formData
//     console.log("Form Data:", formData);
//   };
//   return (
//     <div className="container">
//       <h2>Sign Up Here</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="confirmEmail">Confirm Email:</label>
//           <input
//             type="email"
//             id="confirmEmail"
//             name="confirmEmail"
//             value={formData.confirmEmail}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />

          
//         </div>
//         <div>
//           <label htmlFor="confirmPassword">Confirm Password:</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="Sign-button">
//          <SignButton></SignButton>
//         </div>
//       </form>
//     </div>
//   );
// }
// export default SignUpForm;

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