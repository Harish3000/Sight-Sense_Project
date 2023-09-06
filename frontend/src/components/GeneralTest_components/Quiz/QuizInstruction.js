import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import Quizmage from "../../../assets/GeneralTest_assets/img/Question.png";
import QuestionAnswer from "../../../assets/GeneralTest_assets/img/QuestionAns.png";

const QuizInstruction = () => (
  <>
    <h1>Quiz Instructions</h1>
    <Fragment>
      <Helmet>Quiz Instruction-Eye Quiz</Helmet>
      <div className="instructions-container">
        <h2>How Test Your Eyes</h2>
        <p>Ensure you read this guide from start to finish.</p>
        <ul className="browser-default" id="main-list">
          <li>
            The Eye Quiz has a duration of 15 minutes and ends as soon as your
            time elapses.
          </li>
          <li>Each Eye Quiz consists of 15 questions</li>
          <li>
            Every Question contains 4 Options
            <img src={Quizmage} alt="Quiz Options" />
          </li>
          <li>
            Select the option which best answers the question by clicking it.
          </li>
          <li style={{ paddingLeft: "300px" }}>
            <img src={QuestionAnswer} alt="Quiz Options" />
          </li>
          <li>
            feel free to quit at any time In that case your score will be
            revealed afterwards.
          </li>
          <li>The timer starts as soon as the Quiz Loads</li>
          <li>Let's do this if you think you are got what it takes ?</li>
        </ul>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ textAlign: "left" }}>
            <Link to="/general-test/QuizHome">No take me back</Link>
          </span>
          <span style={{ textAlign: "right" }}>
            <Link to="/general-test/play/quiz">Okay Let's Do this</Link>
          </span>
        </div>
      </div>
    </Fragment>
  </>
);

export default QuizInstruction;
