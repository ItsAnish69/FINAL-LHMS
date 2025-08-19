import React from "react";
import Cp from '../assets/change_password.svg';
import { useState } from 'react'
import axios from 'axios'

const ChangePassword = () => {

     const[userData, setUserData]=useState({
      newpass:'',
      confirmpass:'',
      otp:localStorage.getItem('otp')
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

      if(!userData.newpass || !userData.confirmpass){
        return alert('please, fill both the password fields')
      }

      if(userData.newpass !== userData.confirmpass){
        return alert("Passwords do not match!")
      }

      try{
      const response= await axios.put('http://localhost:5000/api/auth/change-password', userData);
      alert("Password changed Successfully")
      window.location.href = '/Login'

      } catch(err){
        console.log(err)
      }
    }

    return ( 
        <>
<div className="hero min-h-screen bg-gradient-to-r from-pink-500 to-orange-500 border">
    <div className="p-5 rounded-xl">
  <div className="hero-content flex-col lg:flex-row-reverse gap-40">
    <div className="text-center lg:text-left">
    <img src={Cp} alt="image" className="h-60 ml-40" />
      <h1 className="text-4xl text-center font-bold mt-10">Enter your otp for verification!</h1>
      <p className="py-6 text-center w-150 px-10 h-40">
         Please enter the One-Time Password (OTP) sent to your email address. It is valid for only 15 minutes.
      </p>
    </div>

    <div className="card w-full bg-white  max-w-sm mb-30 h-65 shrink-0 shadow-2xl">
      <div className="card-body border">
        <fieldset className="fieldset text-black">
          <label className="label text-black">New Password</label>
          <input type="password" 
          className="input bg-[#d9d9d9] w-full" 
          placeholder="Enter New Password"
          onChange={handleChange}
          name="newpass"
          />
          <label className="label text-black">Confirm Password</label>
          <input type="password" className="input bg-[#d9d9d9] w-full" placeholder="Enter Confirm Password"
          onChange={handleChange}
          name="confirmpass"
          />
            <button className="btn mt-4 bg-white hover:bg-[#F25D5D] hover:text-white"
            onClick={handleSubmit}
            >Change Password</button>
        </fieldset>
      </div>
    </div>
  </div>
  </div>
</div>

</>
    )}

export default ChangePassword;