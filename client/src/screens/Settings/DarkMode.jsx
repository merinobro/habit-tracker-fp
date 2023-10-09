import React from "react";
import "../Settings/DarkMode.css";

function DarkMode() {
  return (
    <div className='text-wrapper-4 '>
      <div className={`App `}>
        <button>{"Dark Mode"}</button>
      </div>
      <hr className="line-separation-4"></hr>
    </div>
  );
}

export default DarkMode;
