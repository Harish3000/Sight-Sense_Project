import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/Clinical_pages/HomePage";
import AddForm from "../pages/Clinical_pages/AddForm";

export default function Clinical_routes() {
  return (
    <Routes>
      <Route extract path="/clinicHome" element={<HomePage />} />
      <Route extract path="/newClinic" element={<AddForm />} />
    </Routes>
  );
}
