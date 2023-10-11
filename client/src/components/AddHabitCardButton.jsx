import React, { useContext } from "react";
import "../styles/AddHabitCardButton.css";
import addHabitCircleButton from "../assets/add-habit-circle-button.svg";
import { DataContext } from "../store/context";

const AddHabitCardButton = ({ addHabitCard, setHabitName, habitName, disabled}) => {
  const { habitsState } = useContext(DataContext);

  const handleAddHabitClick = () => {
    if (habitsState.habits.length < 5) {
      addHabitCard();
    } else {
      alert("You cannot add more than 5 habits.");
    }
  };

  return (
    <div className='dark-theme-image add-habit-card-button '>
      <img
        src={addHabitCircleButton}
        alt='Add HabitCard'
        onClick={handleAddHabitClick}
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