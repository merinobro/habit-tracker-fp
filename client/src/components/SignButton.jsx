import React from 'react';
import '../styles/SignButton.css';

function Button({ text }) {
  return (
    <button className="sign-button">
      {text}
    </button>
  );
}

export default Button;