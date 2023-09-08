import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer as ReactToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLogOut } from '../../hooks/User_hooks/useLogOut';

export default function UserProfile() {

    const { logout } = useLogOut();

    const handleLogOut = () => {
        logout();
    }
    
    const [user, setUser] = useState([]);

    return (
        <div>
            <h1>User Profile</h1>
            {user && (
                <div>
                    <p>First Name: {user.firstname}</p>
                    <p>Last Name: {user.lastname}</p>
                    <p>Contact: {user.contact}</p>
                    <p>Address Line 1: {user.addLine1}</p>
                    <p>Address Line 2: {user.addLine2}</p>
                    <p>Address Line 3: {user.addLine3}</p>
                    <p>Gender: {user.gender}</p>
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
