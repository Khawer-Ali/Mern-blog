import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar'
import { useBlogState } from '../context/BlogContext'

const CreateBlog = () => {

   const {createBlog} = useBlogState();
   const [credential,setCredential] = useState({title : "",description : "",category : "",img : ""});
   const navigate = useNavigate();
  
   const handleSubmit = async (e) => {
    e.preventDefault();
    await createBlog(credential);
    navigate("/")
   };

   const handleChange = (e) => {
    setCredential({...credential,[e.target.name] : e.target.value})
};

    return (
        <>
        <Navbar />
        <div className='container'>
            <h2 className='text-center my-4'>Create Your Own Blog</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Title :</label>
                    <input type="text" className="form-control" value={credential.title} onChange={handleChange} id="exampleFormControlInput1" name='title' placeholder="Enter title" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Select Image :</label>
                    <br />
                    <input type="file" accept="image/*"  name='img' onChange={handleChange} />
                </div>
                <div className="mb-3">

                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                    <textarea className="form-control" minLength='20' name="description" value={credential.description} onChange={handleChange} id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Category :</label>
                    <input type="text" className="form-control" name="category" value={credential.category} onChange={handleChange} id="exampleFormControlInput1" placeholder="Enter Catergory" />
                </div>
             
                <button className='btn btn-primary'>Create Blog</button>
            </form>
        </div>
        </>
    )
}

export default CreateBlog