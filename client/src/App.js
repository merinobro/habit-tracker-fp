import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './styles/App.css';
import WelcomeScreen from './screens/WelcomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import EditHabitScreen from './screens/EditHabitScreen';
import ProgressReportScreen from './screens/ProgressReportScreen';
import MainScreen from './screens/MainScreen';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={MainScreen}/>
        <Route path="/welcome" component={WelcomeScreen} /> 
        <Route path="/settings" component={SettingsScreen} />
        <Route path="/edit-habit" component={EditHabitScreen} />
        <Route path="/progress-report" component={ProgressReportScreen} />
      </div>
    </Router>
  );
}

export default App;
