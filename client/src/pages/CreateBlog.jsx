import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar'
import { useBlogState } from '../context/BlogContext'
import loader from '../images/loader.gif'

const CreateBlog = () => {
   
    const { createBlog,user,getUser } = useBlogState();
    const [blog, setblog] = useState({ title: "", description: "", category: "",img: "",author : "",avatar : "" });
    const [img,setImg] = useState(null); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formdata = new FormData();
        const filename = Date.now() + img.name;
        formdata.append("name", filename);
        formdata.append("image", img);
        let author = user.name;
        let avatar = user.profile;

        const newblog = { ...blog, img: filename,author: author,avatar : avatar};

        try {
            await fetch("http://localhost:5000/api/upload/",{
                 method:'POST',
                 body: formdata
              }); 
        } catch (error) {
            console.log(error.message);
        }
        await createBlog(newblog);
        navigate("/")        
    };

    const handleChange = (e) => {
        setblog({ ...blog, [e.target.name]: e.target.value })
    };

  


    useEffect(() => {
       getUser()
     },[])

    return (
        <>
            <Navbar />
               <div className='container'>
                <h2 className='text-center my-4'>Create Your Own Blog</h2>
                <form method='post' onSubmit={handleSubmit} encType='multipart/form-data'>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Title :</label>
                        <input type="text" className="form-control" value={blog.title} onChange={handleChange} required id="exampleFormControlInput1" name='title' placeholder="Enter title" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Select Image :</label>
                        <br />
                        <input type="file" name='image' required onChange={(e) => setImg(e.target.files[0])} />
                    </div>
                    <div className="mb-3">

                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                        <textarea className="form-control" minLength='20' name="description" value={blog.description} onChange={handleChange} id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Category :</label>
                        <input type="text" className="form-control" name="category" value={blog.category} onChange={handleChange} required id="exampleFormControlInput1" placeholder="Enter Catergory" />
                    </div>

                    <button type='submit' className='btn btn-primary'>Create Blog</button>
                </form>
            </div>
        </>
    )
}

export default CreateBlog