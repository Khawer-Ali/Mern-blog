import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BlogState } from './context/BlogContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BlogState>
    <App />
    </BlogState>
  </React.StrictMode>
)
