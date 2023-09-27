import React, { useState, useEffect } from 'react';
import '../styles/HabitCard.css'; 

const HabitCard = ({ text: initialText, completed: initialCompleted, onUpdate }) => {
  // Initialize the state with the initialText and initialCompleted values
  const [text, setText] = useState(initialText || '');
  const [completed, setCompleted] = useState(initialCompleted || false);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleCheckboxChange = () => {
    setCompleted(!completed);
  };

  useEffect(() => {
    // Check if the state has changed before logging
    if (text !== initialText || completed !== initialCompleted) {
      onUpdate({ text, completed }); // Notify the parent component of the update
      console.log('Text state:', text);
      console.log('Completed state:', completed);
    }
  }, [text, completed, onUpdate, initialText, initialCompleted]);

  return (
    <div className="box">
      <div className="rectangle-eat-card">
        <div className="input-container">
          <input
            type="text"
            className="card-input"
            placeholder="Enter your habit"
            value={text}
            onChange={handleTextChange}
          />

          <input
            type="checkbox"
            className="card-checkbox"
            checked={completed}
            onChange={handleCheckboxChange}
          />
        </div>
      </div>
    </div>
  );
}

export default HabitCard;