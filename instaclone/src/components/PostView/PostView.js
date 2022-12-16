import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API = process.env.REACT_APP_API || "http://localhost:3001"

const PostView = () => {
    const navigate = useNavigate('/')
    const [data, setData] = useState([])
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, [])

    useEffect(()=>{
        axios.get(API + "/posts", {
            headers: {
                'authorization': localStorage.getItem('token')
            }
        }).then((res) => {
            console.log(res.data)
            setData(res.data)
        }).catch((e) => {
            console.log(e.message)
        })
    },[])



    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.reload()
    }
    const handlePost = () => {
        navigate("/upload")
    }


    return (
        <>
            Posts

            <button onClick={handleLogout}>LogOut</button>
            <button onClick={handlePost}>NEW POST</button>
        </>
    )
}

export default PostView