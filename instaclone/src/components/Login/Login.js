import React, { useState, useContext } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom"
import ToastContext from "../context/ToastContext";
import './login.css'
import loginImgg from '../../image/loginImgg.png'
import Spinner from "../../image/Spinner-0.5s-164px.svg"
const API = "https://instclone-bck-api.onrender.com"


const LoginPage = () => {
    const { toast } = useContext(ToastContext)
    const navigate = useNavigate('/')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const handleRoute = () => {
        navigate('/')
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        Axios.post(API + "/login", {
            email: data.email,
            password: data.password
        })
            .then((res) => {
                // console.log(res.data)
                toast.success(res.data.message)
                localStorage.setItem('token', res.data.Token)
                setLoading(false)
                navigate('/posts')
            }).catch((e) => {
                toast.error(e.response.data.message)
                setLoading(false)
                // console.log(e.message)
            })

    }
    const handleChange = (e) => {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }
    return (
        <>
            {loading ? (<img className='spinner' src={Spinner} alt="loding" />) : ""}
            <div className="Container">
                <img src={loginImgg} className='bg-img' />
                <div className="form-container">
                    <h2>InstaClone</h2>
                    <h4>Login to view new feeds</h4>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <input type="email" placeholder="Email" id="email" value={data.email} onChange={(e) => { handleChange(e) }} />
                        <input type="password" placeholder="Password" id="password" value={data.password} onChange={(e) => { handleChange(e) }} />
                        <button type="submit">Login</button>
                    </form>
                    <button onClick={handleRoute}>Register as a new user</button>
                </div>
            </div>

        </>
    )
}

export default LoginPage