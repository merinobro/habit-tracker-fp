import React, { useState, useEffect, useContext } from 'react';
import "../Settings/Notifications.css";
import arrow from "../../assets/arrow.svg";
import {DataContext} from "../../store/context.js";


const Notifications = () => {
  
  const { habitsState } = useContext(DataContext);
  const [isChecked, setIsChecked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const [habits, setHabits] = useState([]);
  const [habitTimes, setHabitTimes] = useState({}); 
  console.log(habits)

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    setHabits(habitsState.habits);

  }, [habitsState.habits]);

  // useEffect(() => {
  //     console.log("Habit Times", habitTimes)
  //     for(const habitId in habitTimes) {
  //       const habitTime = habitTimes[habitId];
  //       const habitIndex = habits.findIndex((habit) => {
  //           return habit._id === habitId;
  //         }, [habits])


  //       const habitCopy = {...habits[habitIndex]}

  //      habitCopy.time = {
  //       hour : habitTime.split(":")[0],
  //       minute: habitTime.split(":")[1]
  //      }
  //      setHabits((prevHabits)=> {
         
  //         prevHabits[habitIndex] = habitCopy;

  //         return prevHabits;
  //      })
  //     }

  // },)

  // useEffect(() => {
  //   habits.forEach( async (habit) => {
  //     try {
  //       const response = await axios.put(`http://localhost:8000/habits/${habit._id}`, habit);
  //   // Dispatching the updated habit directly to the state
  //   dispatchHabits({
  //     type: "UPDATE_HABIT_CARD",
  //     payload: response.data.data.habit, // Assuming the updated habit is returned in response.data.data.habit
  //   });
  // } catch (error) {
  //   console.error(error);
  // }
  //   })
  // }, [habits])

  const handleTimeChange = (habitId, event) => {
    const { value } = event.target;
    setHabitTimes({ ...habitTimes, [habitId]: value });
  };



  return (
    <>
      <div className='text-wrapper-6'>Notifications</div>
      <img src={arrow} alt='Logo' id='arrow' onClick={toggleDropdown} />
      <label className='toggle-button'>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={handleToggle}
          className='toggle-checkbox'
        />
        <span className='slider round'></span>
      </label>
      <hr className='line-separation-3'></hr>

      {showDropdown && (
        <div className='dropdown'>
          <ul className='habitLines'>
            {habits.map((habit) => (

              
              <li className='habits habit-container' key={habit._id} value={habit._id}>
                {habit.name}
                <input
                  type='time'
                  value={habitTimes[habit._id] || ''}
                  onChange={(e) => handleTimeChange(habit._id, e)}
                />
              </li>
              
              
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Notifications;