import React from "react";
import videoBg from "../Images/Backround_video.mp4";
import "../../styles/GeneralTest/Clinical/Main.css";
import Admin from "../../pages/Clinical_pages/AddForm.js";

function Main() {
  return (
    <div className="main">
      <video src={videoBg} autoPlay loop muted />
      <div className="content">
        <Admin />
      </div>
    </div>
  );
}

export default Main;
