import React from 'react'
import { useBlogState } from '../context/BlogContext';

const SingleBlog = () => {

    const {singleblog} = useBlogState();

    let description = singleblog.description.replace('...','.')


  return (
    <div className='container'>
        <div className="row">
            <div className="col-12">
            <img src="https://cwh-full-next-space.fra1.digitaloceanspaces.com/blogpost/best-laptop-to-buy-in-2022/caf0efa8bbab1b415b3aa4d50b4432a7.webp" className='img-fluid'  alt="blogImg" /> 
            </div>
        </div>

        <div className="row">
            <div className="col-12">
                <h2>{singleblog.title}</h2>
                <p>{description}</p>
            </div>
        </div>
    </div>
  )
}

export default SingleBlog