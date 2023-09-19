import React from 'react';
import { Link } from 'react-router-dom';
import './MenuBar.css';

function MenuBar({ activeScreen }) {
  return (
    <nav className="menu-bar">
      <Link to="/settings" className={activeScreen === 'settings' ? 'active' : ''}>
        <img src="../assets/settings.svg" alt="settings" />
      </Link>
      <Link to="/edit-habit" className={activeScreen === 'edit-habit' ? 'active' : ''}>
        <img src="../assets/list.svg" alt="edit habit" />
      </Link>
      <Link to="/progress-report" className={activeScreen === 'progress-report' ? 'active' : ''}>
        <img src="../assets/progress.svg" alt="progress report" />
      </Link>
      <Link to="/" className={activeScreen === 'main' ? 'active' : ''}>
        <img src="../assets/home.svg" alt="home" />
      </Link>
    </nav>
  );
}

export default MenuBar;