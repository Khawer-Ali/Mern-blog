import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBlogState } from '../context/BlogContext';

const BlogCard = (props) => {
  const { setSingleblog } = useBlogState();
  const navigate = useNavigate();
  let Path = 'http://localhost:5000/images/';

  const handleClick = () => {
    setSingleblog({ title: props.blog.title, description: props.blog.description,img : props.blog.img ,author : props.blog.author,avatar : props.blog.avatar})
    navigate("/singleblog")
  };
 
  return (
    <div className='blog-card d-flex align-items-center justify-content-around border'>
      <di className="content" onClick={handleClick}>
        <h2>{props.blog.title}</h2>
        <p>{props.blog.description.length <= 170 ? props.blog.description : props.blog.description.slice(0, 200) + '..........'}</p>
         <div className='my-2'>
         <img src={Path + props.blog.avatar} className="img-fluid blog-user-img mx-1" />
        <span>{props.blog.author}</span>
        <br />
        <span>{new Date(props.blog.date).toLocaleString()}</span>
         </div>
         <div>
          <p>Tag</p>
         <span className=''><mark>{props.blog.category}</mark></span>
         </div>

      </di>
      <div className="blogcard-img" onClick={handleClick}>
        <img src={Path + props.blog.img} alt="blogImg" />
      </div>
    </div>
  )
}

export default BlogCard