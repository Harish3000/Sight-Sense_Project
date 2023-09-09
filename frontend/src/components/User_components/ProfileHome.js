import React from 'react'
import { Link } from 'react-router-dom'
import BackgroundVideo from './BackgroundVideo'
import { Button } from 'antd';

export default function ProfileHome() {
  return (
    <div>
      <h1 style={{ fontFamily: 'Poppins', textAlign: 'center',paddingTop: '200px', fontSize: '60px'}}>Sight Sense</h1>
      <BackgroundVideo/>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
      <Link to="/login">
        <Button type="primary" size="large" style={{ fontSize: '24px' ,width: '200px', height: '60px' }}>Get Started !</Button>
        </Link>
      </div> 
    </div>
  )
}
