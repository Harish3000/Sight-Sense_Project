import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer as ReactToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserProfile() {
    const [user, setUser] = useState([]);

    useEffect(() => {
        async function getUsers() {
            try {
                const response = await axios.get("http://localhost:4000/api/users/profile/dilhariedissanayake@gmail.com");
                setUser(response.data);
            } catch (error) {
                toast.error(error.message);
            }
        }

        getUsers();
    }, []);

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
            <ReactToastContainer />
        </div>
    );
}
