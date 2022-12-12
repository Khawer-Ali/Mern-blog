import React from 'react'
import { Link } from 'react-router-dom'

const Herosection = () => {
    return (
        <div className="container">
            <div className="row align-items-center hero-container">
                <div className="col-12 col-lg-6">
                    <div className="left">
                        <h1 className='main-heading'>Welcome to <span className='text-purple'>Mr.Blog</span></h1>
                        <p>This site is created for people to read and create their own blog , if you want to create blog Sign up on our site</p>
                        {!localStorage.getItem('authToken') ? <Link type="button" to="/signup" className="btn btn-outline-primary mx-1">Sign Up</Link> :  <Link type="button" to="/createblog" className="btn btn-outline-primary">Create Blog</Link> }
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <div className="right">
                        <img src="heroImg.png" className='img-fluid' alt="heroImg" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Herosection