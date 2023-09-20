import React from "react";
import twitter from '../assets/User_assets/img/twitter.png';
import insta from '../assets/User_assets/img/instagram.png';
import google from '../assets/User_assets/img/google.png';
import linkedin from '../assets/User_assets/img/linkedin.png';
import github from '../assets/User_assets/img/github.png';
import fb from '../assets/User_assets/img/facebook.png';

const Footer = () => {
  return (
    <div
      style={{
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingBottom: "20px",
        paddingTop: "10px",
        backgroundColor: "#CED2CC",
      }}
    >
      <footer className="text-center text-lg-start bg-light text-muted">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <p style={{paddingTop:"30px", fontSize:"18px", fontWeight:"bold"}}>GET CONNECTED WITH US ON SOCIAL NETWORKS</p>
          </div>
          <div style={{display:"flex"}}>
            <p><img src={fb} style={{height:"70px", width:"70px", padding:"10px"}}/></p>
            <p><img src={twitter} style={{height:"70px", width:"70px", padding:"10px"}}/></p>
            <p><img src={google} style={{height:"70px", width:"70px", padding:"10px"}}/></p>
            <p><img src={insta} style={{height:"70px", width:"70px", padding:"10px"}}/></p>
            <p><img src={linkedin} style={{height:"70px", width:"70px", padding:"10px"}}/></p>
            <p><img src={github} style={{height:"70px", width:"70px", padding:"10px"}}/></p>
          </div>
        </section>
        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3"></i>Sight sense
                </h6>
                <p style={{ textAlign: "justify" }}>
                  Sight Sense is a cutting-edge vision testing platform powered
                  by AI technology. It provides precise, accessible vision
                  assessments through an Azure-based prediction API, promoting
                  affordability and accessibility through partnerships with eye
                  care organizations and clinics.
                </p>
              </div>
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                <p>BASIC VISION TESTING</p>
                <p>ADVANCED DIAGNOSIS</p>
                <p>AI BASED TESTING</p>
                <p>CLINICAL SERVICE</p>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <i className="fas fa-home me-3"></i> 123A, Galle Road, Colombo
                  03, Sri Lanka
                </p>
                <p>
                  <i className="fas fa-envelope me-3"></i>
                  info@sightsense.com
                </p>
                <p>
                  <i className="fas fa-phone me-3"></i> + 94 11 2 255 619
                </p>
                <p>
                  <i className="fas fa-print me-3"></i> + 78 23 4 567 899
                </p>
              </div>
            </div>
          </div>
        </section>
        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2023 Copyright
          <a
            className="text-reset fw-bold"
            href="https://google.com/"
            style={{ paddingLeft: "5px" }}
          >
            sightsence.lk
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
