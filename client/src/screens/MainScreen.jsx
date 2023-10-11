import React, { useContext, useState } from "react";
import "../styles/MainScreen.css";
import Header from "../components/Header";
import MenuBar from "../components/Menubar";
import HabitCard from "../components/HabitCard";
import AddHabitCardButton from "../components/AddHabitCardButton";
import { addHabit, getHabits } from "../apiCalls/habitApiCalls";
import { DataContext } from "../store/context";

const MainScreen = () => {
  const { habitsState, dispatchHabits, usersState } = useContext(DataContext);
  const { listId } = usersState;

  const [habitName, setHabitName] = useState("");

  const handleAddCard = async () => {
    if (habitName.trim() !== "") {
      const habit = { name: habitName };
      await addHabit(dispatchHabits, habit, listId);
      await getHabits(dispatchHabits, listId);
      setHabitName("");
    }
  };

  return (
    <div className='main-screen-light'>
      <div className='div'>
      <Header title='List of Habits' />

        <div className='habit-card-container'>
          {habitsState.habits.length > 0 &&
            habitsState.habits.map((habit) => (
              <HabitCard key={habit._id} habit={habit} />
            ))}
        </div>

        <AddHabitCardButton
          addHabitCard={handleAddCard}
          setHabitName={setHabitName}
          habitName={habitName}
        />

        <MenuBar activeScreen='main' />
      </div>
    </div>
  );
};

export default MainScreen;
