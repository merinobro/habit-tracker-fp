import React from "react";
import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import WelcomeScreen from "./screens/WelcomeScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SettingsScreen from "./screens/Settings/SettingsScreen";
import ProgressReportScreen from "./screens/ProgressReportScreen";
import MainScreen from "./screens/MainScreen";
import { useTheme } from "./store/themeContext";


function App() {

  const { isDarkTheme } = useTheme();
  return (
  
   
    <div className={`App ${isDarkTheme ? 'dark' : 'light'}`}>
      <Routes>
        <Route path='/' element={<WelcomeScreen />} />
        <Route path='/signup' element={<SignUpScreen />} />
        <Route path='/main' element={<MainScreen />} />
        <Route path='/settings' element={<SettingsScreen />} />
        <Route path='/progress-report' element={<ProgressReportScreen />} />
      </Routes>
    </div>
   
    

    
  );
}

export default App;
