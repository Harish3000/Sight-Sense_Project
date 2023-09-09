import React from "react";
import videoBg from "../Images/Backround_video.mp4";
import "../Styles/Main.css";
import Admin from "./AddForm.js";

function Main() {
  return (
    <div className="main">
      <video src={videoBg} autoPlay loop muted />
        <div className="content">
            <Admin/>
        </div>
    </div>
  );
}

export default Main;
