/* RE: Menubar

the Menubar component needs the correct activeScreen prop:
<MenuBar activeScreen="settings" /> */

import React from "react";
import ChangePassword from "./ChangePassword.js";
import Logout from "./LogOut.js";
import DeleteAccount from "./DeleteAccount.js";
import MenuBar from "../../components/Menubar.js";
import "../../styles/Menubar.css";
import "../../styles/MainScreen.css";
import "../Settings/SettingsScreen.css";
import DarkMode from "./DarkMode.js";
import StrikeThrough from "./StrikeThrough.js";

const SettingsScreen = () => {
  return (
    <>
        <div className="main-screen-light">
            <h1 className="settings-heading ">Settings</h1> 
            <hr class="line-separation"></hr>
            <DarkMode/>
            <StrikeThrough/>
            <ChangePassword />
            <Logout />
            <DeleteAccount />
            <MenuBar />
         </div>
      
    </>
  );
};

export default SettingsScreen;

        
