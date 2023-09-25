import React from 'react';
import '../styles/HabitCard.css'; 

const HabitCard = () => {
  return (
    <div className="box">
      <div className="rectangle-eat-card">
        {/* Container for input field and checkbox */}
        <div className="input-container">
          {/* Input field for habit */}
          <input type="text" className="card-input" placeholder="Enter your habit" />

          {/* Checkbox */}
          <input type="checkbox" className="card-checkbox" />
        </div>
      </div>
    </div>
  );
}

export default HabitCard;