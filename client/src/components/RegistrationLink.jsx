import React from "react";
import "../styles/RegistrationLink.css";

function RegistrationLink() {
  return (
    <div className='label'>
      <div className='don-t-have-an'>Don't have an account?</div>
      <a href='/signup' className='registration-link'>
        Click here to register
      </a>
    </div>
  );
}

export default RegistrationLink;
