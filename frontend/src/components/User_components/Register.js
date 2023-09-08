import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer as ReactToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [addLine1, setAddLine1] = useState("");
  const [addLine2, setAddLine2] = useState("");
  const [addLine3, setAddLine3] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
        axios
          .post("http://localhost:4000/api/users/createuser", {
            firstname,
            lastname,
            contact,
            addLine1,
            addLine2,
            addLine3,
            gender,
            email,
            password,
          })
          .then(() => {
            toast.success("Registration Success!!");
            setTimeout(() => {
              navigate("/");
            }, 3000);
          })
          .catch((err) => console.log(err));

        // Reset the form after submission
        setFirstName("");
        setLastName("");
        setContact("");
        setAddLine1("");
        setAddLine2("");
        setAddLine3("");
        setGender("");
        setEmail("");
        setPassword("");
  };

  return (
    <div className="reg-body">
      <div className="div-for-reg-box">
        <div className="reg">
          <div className="reg-heading">
            <h2>Registration Form</h2>
          </div>
          <div className="reg-form-container">
            <form onSubmit={handleSubmit}>
              <label>First Name:</label>
              <input
                id="firstname"
                type="text"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <br></br>
              <label>Last Name:</label>
              <input
                id="lastname"
                type="text"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <br></br>
              <label>Contact Number:</label>
              <input
                id="contact"
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
              <br></br>
              <label>Address:</label>
              <input
                placeholder="Address line 1"
                id="add-line1"
                type="text"
                value={addLine1}
                onChange={(e) => setAddLine1(e.target.value)}
                required
              />
              <br></br>
              <input
                placeholder="Address line 2"
                id="add-line2"
                type="text"
                value={addLine2}
                onChange={(e) => setAddLine2(e.target.value)}
                required
              />
              <br></br>
              <input
                placeholder="Address line 3"
                id="add-line3"
                type="text"
                value={addLine3}
                onChange={(e) => setAddLine3(e.target.value)}
                required
              />
              <br></br>
              <label>Gender:</label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </label>
              <br></br>
              <label>Email:</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br></br>
              <label>Password:</label>
              <input
                id="pwd"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <br></br>
              <div className="btns-div">
                <button type="submit">Register</button>
                <Link to="/login">
                  <button type="button">Cancel</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ReactToastContainer />
    </div>
  );
};

export default Register;
