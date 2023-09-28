/*Ruppert 0928: updated the routes to reflect the intended user-flow. 

note that this might still be cumbersome as of now, since the welcome & sign-up screen aren't integrated with the backend yet. 

depending on which screen you are working on, you will likely want to set up a route that takes you to your work-in-progress screen for testing purposes */

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import WelcomeScreen from "./screens/WelcomeScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SettingsScreen from './screens/Settings/SettingsScreen';
import ProgressReportScreen from "./screens/ProgressReportScreen";
import MainScreen from "./screens/MainScreen";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomeScreen />} /> 
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/main" element={<MainScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/progress-report" element={<ProgressReportScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


/* Below = routes from before 202309281420, minus the EditHabitsScreen - as we decided to no longer need that anyway */

/* import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import WelcomeScreen from "./screens/WelcomeScreen";
import SettingsScreen from './screens/Settings/SettingsScreen';
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
          <Route path="/progress-report" element={<ProgressReportScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; */



