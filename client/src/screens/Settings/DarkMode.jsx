import React from "react";
import { useTheme } from "../../store/themeContext";
import "../Settings/DarkMode.css";

function DarkMode() {

  const { isDarkTheme, toggleTheme } = useTheme();
  
  return (
    <>

    <div className="text-wrapper-4" onClick={toggleTheme}>
    {isDarkTheme ? "Light Mode" : "Dark Mode"}
    </div>
    <hr className="line-separation-1"></hr>

  
  </>
  );
}

export default DarkMode;

