import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Menubar.css';

// Importing SVGs first, instead of linking directly from ../assets in each link, to ensure correct rendering
import settingsIcon from '../assets/settings.svg';
/* commenting this out, as we decided to no longer need the EditHabitScreen */
/* import listIcon from '../assets/list.svg'; */
import progressIcon from '../assets/progress.svg';
import homeIcon from '../assets/home.svg';

function MenuBar({ activeScreen }) {
  return (
    <nav className="menu-bar">
      <Link to="/settings" className={activeScreen === 'settings' ? 'active' : ''}>
        <img src={settingsIcon} alt="settings" />
      </Link>
     {/*  <Link to="/edit-habit" className={activeScreen === 'edit-habit' ? 'active' : ''}>
        <img src={listIcon} alt="edit habit" />
      </Link> */}
      <Link to="/progress-report" className={activeScreen === 'progress-report' ? 'active' : ''}>
        <img src={progressIcon} alt="progress report" />
      </Link>
      <Link to="/" className={activeScreen === 'main' ? 'active' : ''}>
        <img src={homeIcon} alt="home" />
      </Link>
    </nav>
  );
}

export default MenuBar;
