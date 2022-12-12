import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import CreateBlog from './pages/CreateBlog'
import Home from './pages/Home'
import Login from './pages/Login'
import Myblogs from './pages/Myblogs'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import SingleBlog from './pages/SingleBlog'

const App = () => {
  return (
    <>
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/createblog" element={<CreateBlog/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/singleblog" element={<SingleBlog/>} />
      <Route path="/myblogs" element={<Myblogs/>} />
     </Routes>
    </BrowserRouter>
    </>
  )
}

export default App