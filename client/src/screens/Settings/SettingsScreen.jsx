import React from "react";
import ChangePassword from "./ChangePassword.jsx";
import Logout from "./LogOut.jsx";
import DeleteAccount from "./DeleteAccount.jsx";
import MenuBar from "../../components/Menubar.jsx";
import "../../styles/Menubar.css";
import "../../styles/MainScreen.css";
import "../Settings/SettingsScreen.css";
import DarkMode from "./DarkMode.jsx";
import StrikeThrough from "./StrikeThrough.jsx";
import Notifications from "../Settings/Notifications.jsx";

const SettingsScreen = () => {
  
  return (
    <>
      <div className="div">
        <h1 className="settings-heading ">Settings</h1>
        <hr className="line-separation"></hr>
        <DarkMode />
        <StrikeThrough />
        <Notifications/>
        <ChangePassword />
        <Logout />
        <DeleteAccount />
        <MenuBar />
      </div>
    </>
  );
};

export default SettingsScreen;
