import React from "react";
import ProfileSvg from "../assets/profile.svg";
import {useState} from 'react';
import axios from "axios";


const Register = () => {

     //sets the user data 
  const [userData, setUserData] = useState({
    name:'',
    email:'',
    password:''
  })

  //gets the name and the value from the input 
    const handleChange = (e) =>{
      const {name, value}=e.target;
      setUserData({
        ...userData,
        [name]:value
      })
    }

    console.log(userData)

    //post the user data in the backend
    const handleSubmit = async(e) =>{
      e.preventDefault()
      if(!userData.name || !userData.email || !userData.password){
        return alert("Please, fill all the input fields")
      }
      try{
      const response = await axios.post('http://localhost:5000/api/auth/register', userData);
      const token = response.token;
      localStorage.setItem("token", token)
      alert("Registration Successfull")
    } catch(err){
      alert("Registration Failed")
    }
  }

    return ( 
        <>
<div className="hero min-h-screen bg-gradient-to-r from-pink-500 to-orange-500 text-black">
    <div className=" p-5 rounded-xl">
  <div className="hero-content flex-col lg:flex-row-reverse gap-30 ">
    <div className="text-center lg:text-left">
    <img src={ProfileSvg} alt="Profile" className="h-70 ml-40" />
      <h1 className="text-5xl text-center font-bold mt-10">Register now!</h1>
      <p className="py-6 text-center w-150 px-10 h-40">
         If you don't have an account, It's time to Register! Registering will allow you to access exclusive features and content.
      </p>
    </div>
    <div className="card w-full border bg-white max-w-sm h-90 shrink-0 shadow-2xl mb-10">
      <div className="card-body">
        <fieldset className="fieldset text-black">
            <label className="label text-black">Name</label>
          <input 
          type="text" 
          className="input bg-[#d9d9d9] w-full" 
          placeholder="Name" 
          name="name"
          onChange={handleChange}/>
          <label className="label text-black">Email</label>
          <input 
          type="email" 
          className="input bg-[#d9d9d9] w-full" 
          placeholder="Email"
          name="email"
          onChange={handleChange}/>
          <label className="label text-black">Password</label>
          <input 
          type="password" 
          className="input bg-[#d9d9d9] w-full" 
          placeholder="Password"
          name="password"
          onChange={handleChange}/>

          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn mt-4 bg-white hover:bg-[#F25D5D] hover:text-white"
          onClick={handleSubmit}>Login</button>
        </fieldset>
      </div>
    </div>
  </div>
  </div>
</div>

</>
    )}

export default Register;