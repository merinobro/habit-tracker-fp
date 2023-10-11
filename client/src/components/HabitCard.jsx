import React, { useState, useContext } from "react";
import "../styles/HabitCard.css";
import {
  deleteHabit,
  getHabits,
  updateHabit,
  updateProgress,
} from "../apiCalls/habitApiCalls";
import { DataContext } from "../store/context";

const HabitCard = ({ habit }) => {
  const { dispatchHabits, usersState } = useContext(DataContext);

  const { listId } = usersState;

  const [newTitle, setNewTitle] = useState(habit.name);
  const [isEditing, setIsEditing] = useState(false);

  const handleTextChange = (e) => {
    setNewTitle(e.target.value);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateCard = async () => {
    await updateHabit(habit, newTitle, dispatchHabits, listId);
    await getHabits(dispatchHabits, usersState.listId);
  };

  const handleDeleteCard = async () => {
    await deleteHabit(habit._id, dispatchHabits, listId);
    getHabits(dispatchHabits, usersState.listId);
  };

  const handleCheckboxChange = async () => {
    await updateProgress(habit, dispatchHabits, listId);
    getHabits(dispatchHabits, usersState.listId);
  };

  return (
    <div className='box'>
      <div className='input-container'>
        <div className='rectangle-eat-card'>
          {isEditing ? (
            <div className='input-content'>
              <input
                type='text'
                className='card-input'
                placeholder='Enter your habit'
                value={newTitle}
                onChange={handleTextChange}
              />
              <img
                src={require("../assets/trash.svg").default}
                alt='Trash Icon'
                onClick={handleDeleteCard}
                className='trash-icon'
              />
            </div>
          ) : (
            <>
              <span className='habit-text'>{newTitle}</span>
              <input
                type='checkbox'
                className='card-checkbox'
                checked={habit.completed}
                onChange={handleCheckboxChange}
              />
            </>
          )}
        </div>
        <div className='card-options dark-theme-image' onClick={toggleEditing}>
          {isEditing ? (
            <img
              src={require("../assets/save.svg").default}
              alt='Checkbox Icon'
              className='checkbox-icon'
              onClick={handleUpdateCard}
            />
          ) : (
            <img
              src={require("../assets/ellipsis.svg").default}
              alt='Ellipsis Icon'
              className='ellipsis-icon'
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
