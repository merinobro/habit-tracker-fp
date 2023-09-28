import React from "react";
import { useTheme } from "./ThemeContext.js";
import "../Settings/ThemeContext.css";
import "../Settings/DarkMode.css";

function DarkMode() {

    const { isDarkTheme, toggleTheme } = useTheme();
    return(

        <div className="text-wrapper-4 ">
        <div className={`App ${isDarkTheme ? 'dark' : 'light'}`}>  {/* wrap everything in a div */}
        <button onClick={toggleTheme}> {/* toggle button */}
        {isDarkTheme ? 'Light Mode' : 'Dark Mode'}
        </button>
        </div>
        </div>
    )
}

export default DarkMode
