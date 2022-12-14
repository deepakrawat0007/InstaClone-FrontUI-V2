import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../Header/header";
import axios from "axios";
import { IconContext } from "react-icons/lib";
import { FaRegHeart, FaTelegramPlane, FaRegCommentDots, FaComment, FaPowerOff, FaRegDotCircle, FaDotCircle, FaLevelDownAlt } from "react-icons/fa";


const API = process.env.REACT_APP_API || "http://localhost:3001"

const Account = () => {
    const [name, setName] = useState()
    const [initcolor, setColor] = useState(false)
    const [data, setData] = useState([])

    const navigate = useNavigate('/')
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }

    }, [])
    useEffect(() => {
        axios.get(API + "/user/posts", {
            headers: {
                'authorization': localStorage.getItem('token')
            }
        }).then((res) => {
            console.log(res.data)
            setData(res.data)
        }).catch((e) => {
            console.log(e.message)
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

            <div className="post-container">
                {data.map((items, idx) => (
                    <section className="slide">
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

export default Account;