import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer as ReactToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLogIn } from "../../hooks/User_hooks/useLogIn";
import validator from "validator";
import { Input, Button, Alert } from "antd";
import VideoBG from '../../assets/Backround_video.mp4';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Declare errorMessage state
  const { login, isLoading } = useLogIn();
  const navigate = useNavigate();

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error message

    if (!validator.isEmail(email)) {
      setErrorMessage("Email is not valid");
      return;
    }

    if (!email || !password) {
      setErrorMessage("Please fill out all the fields");
      return;
    }

    try {
      await login(email, password);

      // If no errors occurred, navigate to the home page
      navigate("/home");
    } catch (err) {
      // Handle errors from the hook
      setErrorMessage(err.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-body">
      <video
        src={VideoBG}
        autoPlay
        loop
        muted
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
        title="Background Video"
      />
      <div className="div-for-login-box">
        <div className="login">
          <div className="login-heading-div">
            <h2
              style={{
                fontFamily: "Poppins",
                textAlign: "center",
                paddingTop: "200px",
                fontSize: "44px",
              }}
            >
              Login
            </h2>
          </div>

          <div
            className="login-form-container-div"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "30vh",
            }}
          >
            <form
              onSubmit={handleLoginFormSubmit}
              style={{
                width: "100%",
                maxWidth: "500px",
                padding: "20px", // Adjust padding as needed
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start", // Align labels and inputs to the start of the container
              }}
            >
              <div style={{ marginBottom: "10px" }}>
                <label style={{ fontSize: "20px", marginRight: "10px" }}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    fontSize: "20px",
                    width: "350px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "5px",
                    marginLeft: "34px",
                  }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ fontSize: "20px", marginRight: "10px" }}>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    fontSize: "20px",
                    width: "350px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "5px",
                  }}
                />
              </div>
              <div
                className="btns-div"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={isLoading}
                  style={{
                    color: "#ffffff",
                    backgroundColor: "#6AB187",
                    marginRight: "20px",
                    marginLeft: "120px",
                    fontSize: '20px' ,width: '100px', height: '50px'
                  }}
                >
                  Login
                </Button>
                <Link to="/register">
                  <Button
                    type="primary"
                    size="large"
                    style={{ color: "#ffffff" ,fontSize: '20px' ,width: '100px', height: '50px', backgroundColor: "#1F3F49"}}
                  >
                    Register
                  </Button>
                </Link>
              </div>

              {errorMessage && (
                <Alert
                  message="Error"
                  description={errorMessage}
                  type="error"
                  showIcon
                  style={{
                    position: "fixed",
                    top: "30px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: "9999",
                  }}
                  closable
                  onClose={() => setErrorMessage("")}
                />
              )}
            </form>
          </div>
        </div>
      </div>
      <ReactToastContainer />
    </div>
  );
};

export default Login;