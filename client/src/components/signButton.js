import React from 'react';
import './signButton.css';

function Button({ text }) {
  return (
    <button className="sign-button">
      {text}
    </button>
  );
}

export default Button;