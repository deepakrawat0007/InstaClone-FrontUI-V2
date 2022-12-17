import React from "react";
import { FaInstagram , FaCamera ,FaPowerOff ,FaUserCircle} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./header.css"
const Header = ()=>{
    const navigate = useNavigate('/')
    const handleRoute = ()=>{
navigate('/upload')
    }
    const handlePostsRoute =()=>{
        navigate('/posts')
    }
    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.reload()
    }
    const handleAccountRoute = ()=>{
        navigate('/user')

    }

    return (
        <>
        <div className="head">
            <FaInstagram size='3.5em' className="logo" onClick={handlePostsRoute} />
            <h2 className="tagname"  onClick={handlePostsRoute}>InstaClone</h2>
            <FaCamera size="3.5em" className="cam" onClick={handleRoute}/>
            <FaUserCircle size="3.1em" onClick={handleAccountRoute} className="user"/>
            <FaPowerOff className="logout" onClick={handleLogout} size="3em"/>
        </div>
        </>
    )
}

export default Header