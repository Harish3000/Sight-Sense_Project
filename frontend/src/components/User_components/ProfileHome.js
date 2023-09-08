import React from 'react'
import { Link } from 'react-router-dom'

export default function ProfileHome() {
  return (
    <div>
        <Link to="/login">
        <button type='button'>Get Started !</button>
        </Link>
    </div>
  )
}
