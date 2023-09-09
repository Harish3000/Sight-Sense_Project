import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer as ReactToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLogIn } from "../../hooks/User_hooks/useLogIn";
import validator from "validator";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, err, isLoading } = useLogIn();
  const navigate = useNavigate();

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();

    // Client-side email format validation
    if (!validator.isEmail(email)) {
      toast.error("Email is not valid");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      return;
    }

    //Client-side all fields filled checking
    if (!email || !password) {
      toast.error("Please fill out all the fields");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      return;
    }

    try {
      await login(email, password);
      // Login was successful
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    } catch (err) {
      // Login failed
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-body">
      <div className="div-for-login-box">
        <div className="login">
          <div className="login-heading-div">
            <h2>Login</h2>
          </div>

          <div className="login-form-container-div">
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
              {err && <div className="err">{err}</div>}
            </form>
          </div>
        </div>
      </div>
      <ReactToastContainer />
    </div>
  );
};

export default Login;
