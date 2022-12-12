import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import Navbar from '../component/Navbar';
import { useBlogState } from '../context/BlogContext'
import MyblogsCard from './MyblogsCard';

const Myblogs = () => {

    const { myBlog, myBlogs,editBlog } = useBlogState();

    const [blog, setBlog] = useState({id : "",title:"",description:"",category:"",img:""});
    const ref = useRef(null);
    const refclose = useRef(null);

    const handleOpen = (currentblog) => {
        ref.current.click();
        setBlog({ id: currentblog._id,title:currentblog.title,description:currentblog.description,category:currentblog.category,img:currentblog.img  })
    };

    const handleEdit = () => {
        editBlog(blog.id, blog.title, blog.description, blog.category, blog.img);
        refclose.current.click();
    };

    const handleChange = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value })
    };

    useEffect(() => {
        myBlog();
    }, [])

    return (
        <>
            <Navbar />
            <div className='container'>
                <h2 className='text-center my-2'>My Blogs</h2>
                {myBlogs.length > 0 ? myBlogs.map((blog) => {
                    return (
                        <MyblogsCard key={blog._id} blog={blog} handleOpen={handleOpen} handleEdit={handleEdit} />
                    )
                }) : <><p className='text-center my-4'>No blog to show . Add blog</p><hr /></>
                }
            </div>
            {/* Edit modal */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" ref={refclose} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="">
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Title :</label>
                                    <input type="text" className="form-control" value={blog.title} onChange={handleChange} id="exampleFormControlInput1" name='title' placeholder="Enter title" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Select Image :</label>
                                    <br />
                                    <input type="file" accept="image/*" name='img' value={blog.img} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                                    <textarea className="form-control" name="description" value={blog.description} onChange={handleChange} id="exampleFormControlTextarea1" rows="3"></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Category :</label>
                                    <input type="text" className="form-control" name="category" value={blog.category} onChange={handleChange} id="exampleFormControlInput1" placeholder="Enter Catergory" />
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" onClick={handleEdit}>Update Note</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Myblogs