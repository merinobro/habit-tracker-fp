import React from "react";
import { Link } from "react-router-dom";
import "../styles/Menubar.css";

import settingsIcon from "../assets/settings.svg";

import progressIcon from "../assets/progress.svg";
import homeIcon from "../assets/home.svg";

function MenuBar({ activeScreen }) {
  return (
    <nav className='menu-bar'>
      <Link
        to='/settings'
        className={activeScreen === "settings" ? "active" : ""}
      >
        <img src={settingsIcon} alt='settings' />
      </Link>

      <Link
        to='/progress-report'
        className={activeScreen === "progress-report" ? "active" : ""}
      >
        <img src={progressIcon} alt='progress report' />
      </Link>
      <Link to='/' className={activeScreen === "main" ? "active" : ""}>
        <img src={homeIcon} alt='home' />
      </Link>
    </nav>
  );
}

export default MenuBar;
