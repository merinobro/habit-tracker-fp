/* RE: Menubar

the Menubar component needs the correct activeScreen prop:
<MenuBar activeScreen="progress-report" /> */

import React from "react";
import ProgressReportCard from "../components/ProgressReportCard";
import Header from "../components/Header.jsx";
import Menubar from "../components/Menubar.jsx";

const ProgressReportScreen = () => {
  return (
    <div className="progress-screen">
      <div><Header/></div>
      <div>
        <ProgressReportCard />
        <ProgressReportCard />
        <ProgressReportCard />
      </div>
      <div><Menubar/></div>
    </div>
  );
};

export default ProgressReportScreen