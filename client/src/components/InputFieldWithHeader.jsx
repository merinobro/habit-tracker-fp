import React from 'react';
import '../styles/InputFieldWithHeader.css'; 

function InputFieldWithHeader({ headerText, placeholder, value, onChange }) {
  return (
    <div className="input-card">
      <label className="input-header-label">{headerText}</label>
      <input
        className="input-header-input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default InputFieldWithHeader;