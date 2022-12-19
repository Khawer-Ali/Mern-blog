import React, { useState } from 'react'
import { useContext } from 'react';

const BlogContext = React.createContext();

const BlogState = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [myBlogs, setMyBlogs] = useState([]);
  const [detail, setDetail] = useState('');
  const [user, setUser] = useState({})
  const [loading, setloading] = useState(false)

  const [singleblog, setSingleblog] = useState({ title: "", description: "" })

  // Fetch all Blog
  const getBlog = async () => {
    setloading(true)
    const response = await fetch("http://localhost:5000/api/blog/getBlog", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("authToken")
      }
    });

    
    const json = await response.json();
    setloading(false)
    setBlogs(json)
  };

  // Fetch My Blog
  const myBlog = async () => {
    setloading(true)
    const response = await fetch("http://localhost:5000/api/blog/myBlog", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("authToken")
      }
    });

    const json = await response.json();
    console.log(json);
    setloading(false)
    setMyBlogs(json)
  };

   // Delete  Blog
   const deleteBlog = async (id) => {
    const response = await fetch(`http://localhost:5000/api/blog/deleteblog/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("authToken")
      }
    });

    const json = await response.json();
    console.log(json);
    getBlog();
    myBlog();
  };

    // Edit  Blog
    const editBlog = async (id,title, description, category, img) => {
      const response = await fetch(`http://localhost:5000/api/blog/editblog/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem("authToken")
        },
        body: JSON.stringify({title, description, category, img})
      });
  
      const json = await response.json();
      console.log(json);
      getBlog();
      myBlog();
    };

  // Create Blog
  const createBlog = async (title, description, category, img,author,avatar) => {
    const response = await fetch("http://localhost:5000/api/blog/createblog", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("authToken")
      },
      body: JSON.stringify(title, description, category, img,author,avatar)
    });
    const json = await response.json();
    console.log(json);
  };

  // get login user details
  const getUser = async () => {
    setloading(true)
    const response = await fetch("http://localhost:5000/api/auth/getuser", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken')
      },
    });

    const json = await response.json();
    setDetail(json._id)
    setUser(json)
    setloading(false)
  };


  return <BlogContext.Provider value={{ getBlog, blogs, setloading,createBlog,loading, setSingleblog, singleblog, myBlog, myBlogs, detail, setDetail,getUser,user ,deleteBlog,editBlog}}>
    {children}
  </BlogContext.Provider>
};

const useBlogState = () => {
  return useContext(BlogContext);
};

export { BlogState, useBlogState };