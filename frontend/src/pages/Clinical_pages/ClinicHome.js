import React, { useEffect } from "react";
import NavBar from "../../components/Clinical_components/NavBar";
import "../../styles/GeneralTest/Clinical/homePage.css";
import Card from "../../components/Clinical_components/ClinicCard";
import axios from "axios";

function ClinicHome() {


  // useEffect(() => {
  //   const fetchdata = async () => {
  //     const data = await axios.get(
  //       "http://localhost:4000/api/Clinics/getClinic"
  //     );
  //     console.log(`clinics>>>>>`, data);
  //   };
  //   fetchdata();
  // }, []);

  return (
    <div>
      <NavBar />
      <div className="Main">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default ClinicHome;
