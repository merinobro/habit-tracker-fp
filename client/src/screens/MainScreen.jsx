/* RE: Menubar

the Menubar component needs the correct activeScreen prop:
<MenuBar activeScreen="main" /> */



import React, { useState } from "react";
import "../styles/MainScreen.css";
import Header from "../components/Header";
import MenuBar from "../components/Menubar";
import HabitCard from "../components/HabitCard";
import AddHabitCardButton from "../components/AddHabitCardButton";

const MainScreen = () => {
  const [habitCount, setHabitCount] = useState(1);

  const addHabitCard = () => {
    if (habitCount < 5) {
      setHabitCount(habitCount + 1);
    }
  };

  return (
    <div className="main-screen-light">
        <div className="div">
      <Header />

      <div className="habit-card-container">
        {/* Display a single HabitCard by default */}
        {[...Array(habitCount)].map((_, index) => (
          <HabitCard key={index} />
        ))}
      </div>

      {/* AddHabitCardButton component */}
      <AddHabitCardButton addHabitCard={addHabitCard} />

      <MenuBar activeScreen="main" />
      </div>
    </div>
  );
};

export default MainScreen;





