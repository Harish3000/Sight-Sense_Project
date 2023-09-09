import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/User_context/AuthContext";
import { toast } from "react-toastify";
import { ToastContainer as ReactToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useLogOut } from "../../hooks/User_hooks/useLogOut";

export default function UpdateUser() {

    const { logout } = useLogOut();
    const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Get the current user's data
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    contact: "",
    addLine1: "",
    addLine2: "",
    addLine3: "",
    gender: "",
    email: "",
  });

  useEffect(() => {
    // Populate the form with the current user's data when the component mounts
    if (user && user.user) {
      const {
        firstname,
        lastname,
        contact,
        addLine1,
        addLine2,
        addLine3,
        gender,
        email,
      } = user.user;
      setFormData({
        firstname,
        lastname,
        contact,
        addLine1,
        addLine2,
        addLine3,
        gender,
        email,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a PUT request to update the user's profile
      const response = await axios.put(
        `http://localhost:4000/api/users/${user.user._id}`,
        formData
      );

      if (response.status === 200) {
        logout();
        toast.success("Profile Details Updated Successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      }
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit}>
        {/* Input fields for each user profile field */}
        <div>
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="contact">Contact:</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="addLine1">Address Line 1:</label>
          <input
            type="text"
            id="addLine1"
            name="addLine1"
            value={formData.addLine1}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="addLine2">Address Line 2:</label>
          <input
            type="text"
            id="addLine2"
            name="addLine2"
            value={formData.addLine2}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="addLine3">Address Line 3:</label>
          <input
            type="text"
            id="addLine3"
            name="addLine3"
            value={formData.addLine3}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Update</button>
        <button type="button">Cancel</button>
      </form>
      <ReactToastContainer />
    </div>
  );
}
