import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer as ReactToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLogIn } from "../../hooks/User_hooks/useLogIn";
import validator from "validator";
import { Input, Button, Alert } from "antd";

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
              height: "20vh",
            }}
          >
            <form onSubmit={handleLoginFormSubmit}>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label>Password :</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="btns-div">
                <button type="submit" disabled={isLoading}>
                  Login
                </button>
                <Link to="/register">
                  <button type="button">Register</button>
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
