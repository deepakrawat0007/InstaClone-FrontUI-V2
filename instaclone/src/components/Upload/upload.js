import React ,{ useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import "./upload.css"
import Header from '../Header/header'
import postImg from "../../image/postImg.png"
const API_KEY = process.env.REACT_APP_API || "http://localhost:3001" 

function Upload() {
    const navigate = useNavigate()
   
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, [])

    const submitbutton = async (e) => {
        e.preventDefault()
        const data = e.target
        const formData = new FormData(data)
        console.log(formData);
        try {
            await fetch(`${API_KEY}/posts`, { method: "POST", body:formData ,headers:{"authorization":localStorage.getItem('token')}})
                .then((res) => {
                    return res.json()
                }).then((data) => {
                    alert("Succesfully posted")
                    console.log(data);
                    navigate('/posts')
                })
                .catch((err) => { console.log(err) })


        } catch (error) {
           alert("error" , error.message)
        }

    }

    return (
        <div>
        <Header/>
        <div className='container'>
        <img src={postImg} className="post-img2"/>
            <div className='form-holder'>
                <form onSubmit={(e)=>submitbutton(e)}>
                    <div className='file-desc' >
                        <input type={"file"}  name='file' placeholder="No File Choosen"  />
                    </div>
                    <div className="author-location">
                        <input type={"text"} name="name" placeholder="Author"  />
                        <input type={"text"} name="location" placeholder="Location" />
                    </div>
                    <div className='file-desc'>
                        <input type={"text"} name="description" placeholder="Description"  />
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

