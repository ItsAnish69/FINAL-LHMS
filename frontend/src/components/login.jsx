import React from "react";
import LoginSvg from "../assets/login.svg";
import {useState} from 'react';
import axios from "axios";


const Login = () => {

  //sets the user data
  const [userData, setUserData] = useState({
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
     if(!userData.email || !userData.password){
      return alert("Please, fill all the input fields")
     }
     try{
      const reponse = await axios.post('http://localhost:5000/api/auth/login', userData);
      const token = reponse.token;
      localStorage.getItem("token", token)
      //add the success alert 
      alert("Login Successfull")
      window.location.href = '/home'
     } catch(err){
      alert('Login Failed. Please try again');
     }
    }


    return ( 
        <>
<div className="hero min-h-screen bg-gradient-to-r from-pink-500 to-orange-500 text-black">
    <div className=" p-5 rounded-xl">
  <div className="hero-content flex-col lg:flex-row gap-30 ">
    <div className="text-center lg:text-left">
    <img src={LoginSvg} alt="Login" className="h-70 ml-20" />
      <h1 className="text-5xl text-center font-bold mt-10">Login now!</h1>
      <p className="py-6 text-center w-150 px-10 h-40">
        Welcome back! Log in to continue exploring, manage your account, and pick up right where you left off with your favorite books.
      </p>
    </div>
    <div className="card w-full border bg-white max-w-sm h-80 shrink-0 shadow-2xl mb-10">
      <div className="card-body">
        <fieldset className="fieldset text-black">
          <label className="label text-black">Email</label>
          <input 
          type="email" 
          className="input bg-[#d9d9d9] w-full" 
          placeholder="Email"
          name="email"
          onChange={handleChange}
          />
          <label className="label text-black">Password</label>
          <input 
          type="password" 
          className="input bg-[#d9d9d9] w-full" 
          placeholder="Password" 
          name="password"
          onChange={handleChange}
          />
    
          <div><a className="link link-hover"
          onClick={() => window.location.href = '/forgot-password'}>Forgot password?</a></div>
          <button className="btn mt-4 bg-white hover:bg-[#F25D5D] hover:text-white" onClick={handleSubmit}>Login</button>
        </fieldset>
      </div>
    </div>
  </div>
  </div>
</div>

</>
    )}

export default Login;