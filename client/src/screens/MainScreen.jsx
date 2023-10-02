/* RE: Menubar

the Menubar component needs the correct activeScreen prop:
<MenuBar activeScreen="main" /> */




// import React, { useState, useEffect } from "react";
// import "../styles/MainScreen.css";
// import Header from "../components/Header";
// import MenuBar from "../components/Menubar";
// import HabitCard from "../components/HabitCard";
// import AddHabitCardButton from "../components/AddHabitCardButton";
// import { v4 as uuidv4 } from 'uuid';

// const MainScreen = () => {
//   const [habitCount, setHabitCount] = useState(1);
//   const [habitData, setHabitData] = useState([]);

//   useEffect(() => {
//     console.log("Attempting to load habit data...");
//     const storedData = localStorage.getItem("habitData");
//     if (storedData) {
//       const parsedData = JSON.parse(storedData);
//       if (Array.isArray(parsedData)) {
//         console.log("Loaded habit data:", parsedData);
//         setHabitData(parsedData);
//         setHabitCount(parsedData.length);
//       } else {
//         console.error("Invalid habit data format:", parsedData);
//       }
//     } else {
//       // If there's no stored data, initialize habitData with a single habit card
//       setHabitData([{ id: uuidv4(), text: "", completed: false }]);
//     }
//   }, []);

//   const addHabitCard = () => {
//     if (habitCount < 5) {
//       // Create a new habit card data with a unique ID
//       const newHabitCard = { id: uuidv4(), text: "", completed: false };

//       // Update the habitData state with the new data
//       const updatedData = [...habitData, newHabitCard];
//       setHabitData(updatedData);

//       // Increment habitCount
//       setHabitCount(habitCount + 1);

//       // Save the updated habitData to local storage
//       localStorage.setItem("habitData", JSON.stringify(updatedData));
//     } else {
//       // Display an alert or message to inform the user that the limit has been reached
//       alert("You cannot add more than 5 habit cards.");
//     }
//   };

//   const handleDeleteCard = (id) => {
//     // Implement the logic to delete the card with the specified id
//     const updatedData = habitData.filter((habit) => habit.id !== id);
//     setHabitData(updatedData);

//     // Save the updated habitData to local storage
//     localStorage.setItem("habitData", JSON.stringify(updatedData));
//     setHabitCount(updatedData.length);
//   };

//   return (
//     <div className="main-screen-light">
//       <div className="div">
//         <Header />

//         <div className="habit-card-container">
//           {habitData.map((habit) => (
//             <HabitCard
//               key={habit.id}
//               id={habit.id} // Pass the id as a prop
//               text={habit.text}
//               completed={habit.completed}
//               onUpdate={(updatedHabit) => {
//                 const updatedData = [...habitData];
//                 const index = updatedData.findIndex((h) => h.id === updatedHabit.id);
//                 updatedData[index] = updatedHabit;
//                 setHabitData(updatedData);
//                 localStorage.setItem("habitData", JSON.stringify(updatedData));
//               }}
//               onDelete={(id) => handleDeleteCard(id)} // Pass the id to handleDeleteCard
//             />
//           ))}
//         </div>

//         <AddHabitCardButton addHabitCard={addHabitCard} disabled={habitCount >= 5} />

//         <MenuBar activeScreen="main" />
//       </div>
//     </div>
//   );
// };

// export default MainScreen;


import React, { useContext } from "react";
import "../styles/MainScreen.css";
import Header from "../components/Header";
import MenuBar from "../components/Menubar";
import HabitCard from "../components/HabitCard";
import AddHabitCardButton from "../components/AddHabitCardButton";
import { addHabit } from "../apiCalls/habitApiCalls";
import { DataContext } from "../store/context";

const MainScreen = () => {
  const { habitsState, dispatchHabits, usersState } = useContext(DataContext);
  const { listId } = usersState;

  console.log("state", habitsState);
  const handleAddCard = () => {
    const habit = { name: "" };
    addHabit(dispatchHabits, habit, listId);
  };

  return (
    <div className='main-screen-light'>
      <div className='div'>
        <Header />

        <div className='habit-card-container'>
          {habitsState.habits.map((habit) => (
            <HabitCard key={habit._id} habit={habit} />
          ))}
        </div>

        <AddHabitCardButton addHabitCard={handleAddCard} />

        <MenuBar activeScreen='main' />
      </div>
    </div>
  );
};

export default MainScreen;

