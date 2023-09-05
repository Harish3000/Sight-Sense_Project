import React from "react";
import { Route, Routes } from "react-router-dom";
import Test from "../components/GeneralTest_components/test";
import QuizInstruction from "../components/GeneralTest_components/Quiz/QuizInstruction";

export default function GeneralTest_routes() {
  return (
    <Routes>
      <Route path="/general-test/test" element={<Test />} />
      <Route
        path="/general-test/quiz-instruction"
        element={<QuizInstruction />}
      />
    </Routes>
  );
}
