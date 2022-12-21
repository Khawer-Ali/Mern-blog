import { useEffect } from 'react'
import Navbar from '../component/Navbar'
import { useBlogState } from '../context/BlogContext'
import { CgProfile } from 'react-icons/Cg';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const { getUser, user } = useBlogState();
  const navigate = useNavigate();

  const handleDelete = async () => {
    let isDelete = confirm("Are you sure you want to delete this Account ?");

    if (isDelete) {
      try {
        const response = await fetch("http://localhost:5000/api/auth/delete/account", {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("authToken")
          }
        });
    
        const json = await response.json();
        console.log(json);
        navigate('/')
        localStorage.removeItem("authToken");
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, [])

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="content d-flex flex-column justify-content-center ">
          <div className='profile my-4 d-flex align-items-center '>
            {user.profile == '' ? <CgProfile className='mx-2' /> : <img src={"http://localhost:5000/images/"  + user.profile} className="img-fluid profile-img" />}
          </div>
          <h4>Name : {user.name}</h4>
          <h4>Email : {user.email}</h4>
        </div>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete Account</button>

      </div>
    </>

  )
}

export default Profile