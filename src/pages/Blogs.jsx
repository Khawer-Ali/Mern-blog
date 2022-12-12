import React, { useEffect } from 'react'
import BlogCard from '../component/BlogCard'
import { useBlogState } from '../context/BlogContext';

const Blogs = () => {
  const { getBlog, blogs,getUser } = useBlogState();

  useEffect(() => {
    getBlog();
    getUser();
  }, [])

  return (
    <div className='container blog-container'>
        <div className="row">
                <h2 className='my-2'>Recent Blog</h2>
            <div className="col-lg-7 col-12">
            {blogs.map((blog) => {
              return <BlogCard key={blog._id} blog = {blog} />
            })}
            </div>
            <div className="col-lg-3 col-12 tags">
                <h2>Tags</h2>
                <button type="button" className="btn btn-light border mx-1  mt-2">Programming</button>
                <button type="button" className="btn btn-light border mx-1  mt-2">Sports</button>
                <button type="button" className="btn btn-light border mx-1  mt-2">Tech</button>
                <button type="button" className="btn btn-light border mx-1  mt-2">Science</button>
                <button type="button" className="btn btn-light border mx-1  mt-2">Politics</button>

            </div>
        </div>
    </div>
  )
}

export default Blogs