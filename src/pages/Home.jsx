import React from 'react'
import Herosection from '../component/Herosection'
import Navbar from '../component/Navbar'
import Blogs from './Blogs'

const Home = () => {
    return (
        <>
            <Navbar />
            <Herosection />
            <Blogs />
        </>
    )
}

export default Home