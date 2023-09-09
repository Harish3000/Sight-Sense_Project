import React from 'react';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { ToastContainer as ReactToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLogOut } from '../../hooks/User_hooks/useLogOut';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../contexts/User_context/AuthContext';

export default function UserProfile() {
    
    const navigate = useNavigate();

    const { logout } = useLogOut();
    const { user } = useContext(AuthContext);

    const handleLogOut = () => {
        logout();
        toast.success("Logging out...");
        setTimeout(() => {
            navigate("/");
          }, 3000);
    }

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
                <button type='button'>edit</button>
            </div>

            <div>
                <button type='button'>delete</button>
            </div>

            <div>
            
                <button type='button' onClick={handleLogOut}>logout</button>
                
            </div>
            <ReactToastContainer />
        </div>
    );
}
