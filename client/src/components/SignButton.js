

import React from 'react';
import '../styles/signButton.css';

function Button({ text }) {
  return (
    <button className="SignButton">Sign Up
      {text}
    </button>
  );
}

export default Button;