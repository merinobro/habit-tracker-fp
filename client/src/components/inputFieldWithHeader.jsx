import React from 'react';
import '../../styles/style.css'; 

function InputWithHeader({ headerText, placeholder, value, onChange }) {
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

export default InputWithHeader;