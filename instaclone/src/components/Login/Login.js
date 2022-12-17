import React, { useState } from "react";
import Axios from "axios";
import {useNavigate} from "react-router-dom"
import './login.css'
import loginImgg from '../../image/loginImgg.png'
const API = process.env.REACT_APP_API || "http://localhost:3001"


const LoginPage = () => {
    const navigate = useNavigate('/')
    const [bool ,setBool ] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const handleRoute =()=>{
        navigate('/')
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.post(API + "/login", {
            email: data.email,
            password: data.password
        })
            .then((res) => {
                console.log(res.data)
                localStorage.setItem('token', res.data.Token)
                navigate('/posts')
                setBool(false)
            }).catch((e) => {
                setBool(true)
                console.log(e.message)
            })

    }
    const handleChange = (e) => {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }
    return (
        <>
        <div className="Container">
        <img src={loginImgg}/>
        <div className="form-container">
            <h2>InstaClone</h2>
            <h4>Login to view new feeds</h4>
            {bool?<div className="error">Invalid-Credentials</div>:''}
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