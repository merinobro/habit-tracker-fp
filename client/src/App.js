import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import WelcomeScreen from "./screens/WelcomeScreen";
import SettingsScreen from './screens/Settings/SettingsScreen';
import EditHabitScreen from "./screens/EditHabitScreen";
import ProgressReportScreen from "./screens/ProgressReportScreen";
import MainScreen from "./screens/MainScreen";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/welcome" element={<WelcomeScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/edit-habit" element={<EditHabitScreen />} />
          <Route path="/progress-report" element={<ProgressReportScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
