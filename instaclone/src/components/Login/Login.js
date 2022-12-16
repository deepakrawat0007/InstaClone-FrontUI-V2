import React, { useState } from "react";
import Axios from "axios";
import {useNavigate} from "react-router-dom"
const API = process.env.REACT_APP_API || "http://localhost:3001"


const LoginPage = () => {
    const navigate = useNavigate('/')
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
                alert(res.data.Message)
                navigate('/posts')
                //  window.location.reload()
            }).catch((e) => {
                alert("Invalid Credentials")
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
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="email" placeholder="Email" id="email" value={data.email} onChange={(e) => { handleChange(e) }} />
                <input type="password" placeholder="Password" id="password" value={data.password} onChange={(e) => { handleChange(e) }} />
                <button type="submit">Login</button>
            </form>
            <button onClick={handleRoute}>Register as a new user</button>
        </>
    )
}

export default LoginPage