import React, { useState } from 'react';
import "../Settings/Notifications.css";
import arrow from "../../assets/arrow.svg";

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
      <div className='text-wrapper-6'>Notifications</div>
      <img src={arrow} alt='Logo' id='arrow'  style={{ color: 'red' }}/>
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
    </>
  );
};

export default Notifications;