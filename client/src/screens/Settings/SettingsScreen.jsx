import React from "react";
import ChangePassword from "./ChangePassword.jsx";
import Logout from "./LogOut.jsx";
import DeleteAccount from "./DeleteAccount.jsx";
import MenuBar from "../../components/Menubar.jsx";
import "../../styles/Menubar.css";
import "../../styles/MainScreen.css";
import "./SettingsScreen.css";
import DarkMode from "./DarkMode.jsx";
import StrikeThrough from "./StrikeThrough.jsx";

const SettingsScreen = () => {
  return (
    <>
      <div className='main-screen-light'>
        <h1 className='settings-heading '>Settings</h1>
        <hr class='line-separation'></hr>
        <DarkMode />
        <StrikeThrough />
        <ChangePassword />
        <Logout />
        <DeleteAccount />
        <MenuBar />
      </div>
    </>
  );
};

export default SettingsScreen;
