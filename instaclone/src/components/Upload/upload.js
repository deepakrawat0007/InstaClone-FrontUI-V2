import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./upload.css"
import Header from '../Header/header'
import postImg from "../../image/postImg.png"
import Spinner from "../../image/Spinner-0.5s-164px.svg"
import ToastContext from '../context/ToastContext'
const API_KEY = "https://instclone-bck-api.onrender.com"

function Upload() {
    const navigate = useNavigate()
    const { toast } = useContext(ToastContext);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            toast.error("Session Expired Login Again")
            navigate('/login')
        }
    }, [])

    const submitbutton = async (e) => {
        e.preventDefault()
        setLoading(true)
        const data = e.target
        const formData = new FormData(data)
        console.log(formData);
        try {
            await fetch(`${API_KEY}/posts`, { method: "POST", body: formData, headers: { "authorization": localStorage.getItem('token') } })
                .then((res) => {
                    return res.json()
                }).then((data) => {
                    toast.success("Post Success")
                    setLoading(false)
                    // console.log(data);
                    navigate('/posts')
                })
                .catch((err) => {
                    setLoading(false)
                    // console.log(err)
                    toast.error(err.response.data.message)
                })


        } catch (error) {
            toast.error(error.response.data.message)
        }

    }

    return (
        <div>
            <Header />
            {loading ? (<img className='spinner' src={Spinner} alt="loding" />) : ""}
            <div className='container' style={{ marginTop: "7%" }}>
                <img src={postImg} className="post-img2 bg-img" />
                <div className='form-holder'>
                    <form onSubmit={(e) => submitbutton(e)}>
                        <div className='file-desc' >
                            <input type={"file"} name='file' placeholder="No File Choosen" />
                        </div>
                        <div className="author-location">
                            <input type={"text"} name="name" placeholder="Author" />
                            <input type={"text"} name="location" placeholder="Location" />
                        </div>
                        <div className='file-desc'>
                            <input type={"text"} name="description" placeholder="Description" />
                        </div>
                        <div>
                            <button type='submit' className='postButton' >Post</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Upload

