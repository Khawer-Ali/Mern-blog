import React, { useState } from 'react'
import { useEffect } from 'react'
import Navbar from '../component/Navbar'
import { useBlogState } from '../context/BlogContext'

const Profile = () => {

  const {getUser,user} =  useBlogState();
 
  useEffect(() => {
    getUser();
  }, [])

  return (
    <>
     <Navbar/>
     <div className="container">
      <div className="content d-flex flex-column justify-content-center ">
        <h4>Name : {user.name}</h4>
        <h4>Email : {user.email}</h4>
      </div>

     </div>
    </>

  )
}

export default Profile