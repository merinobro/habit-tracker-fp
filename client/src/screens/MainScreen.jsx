/* RE: Menubar

the Menubar component needs the correct activeScreen prop:
<MenuBar activeScreen="main" /> */



// import React, { useState } from "react";
// import "../styles/MainScreen.css";
// import Header from "../components/Header";
// import MenuBar from "../components/Menubar";
// import HabitCard from "../components/HabitCard";
// import AddHabitCardButton from "../components/AddHabitCardButton";

// const MainScreen = () => {
//   const [habitCount, setHabitCount] = useState(1);

//   const addHabitCard = () => {
//     if (habitCount < 5) {
//       setHabitCount(habitCount + 1);
//     }
//   };

//   return (
//     <div className="main-screen-light">
//         <div className="div">
//       <Header />

//       <div className="habit-card-container">
//         {/* Display a single HabitCard by default */}
//         {[...Array(habitCount)].map((_, index) => (
//           <HabitCard key={index} />
//         ))}
//       </div>

//       {/* AddHabitCardButton component */}
//       <AddHabitCardButton addHabitCard={addHabitCard} />

//       <MenuBar activeScreen="main" />
//       </div>
//     </div>
//   );
// };

// export default MainScreen;






import React, { useState, useEffect } from "react";
import "../styles/MainScreen.css";
import Header from "../components/Header";
import MenuBar from "../components/Menubar";
import HabitCard from "../components/HabitCard";
import AddHabitCardButton from "../components/AddHabitCardButton";

const MainScreen = () => {
  const [habitCount, setHabitCount] = useState(1);
  // Initialize habitData as an empty array
  const [habitData, setHabitData] = useState([]);


  useEffect(() => {
    console.log("Attempting to load habit data...");
    const storedData = localStorage.getItem("habitData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (Array.isArray(parsedData)) {
        console.log("Loaded habit data:", parsedData);
        setHabitData(parsedData);
      } else {
        console.error("Invalid habit data format:", parsedData);
      }
    } else {
      // If there's no stored data, initialize habitData with a single habit card
      setHabitData([{ text: "", completed: false }]);
    }
  }, []);

  const addHabitCard = () => {
    if (habitCount < 5) {
      // Create a new habit card data
      const newHabitCard = { text: "", completed: false };

      // Update the habitData state with the new data
      const updatedData = [...habitData, newHabitCard];
      setHabitData(updatedData);

      // Increment habitCount
      setHabitCount(habitCount + 1);

      // Save the updated habitData to local storage
      localStorage.setItem("habitData", JSON.stringify(updatedData));
    } else {
      // Display an alert or message to inform the user that the limit has been reached
      alert("You cannot add more than 5 habit cards.");
    }
  };

  return (
    <div className="main-screen-light">
      <div className="div">
        <Header />

        <div className="habit-card-container">
          {habitData.map((habit, index) => (
            <HabitCard
              key={index}
              text={habit.text}
              completed={habit.completed}
              onUpdate={(updatedHabit) => {
                // Update the habitData state with the updated card
                const updatedData = [...habitData];
                updatedData[index] = updatedHabit;
                setHabitData(updatedData);

                // Save the updated habitData to local storage
                localStorage.setItem("habitData", JSON.stringify(updatedData));
              }}
            />
          ))}
        </div>

        <AddHabitCardButton addHabitCard={addHabitCard} disabled={habitCount >= 5} />

        <MenuBar activeScreen="main" />
      </div>
    </div>
  );
};

export default MainScreen;




