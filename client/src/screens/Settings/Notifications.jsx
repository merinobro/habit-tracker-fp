import React, { useState } from 'react';
import "../Settings/Notifications.css";
import arrowdown from "../../assets/arrowdown.svg";

const Notifications = () => {
  const [isChecked, setIsChecked] = useState(false);

  
  const handleToggle = () => {
    setIsChecked(!isChecked);

    
    if (!isChecked) {
      
      scheduleRemindersForHabit();
    } else {
      cancelRemindersForHabit();
    }
  };

  const scheduleRemindersForHabit = () => {
    console.log('Notifications enabled - Schedule reminders for the habit');
  };

  const cancelRemindersForHabit = () => {
    console.log('Notifications disabled - Cancel reminders for the habit');
  };

  return (
    <>
      <button className='text-wrapper-6'>Notifications</button>
      <hr></hr>
      <img src={arrowdown} alt='Logo' className='arrowdown' />
      <label className='toggle-button'>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={handleToggle}
          className='toggle-checkbox'
        />
        <span className='slider round'></span>
      </label>

    </>
  );
};

export default Notifications;