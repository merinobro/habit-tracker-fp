import React from "react";
import "../styles/AddHabitCardButton.css";
import addHabitCircleButton from "../assets/add-habit-circle-button.svg";

const AddHabitCardButton = ({ addHabitCard, setHabitName, habitName }) => {
  return (
    <div className='add-habit-card-button'>
      <img
        src={addHabitCircleButton}
        alt='Add HabitCard'
        onClick={addHabitCard}
      />
      <input
        type='text'
        placeholder='Type habit name...'
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
      />
    </div>
  );
};

export default AddHabitCardButton;
