import React, { useState } from 'react'
import { useContext } from 'react';

const BlogContext = React.createContext();

const BlogState = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [myBlogs, setMyBlogs] = useState([]);
  const [detail, setDetail] = useState('');
  const [user, setUser] = useState({})

  const [singleblog, setSingleblog] = useState({ title: "", description: "" })

  // Fetch all Blog
  const getBlog = async () => {
    const response = await fetch("http://localhost:5000/api/blog/getBlog", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("authToken")
      }
    });

    const json = await response.json();
    console.log(json);
    setBlogs(json)
  };

  // Fetch My Blog
  const myBlog = async () => {
    const response = await fetch("http://localhost:5000/api/blog/myBlog", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("authToken")
      }
    });

    const json = await response.json();
    console.log(json);
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
  const createBlog = async (title, description, category, img) => {
    const response = await fetch("http://localhost:5000/api/blog/createblog", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("authToken")
      },
      body: JSON.stringify(title, description, category, img)
    });
    const json = await response.json();
    console.log(json);
  };

  // get login user details
  const getUser = async () => {
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
  };


  return <BlogContext.Provider value={{ getBlog, blogs, createBlog, setSingleblog, singleblog, myBlog, myBlogs, detail, setDetail,getUser,user ,deleteBlog,editBlog}}>
    {children}
  </BlogContext.Provider>
};

const useBlogState = () => {
  return useContext(BlogContext);
};

export { BlogState, useBlogState };