import React from "react";
import { FaInstagram , FaCamera ,FaPowerOff} from "react-icons/fa";
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
        navigate('/')
    }

    return (
        <>
        <div className="head">
            <FaInstagram size='3.5em' className="logo" onClick={handlePostsRoute} />
            <h2 className="tagname"  onClick={handlePostsRoute}>InstaClone</h2>
            <FaCamera size="3.5em" className="cam" onClick={handleRoute}/>
            <FaPowerOff className="logout" onClick={handleLogout} size="3em"/>
        </div>
        </>
    )
}

export default Header
