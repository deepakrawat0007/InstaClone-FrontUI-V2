import React, { useState } from 'react';
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import "./registration.css"
import loginImg from "../../image/loginImg.png"
import Spinner from "../../image/Spinner-0.5s-164px.svg"
const API = process.env.REACT_APP_API || "http://localhost:3001"

const Registration = () => {
    const navigate = useNavigate('/')
    const [loading , setLoading] = useState(false)
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const handleRoute = ()=>{
        navigate('/login')
    }
    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }
    function submit(e) {
        e.preventDefault()
        setLoading(true)
        Axios.post(API + "/register", {
            name: data.name,
            email: data.email,
            password: data.password
        })
            .then(res => {
                // console.log(res.data)
                setLoading(false)
                alert('User-Created-SuccessFully')
                navigate('/login')

            }).catch((e) => {
                setLoading(false)
                alert(e.message)
                // console.log(e.message)
            })
    }
    return (
        <>
        {loading?(<img className='spinner' src={Spinner} alt="loding" />):""}
        <div className='container'>
            <img src={loginImg} alt="loginImage"/>
            <div className='form-container'>
                <h2>InstaClone</h2>
                <h4>Sign up to see photos and videos from your friends.</h4>
            <form onSubmit={(e) => { submit(e) }}>
                {/* <label id='name'>NAME</label> */}
                <input onChange={(e) => handle(e)} value={data.name} type="text" id="name" placeholder="User Name" required />
                {/* <label id='email'>EMAIL</label> */}
                <input onChange={(e) => handle(e)} value={data.email} type="email" id="email" placeholder="Email Address" required />
                {/* <label id='password'>PASSWORD</label> */}
                <input onChange={(e) => handle(e)} value={data.password} type="password" id="password" placeholder="Password" required />
                <button type="submit">Sign Up</button>
            </form>
          
            <div>
            <button onClick={handleRoute}>Already Signed Up?</button>
            </div>
            </div>
            </div>
        </>
    )
}

export default Registration