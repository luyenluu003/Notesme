import { Link, useNavigate } from "react-router-dom"
import NavBar from "../components/navbar"
import PasswordInput from "../components/passwordinput"
import { useState } from "react"
import { validateEmail } from "../utils/helper"

import axiosInstance from "../utils/axiosInstance"

const Login = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")
    const [error,setError] = useState(null)

    const navigate= useNavigate()

    const handleLogin = async (e) =>{
        e.preventDefault();

        if(!validateEmail(email)){
            setError("Please anter a valid email address")
            return
        }
        if(!password){
            setError("Please enter the password")
            return
        }
        setError("")
        // Login api call

        try{
            const response = await axiosInstance.post("/login",{
                email:email,
                password:password
            })

            // Handle successful login response
            if(response.data && response.data.accessToken){
                localStorage.setItem("token",response.data.accessToken)
                navigate("/")
            }
        }catch(error){
            // Handle Login error
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message)
            }else{
                setError("An undexpected error occurred. Please try again.")
            }
        }
    }
    


    return (
        <>
      

            <div className="flex items-center justify-center h-screen bg-image">
                <div className="w-96 border rounded bg-white/30 px-7 py-10 mb-10 ">
                    <form onSubmit={handleLogin}>
                        <h4 className="text-2xl mb-7">Login</h4>
                        <input type="text" placeholder="Email" className="input-box bg-white/30 text-black" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <PasswordInput  value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        <button type="submit" className="btn-primary">Login</button>
                        {error && <p className="text-red text-xs pb-1">{error}</p>}
                        <p className="text-sm text-center mt-4">Not registered yet ?{" "}
                        <Link to="/signup" className="font-medium text-primary  underline">Create an Account</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login