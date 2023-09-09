import React from 'react';
import { useContext } from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';
import { ToastContainer as ReactToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLogOut } from '../../hooks/User_hooks/useLogOut';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../contexts/User_context/AuthContext';

export default function UserProfile() {
    
    const navigate = useNavigate();
    const [updatedUser, setUpdatedUser] = useState({
      firstname: "",
      lastname: "",
      contact: "",
      addLine1: "",
      addLine2: "",
      addLine3: "",
    });
    
    const { logout } = useLogOut();
    const { user } = useContext(AuthContext);

    //logout function
    const handleLogOut = () => {
        logout();
        toast.success("Logging out...");
        setTimeout(() => {
            navigate("/");
          }, 3000);
    }

    //update function
    const handleEdit = async(UserId) => {
        console.log("Update button clicked")
    }

    //delete function
    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete your account?');
    
        if (confirmDelete) {
          try {
            // Send a DELETE request to delete the user's account
            const response = await axios.delete(`http://localhost:4000/api/users/${user.user._id}`);
    
            if (response.status === 200) {
              // Logout the user and redirect to the homepage
              logout();
              toast.success("Profile has been successfully deleted");
              setTimeout(() => {
                navigate("/");
              }, 3000);
            }
          } catch (error) {
            console.error('Error deleting user:', error);
          }
        }
      };

    return (
        <div>
            <h1>User Profile</h1>
            {user && (
                <div>
                    {user.user.firstname}{user.user.lastname}
                    <br></br>
                    {user.user.contact}
                    <br></br>
                    {user.user.email}
                    <br></br>
                    {user.user.addLine1}
                    <br></br>
                    {user.user.addLine2}
                    <br></br>
                    {user.user.addLine3}
                    </div>
            )}
            <div>
            <button type='button' onClick={() => handleEdit(user.user._id)}>edit</button>
            </div>

            <div>
            <button type='button' onClick={() => handleDelete(user.user._id)}>delete</button>
            </div>

            <div>
            
                <button type='button' onClick={handleLogOut}>logout</button>
                
            </div>
            <ReactToastContainer />
        </div>
    );
}
