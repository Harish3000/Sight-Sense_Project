import React from "react";
import "../../styles/GeneralTest/Clinical/card.css";

function ClinicCard() {
 
  return (
    <div className="CardContainer">
      <div className="Card">
        <h1 className="h1">Asiri centers</h1>
        <div className="description">
          <h3 className="h3">Colombo</h3>
          <h3 className="h3">011223623</h3>
          <a href="" className="link">
            www.asiriHospital.com
          </a>
        </div>
      </div>
    </div>
  );
}

export default ClinicCard;
