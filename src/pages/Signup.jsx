import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {

    const [credential,setCredential] = useState({name : "",email : "",password : ""});
    const navigate = useNavigate();


   useEffect(() => {
    if(localStorage.getItem("authToken")) {
        navigate("/")
      } 
   },[])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            
            body: JSON.stringify({name : credential.name,email : credential.email,password:credential.password}) 
          });

          let json = await response.json(); 
          console.log(json);

        if(json.success) {
            alert("Signup Successfully");
            navigate("/login")
          }
    };

    const handleChange = (e) => {
        setCredential({...credential,[e.target.name] : e.target.value})
    };

    return (
        <div className="container">
            <div className="row d-flex align-items-center login">
            <h2 className='text-center'>Signup</h2>
                <div className="col-12 col-lg-6">
                    <img src="https://img.freepik.com/free-vector/blogging-fun-content-creation-online-streaming-video-blog-young-girl-making-selfie-social-network-sharing-feedback-self-promotion-strategy-vector-isolated-concept-metaphor-illustration_335657-855.jpg?size=338&ext=jpg&ga=GA1.2.1680799215.1669978655&semt=sph" alt="" />
                </div>
                <div className="col-12 col-lg-6">
                    <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                            <input type="text" className="form-control" name='name' value={credential.name} minLength='3' required onChange={handleChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" required className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credential.email} onChange={handleChange} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" value={credential.password} required minLength="5" onChange={handleChange} name="password" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    <p className='my-4'>Already have an account <Link to="/login">Login</Link></p>
                </div>
            </div>

        </div>
    )
}



export default Signup