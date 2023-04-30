import axios from "axios";
import { useState, useContext } from "react";
import "./page.css"
import ToastContext from "./context/ToastContext";
import Spinner from "../image/Spinner-0.5s-164px.svg"
const API = "https://instclone-bck-api.onrender.com"
const ChnageImagePrompt = ({ closePrompt }) => { // got the Id and Close Prompt func as prop
    // console.log(Id)
    const { toast } = useContext(ToastContext)
    const [loading, setLoading] = useState(false)
    const handleSubmit = (e) => {
        setLoading(true)
        // sending the request Backend to delete the image 
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', e.target.file.files[0])
        console.log(formData)
        // console.log(data.password)

        axios.put(`${API}/updateProfilePic`,
            formData, {
            headers: { "authorization": localStorage.getItem("token") }
        })
            .then((res) => {
                toast.success("Image Updated")
                closePrompt()
                setLoading(false)
            }).catch((e) => {
                // console.log(e.response)
                toast.error(e.response.data.message)
                setLoading(false)
            })
    }
    return (
        <>
            {loading ? (<img className='spinner' src={Spinner} alt="loding" />) : ""}
            <div className="innerBox">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <p>Select New Image</p>
                    <div className='file-desc' >
                        <input type={"file"} name='file' placeholder="No File Choosen" />
                    </div>
                    <button type="submit">Confirm</button>
                    <button onClick={closePrompt}>Cancel</button>
                </form>
            </div>

        </>
    )
}

export default ChnageImagePrompt