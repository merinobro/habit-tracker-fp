import React from "react";

import Header from "./Header.jsx";
import Menubar from "./Menubar.jsx";


const ProgressReportCard = () => {
  // Hardcoded values
  const habitName = 'Eat';
  const progressInDays = 27;
  const totalDays = 30;

  // Calculate progress percentage
  const progressPercentage = (progressInDays / totalDays) * 100;

  return (
    <div className="progress-card">
      <div className="top-section">
        <div className="habit-name">{habitName}</div>
        <div className="progress-text">
          {progressInDays}/{totalDays} days
        </div>
      </div>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressReportCard;