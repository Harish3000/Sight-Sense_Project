import React from "react";
import { Route, Routes } from "react-router-dom";
import ProfileHome from "../components/User_components/ProfileHome";
import Login from "../components/User_components/Login";
import Register from "../components/User_components/Register";

export default function User_routes() {
  return (
    <Routes>
      <Route>
      <Route path="/" element={< ProfileHome/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      </Route>
    </Routes>
  );
}
