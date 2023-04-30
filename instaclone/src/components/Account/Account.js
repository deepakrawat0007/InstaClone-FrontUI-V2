import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/header";
import ChnageImagePrompt from "../ChangeImagePrompt";
import axios from "axios";
import "./account.css"
import Spinner from "../../image/Spinner-0.5s-164px.svg"
import ToastContext from "../context/ToastContext"
const API = "https://instclone-bck-api.onrender.com"

const Account = () => {
    const { toast } = useContext(ToastContext)
    const [loading, setLoading] = useState(true)
    const [updatePrompt, setUpdatePrompt] = useState(false)
    const [data, setData] = useState({})
    const [posts, setPosts] = useState([])

    const navigate = useNavigate('/')
    const APICALL = async () => {
        await axios.get(API + "/userAccount", {
            headers: {
                'authorization': localStorage.getItem('token')
            }
        }).then((res) => {

            // console.log(res.data)
            setData(res.data.Details)
            setPosts(res.data.posts)
            setLoading(false)
        }).catch((e) => {
            setLoading(false)
            toast.error(e.response.data.message)
            // console.log(e.message)
        })
    }
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
            toast.error("Session Expired Login Again")
        }
        APICALL()
    }, [])

    const handleEdit = () => {
        setUpdatePrompt(true)
    }
    const closePrompt = () => { // function for passing as a prop to close the prompt
        APICALL()
        setUpdatePrompt(false)
    }


    return (
        <>
            {loading ? (<img className='spinner' src={Spinner} alt="loding" />) : ""}
            <Header />
            <header >

                <div class="cont">

                    <div class="profile">

                        <div class="profile-image">

                            <img src={data?.profileImg} width={200} height={200} alt="" />

                            <div className="btn-edit" onClick={handleEdit} style={{ cursor: "pointer" }}>Edit</div>


                        </div>

                        <div class="profile-user-settings">

                            <h1 class="profile-user-name">{data?.username}</h1>

                            <button class="btn profile-edit-btn">Edit Profile</button>

                            <button class="btn profile-settings-btn" aria-label="profile settings"><i class="fas fa-cog" aria-hidden="true"></i></button>

                        </div>
                        <div className="prompt">
                            {updatePrompt && <ChnageImagePrompt closePrompt={closePrompt} />}
                        </div>

                        <div class="profile-stats">

                            <ul>
                                <li><span class="profile-stat-count">{posts?.length}</span> posts</li>
                                <li><span class="profile-stat-count">{Math.floor(Math.random() * 3000)}</span> followers</li>
                                <li><span class="profile-stat-count">{Math.floor(Math.random() * 300)}</span> following</li>
                            </ul>

                        </div>

                        <div class="profile-bio">

                            <p><span class="profile-real-name">{data?.bio}</span></p>

                        </div>

                    </div>
                    {/* <!-- End of profile section --> */}

                </div>
                {/* <!-- End of cont --> */}

            </header>

            <main style={{ margin: "0" }}>

                <div class="cont">

                    <div class="gallery">
                        {posts?.map((post) => (
                            <div class="gallery-item" tabindex="0">

                                <img src={post.image} class="gallery-image" alt="" />

                                <div class="gallery-item-info">

                                    <ul>
                                        <li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i> {post.likes}</li>
                                        <li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="fas fa-comment" aria-hidden="true"></i>{Math.floor(Math.random() * 100)}</li>
                                    </ul>

                                </div>

                            </div>
                        ))}
                    </div>
                </div>

            </main>
        </>
    )
}

export default Account;