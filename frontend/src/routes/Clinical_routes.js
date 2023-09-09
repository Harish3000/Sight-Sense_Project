import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import AddForm from "./Components/AddForm";

export default function Clinical_routes() {
  return (
    <Routes>
        <Route extract path="/" element={<HomePage />} />
        <Route extract path="/newClinic" element={<AddForm />} />
    </Routes>
  );
}
