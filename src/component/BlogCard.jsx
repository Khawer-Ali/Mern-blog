import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBlogState } from '../context/BlogContext';

const BlogCard = (props) => {

  const { setSingleblog, getUser } = useBlogState();
  const navigate = useNavigate();

  const handleClick = () => {
    setSingleblog({ title: props.blog.title, description: props.blog.description })
    navigate("/singleblog")
  };

  useEffect(() => {
    getUser();
  }, [])

  return (
    <div className='blog-card d-flex align-items-center justify-content-around'>
      <div className="content" onClick={handleClick}>
        <h2>{props.blog.title}</h2>
        <p>{props.blog.description.length <= 170 ? props.blog.description : props.blog.description.slice(0, 200) + '..........'}</p>
      </div>
      <div className="blogcard-img" onClick={handleClick}>
        <img src="https://cwh-full-next-space.fra1.digitaloceanspaces.com/blogpost/best-laptop-to-buy-in-2022/caf0efa8bbab1b415b3aa4d50b4432a7.webp" alt="blogImg" />
      </div>
    </div>
  )
}

export default BlogCard