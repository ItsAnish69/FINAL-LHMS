import React from "react";
import { useState } from 'react'
import otp from '../assets/otp.svg';
import axios from 'axios'

const ForgotPassword = () => {

    const[userData, setUserData]=useState({
      otp:''
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

      if(!userData.otp){
        return alert("Please, fill the OTP field!")
      }
      try{
      const response = await axios.post('https://lhms-website.onrender.com/api/auth/verify-otp', userData);
      localStorage.setItem('otp', userData.otp);
      alert("OTP verification Successfull")
      window.location.href = '/change-password'

      } catch(err){
        console.log(err);
      }
    }

    return ( 
        <>
<div className="hero min-h-screen bg-gradient-to-r from-pink-500 to-orange-500 text-black">
    <div className="p-5 rounded-xl">
  <div className="hero-content flex-col lg:flex-col">
    <div className="text-center lg:text-left">
    <img src={otp} alt="Login" className="h-50 ml-40" />
      <h1 className="text-4xl text-center font-bold mt-10">Enter your otp for verification!</h1>
      <p className="py-6 text-center w-150 px-10 h-40">
         Please enter the One-Time Password (OTP) sent to your email address. It is valid for only 15 minutes.
      </p>
    </div>
    <div className="card w-full bg-white max-w-sm realtive bottom-10 h-50 shrink-0 shadow-2xl">
      <div className="card-body border">
        <fieldset className="fieldset text-black">
          <label className="label text-black">OTP</label>
          <input type="text" 
          className="input bg-[#d9d9d9] w-full" 
          placeholder="Enter OTP"
          name="otp"
          onChange={handleChange}
          />
            <button className="btn mt-4 bg-white hover:bg-[#F25D5D] hover:text-white" onClick={handleSubmit}>Verify</button>
        </fieldset>
      </div>
    </div>
  </div>
  </div>
</div>

</>
    )}

export default ForgotPassword;