import React, { useState } from 'react';
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
const API = process.env.REACT_APP_API || "http://localhost:3001"

const Registration = () => {
    const navigate = useNavigate('/')
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
        Axios.post(API + "/register", {
            name: data.name,
            email: data.email,
            password: data.password
        })
            .then(res => {
                console.log(res.data)
                alert('User-Created-SuccessFully')
                navigate('/login')
            }).catch((e) => {
                alert(e.message)
                console.log(e.message)
            })
    }
    return (
        <>
            <form onSubmit={(e) => { submit(e) }}>
                <input onChange={(e) => handle(e)} value={data.name} type="text" id="name" placeholder="User Name" required />
                <input onChange={(e) => handle(e)} value={data.email} type="email" id="email" placeholder="Email Address" required />
                <input onChange={(e) => handle(e)} value={data.password} type="password" id="password" placeholder="Password" required />
                <button type="submit">Sign Up</button>
            </form>
            <div>
            <button onClick={handleRoute}>Already Signed Up?</button>
            </div>
        </>
    )
}

export default Registration