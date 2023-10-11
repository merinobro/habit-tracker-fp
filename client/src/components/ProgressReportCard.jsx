import React from "react";

const ProgressReportCard = ({ habitName, progressInDays }) => {
  const totalDays = 30;
  const progressPercentage = (progressInDays / totalDays) * 100;

  return (
    <div className='progress-card'>
      <div className='top-section'>
        <div className='habit-name'>{habitName}</div>
        <div className='progress-text'>
          {progressInDays}/{totalDays} days
        </div>
      </div>
      <div className='progress-bar'>
        <div
          className='progress'
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressReportCard;
