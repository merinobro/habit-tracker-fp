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

  const handleAddCard = () => {
    const habit = { name: "" };
    addHabit(dispatchHabits, habit, listId);
  };

  return (
    <div className='main-screen-light'>
      <div className='div'>
        <Header />

        <div className='habit-card-container'>
          {habitsState.habits.length > 0 &&
            habitsState.habits.map((habit) => (
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
