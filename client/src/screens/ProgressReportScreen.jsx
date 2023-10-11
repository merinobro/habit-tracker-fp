import React, { useContext } from "react";
import ProgressReportCard from "../components/ProgressReportCard";
import Header from "../components/Header.jsx";
import Menubar from "../components/Menubar.jsx";
import { DataContext } from "../store/context";
import "../styles/ProgressReportStyle.css";

const ProgressReportScreen = () => {
  const { habitsState } = useContext(DataContext);

  return (
    <div className='progress-screen'>
      <Header title='Progress Report' />
      <div>
        {habitsState.habits.map((habit) => (
          <ProgressReportCard
            key={habit._id}
            habitName={habit.name}
            progressInDays={habit.progress}
          />
        ))}
      </div>
      <Menubar />
    </div>
  );
};

export default ProgressReportScreen;
