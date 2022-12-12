import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBlogState } from '../context/BlogContext';
import { RiDeleteBin5Fill } from 'react-icons/Ri';
import { FaEdit } from 'react-icons/Fa';


const MyblogsCard = (props) => {
    const { setSingleblog, getUser, deleteBlog, detail } = useBlogState();
    const navigate = useNavigate();

    const handleClick = () => {
        setSingleblog({ title: props.blog.title, description: props.blog.description })
        navigate("/singleblog")
    };

    const handleDelete = (id) => {
        deleteBlog(id);
    };

    useEffect(() => {
        getUser();
    }, [])

    return (
        <div className='blog-card d-flex align-items-center justify-content-around'>
            <div>
                {props.blog.user == detail && <>
                    <RiDeleteBin5Fill onClick={() => handleDelete(props.blog._id)} />
                    <FaEdit onClick={() => props.handleOpen(props.blog)} />
                </>}
                <div className="content" onClick={handleClick}>
                    <h2>{props.blog.title}</h2>
                    <p>{props.blog.description.length <= 170 ? props.blog.description : props.blog.description.slice(0, 200) + '..........'}</p>
                </div>
            </div>
            <div className="blogcard-img" onClick={handleClick}>
                <img src="https://cwh-full-next-space.fra1.digitaloceanspaces.com/blogpost/best-laptop-to-buy-in-2022/caf0efa8bbab1b415b3aa4d50b4432a7.webp" alt="blogImg" />
            </div>
        </div>
    )
}

export default MyblogsCard