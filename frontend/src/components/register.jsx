import React from "react";
import ProfileSvg from "../assets/profile.svg";
import backgroundPng from "../images/background.png";
import { MdEmail} from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import {useState} from 'react';
import axios from "axios";


const Register = () => {

     //sets the user data 
  const [userData, setUserData] = useState({
    name:'',
    email:'',
    password:'',
    role:'borrower'
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
      const response = await axios.post('https://lhms-website.onrender.com/api/auth/register', userData);
      alert("User Registration Successful")
    } catch(err){
      alert("Registration Failed")
    }
  }

    return ( 
        <>

      <div className="h-screen w-full flex flex-row-reverse">
        {/* 1st section */}
        <div className="w-[45%] hidden sm:flex justify-center p-20 flex flex-col items-center sm:px-20 py-15"
         style={{ backgroundImage: `url(${backgroundPng})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <img src={ProfileSvg} className="h-70" />
          <div className="h-50 w-full text-center text-white" >
          <h1 className="text-3xl font-bold mt-5">Register Now!</h1>
          <p className="text-xl mt-5"> If you don't have an account, It's time to Register! Registering will allow you to access exclusive features and content.</p>
          </div>
        </div>

        <div className="w-full sm:w-[55%] flex justify-center items-center px-8 sm:px-20 py-24">
          {/* log in contain garne div */}
          <div className="h-full w-full flex flex-col justify-center items-center gap-12 mb-10">
            {/* heading wala section */}
            <div className="text-center">
              <h1 className="font-bold text-5xl">Sign Up</h1>
              <p className="mt-3 text-lg">
                Create an account to get started!
              </p>
            </div>

            {/* login form */}
            <form
              action="submit"
              onSubmit={handleSubmit}
              className="w-full sm:w-96 gap-5 flex flex-col"
            >
              
              <div className="relative flex items-center w-full gap-2 ">
                <FaUser className="absolute left-4 text-xl text-gray-500" />
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={handleChange}
                  required
                  className="bg-[#EAE9E9] placeholder:font-semibold placeholder:text-gray-500 rounded-2xl w-full p-4 pl-12"
                />
              </div>
              
              <div className="relative flex items-center w-full gap-2 ">
                <MdEmail className="absolute left-4 text-xl text-gray-500" />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  required
                  className="bg-[#EAE9E9] placeholder:font-semibold placeholder:text-gray-500 rounded-2xl w-full p-4 pl-12"
                />
              </div>

              <div className="relative flex items-center w-full gap-2">
                <RiLockPasswordFill className="absolute left-4 text-xl text-gray-500" />
                <input
                  type="text"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  required
                  className="bg-[#EAE9E9] rounded-2xl w-full placeholder:font-semibold placeholder:text-gray-500 p-4 pl-12"
                />
              </div>

              <button className="font-bold p-4 rounded-2xl text-white cursor-pointer bg-[#F25D5D] hover:bg-[#000] transition-all duration-200"
              onClick={handleSubmit}>
                Register Now
              </button>
              <div className="flex justify-center gap-x-3">
                <p>Already have an account?</p>
                <button className="font-bold hover:underline hover:text-[#F25D5D] cursor-pointer" onClick={() => window.location.href = '/login'}>Log In</button>
              </div>
            </form>
            </div>
          </div>
        </div>

</>
    )}

export default Register;