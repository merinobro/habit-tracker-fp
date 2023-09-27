/* RE: Menubar

the Menubar component needs the correct activeScreen prop:
<MenuBar activeScreen="settings" /> */

import DarkMode from "./Theme.js";
import ChangePassword from "./ChangePassword.js";
import DeleteAccount from "./DeleteAccount.js";
import "./SettingsScreen.css";

const SettingsScreen = () => {

    return(
        <>
            <DarkMode/>
            <ChangePassword/>
            <DeleteAccount />
        </>
    )
}

export default SettingsScreen