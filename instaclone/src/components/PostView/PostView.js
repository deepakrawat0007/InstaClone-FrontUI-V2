import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './postview.css';
import { IconContext } from "react-icons/lib";
import { FaRegHeart, FaTelegramPlane, FaDotCircle } from "react-icons/fa";
import ToastContext from "../context/ToastContext";
import Header from "../Header/header";
import Spinner from "../../image/Spinner-0.5s-164px.svg"
const API = "https://instclone-bck-api.onrender.com"

const PostView = () => {
    const { toast } = useContext(ToastContext)
    const navigate = useNavigate('/')
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [initcolor, setColor] = useState(false)
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            toast.error("Session Expired Login Again")
            navigate('/login')
        }
    }, [])

    useEffect(() => {
        axios.get(API + "/posts", {
            headers: {
                'authorization': localStorage.getItem('token')
            }
        }).then((res) => {
            // console.log(res.data)
            setData(res.data)
            setLoading(false)
        }).catch((e) => {
            // console.log(e.message)
            setLoading(false)
            toast.error("Failed to Load Kindly Re-login")
        })
    }, [])
    const handleColor = () => {
        if (initcolor) {
            setColor(false)
        } else {
            setColor(true)
        }
    }



    return (
        <>
            <Header />
            {loading ? (<img className='spinner' src={Spinner} alt="loding" />) : ""}
            <div className="post-container" style={{ marginTop: "7%" }}>
                {data.map((items, idx) => (


                    <section>

                        <div className="upperbody">
                            <div><strong>{items.name}</strong></div>
                            <div>{items.location}</div>
                            <div className="more">
                                <FaDotCircle /><FaDotCircle /><FaDotCircle /></div>
                        </div>

                        <div><img className="post-img" src={items.image} /></div>
                        <div className="icons">
                            <IconContext.Provider value={initcolor ? { color: 'red' } : ''}>
                                <FaRegHeart size='1.5em' className="heart" onClick={handleColor} />
                            </IconContext.Provider>

                            <FaTelegramPlane className="icons" size='1.5em' /><div className="date">{new Date().toDateString()}</div> </div>

                        <div className="like">{items.likes} Likes</div>
                        <div className="desc"><strong>{items.description}</strong></div>
                    </section>

                ))}


            </div>
        </>
    )
}

export default PostView