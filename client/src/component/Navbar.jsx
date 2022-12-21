import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CgProfile } from "react-icons/Cg";
import { BsFillMoonStarsFill } from 'react-icons/Bs';
import { useState } from 'react';

const Navbar = () => {

  const navigate = useNavigate();
  const [color, setColor] = useState('white');


  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login")
  };

  const handelClick = () => {
    if (color == 'white') {
      setColor('black')
      document.body.style.background = '#121212';
      document.body.style.color = 'white';
    } else {
      setColor('white')
      document.body.style.background = 'white';
      document.body.style.color = 'black';
    }
  };

  return (
    <div className='nav-container d-flex justify-content-between'>
      <div className="logo" >
        <Link className="logo" to="/">Mr.Blog</Link>
        </div>

      <div className='d-flex justify-content-center align-items-center'>
        <BsFillMoonStarsFill className='mx-2' onClick={handelClick} />
        {!localStorage.getItem("authToken") ?
          <div className="btn-field">
            <Link type="button" className="btn btn-outline-primary mx-1" to="/login">Login</Link>
            <Link type="button" className="btn btn-outline-primary mx-1" to="/signup">Sign Up</Link>
          </div>
          :
          <div className='d-flex'>
            <Link type="button" className="btn btn-outline-primary mx-2" to='/myblogs' >My Blogs</Link>
            <button type="button" className="btn btn-outline-primary mx-2" onClick={handleLogout} >LogOut</button>
            <Link className='mx-1 cursor-pointer ' to='/profile'><CgProfile className='profile-icon' /></Link>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar