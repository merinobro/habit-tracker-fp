import React from "react";
import "../styles/AddHabitCardButton.css";
import addHabitCircleButton from "../assets/add-habit-circle-button.svg"; // Import the image

const AddHabitCardButton = ({ addHabitCard, disabled }) => {
  return (
    <img
      className={`add-habit-card-button ${disabled ? 'disabled' : ''}`}
      src={addHabitCircleButton}
      alt="Add HabitCard"
      onClick={addHabitCard}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
    />
  );
};

export default AddHabitCardButton;