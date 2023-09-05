import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import Icon from "@mdi/react";
import { mdiEyeCircleOutline } from "@mdi/js";
import { Link } from "react-router-dom";

const Qhome = () => (
  <Fragment>
    <Helmet>
      <title>Eye Quiz</title>
    </Helmet>
    <div id="Qhome">
      <section>
        <h1>
          <b>Eye Quiz</b>
        </h1>
        <span>
          {" "}
          <div style={{ textAlign: "center" }}>
            <Icon path={mdiEyeCircleOutline} size={4} color="black" />
          </div>
        </span>
        <h1>Welcome To Eye Quiz</h1>
        <div className="play-button-container">
          <ul>
            <li>
              <Link className="play-btn" to="/play/instructions">
                PLAY
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </Fragment>
);
export default Qhome;
