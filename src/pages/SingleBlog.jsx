import React from 'react'
import { useBlogState } from '../context/BlogContext';

const SingleBlog = () => {

    const {singleblog} = useBlogState();

    let description = singleblog.description.replace('...','.')


    console.log(singleblog,8);

  return (
    <div className='container'>
        <div className="row">
            <div className="col-12 my-2">
            <img src={'http://localhost:5000/images/' + singleblog.img} className='img-fluid blog-main-img'  alt="blogImg" /> 
            </div>
        </div>

        <div className="row my-4">
            <div className="col-12">
                <h2>{singleblog.title}</h2>
                <p>{description}</p>
                 <h2 className='my-4'>Author</h2>
                <div>
                 <img src={'http://localhost:5000/images/' + singleblog.avatar} alt="" className='mx-2 img-fluid blog-user-img' />   
                <span>{singleblog.author}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SingleBlog