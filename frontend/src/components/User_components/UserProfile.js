import React from 'react';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { ToastContainer as ReactToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLogOut } from '../../hooks/User_hooks/useLogOut';

export default function UserProfile() {

    const { logout } = useLogOut();

    const handleLogOut = () => {
        logout();
    }

    return (
        <div>
            <h1>User Profile</h1>
            

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
