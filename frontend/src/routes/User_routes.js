import React from 'react'
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/User_pages/Login_home';
import RegisterPage from '../pages/User_pages/Register_home';
import ProfileHome from '../pages/User_pages/User_profile';

export default function User_routes() {
    return (
      <Routes>
      <Route  path="/" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/ProfileHome" element={<ProfileHome/>}/>
      </Routes>
    )
  }
