import React from "react";
import Fp from '../assets/forgot_password.svg'
import { useState } from 'react'
import axios from 'axios'

const ForgotPassword = () => {

    const[userData, setUserData]=useState({
      email:''
    })
    const handleChange=(e)=>{
      const{name, value}=e.target;
      setUserData({
        ...userData,
        [name]:value
      })
    }
  
    const handleSubmit=async(e)=>{
      e.preventDefault()

      if(!userData.email){
        return alert('please, fill the email')
      }

      try{
      const response= await axios.post('http://localhost:5000/api/auth/forgot-password', userData);
      alert("Opt sent successfully")
      window.location.href = '/verify-otp'

      } catch(err){
        alert('Email not found! Failed to send otp')
      }
    }

    return ( 
        <>
<div className="hero min-h-screen bg-gradient-to-r from-pink-500 to-orange-500 text-black">
    <div className="p-5 rounded-xl">
  <div className="hero-content flex-col lg:flex-col">
    <div className="text-center lg:text-left">
    <img src={Fp} alt="Login" className="h-50 ml-40" />
      <h1 className="text-4xl text-center font-bold mt-10">Enter your email to receive OTP!</h1>
      <p className="py-6 text-center w-150 px-10 h-40">
         Please enter the email address associated with your account. We will send you a One-Time Password (OTP) to verify your identity.
      </p>
    </div>
    <div className="card w-full bg-white max-w-sm h-50 relative bottom-10 shrink-0 shadow-2xl">
      <div className="card-body border">
        <fieldset className="fieldset text-black">
          <label className="label text-black">Email</label>
          <input type="email" 
          className="input bg-[#d9d9d9] w-full" 
          placeholder="Email"
          name="email"
          onChange={handleChange}/>
            <button className="btn mt-4 bg-white hover:bg-[#F25D5D] hover:text-white" onClick={handleSubmit}>send</button>
        </fieldset>
      </div>
    </div>
  </div>
  </div>
</div>

</>
    )}

export default ForgotPassword;