import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBlogState } from '../context/BlogContext';
import { RiDeleteBin5Fill } from 'react-icons/Ri';
import { FaEdit } from 'react-icons/Fa';

const MyblogsCard = (props) => {
    const { setSingleblog, getUser, user,deleteBlog, detail } = useBlogState();
    const navigate = useNavigate();

    let avatar = user.profile;
    let author = user.name;

    const handleClick = () => {
        setSingleblog({ title: props.blog.title, description: props.blog.description,img : props.blog.img,avatar,author })
        navigate("/singleblog")
    };

    const handleDelete = (id) => {
        deleteBlog(id);
    };

   if (localStorage.getItem("authToken")) {
    useEffect(() => {
        getUser();
    }, [])
   }

    return (
        <div className='blog-card d-flex align-items-center justify-content-around border p-2'>
            <div>
                {props.blog.user == detail && <>
                    <RiDeleteBin5Fill onClick={() => handleDelete(props.blog._id)} />
                    <FaEdit onClick={() => props.handleOpen(props.blog)} />
                </>}
                <div className="content" onClick={handleClick}>
                    <h2>{props.blog.title}</h2>
                    <p>{props.blog.description.length <= 170 ? props.blog.description : props.blog.description.slice(0, 200) + '..........'}</p>
                    <p>Tag</p>
                  <p><mark>{props.blog.category}</mark></p>
                </div>
            </div>
            <div className="blogcard-img" onClick={handleClick}>
                <img src={"http://localhost:5000/images/" + props.blog.img} alt="blogImg" />
            </div>
        </div>
    )
}

export default MyblogsCard