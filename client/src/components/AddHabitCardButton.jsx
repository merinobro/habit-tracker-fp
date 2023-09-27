import React from "react";
import "../styles/AddHabitCardButton.css";

const AddHabitCardButton = ({ addHabitCard }) => {
  return (
    <button className="add-habit-card-button" onClick={addHabitCard}>
      Add HabitCard
    </button>
  );
};

export default AddHabitCardButton;