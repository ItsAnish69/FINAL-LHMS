import React from "react";
import LoginSvg from "../assets/login.svg";
import backgroundPng from "../images/background.png";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import {useState} from 'react';
import axios from "axios";


const Login = () => {

  //sets the user data
  const [userData, setUserData] = useState({
    email:'',
    password:''
  })

const [selectedRoles, setSelectedRoles] = useState([]);

const handleRoleChange = (e) => {
  const options = Array.from(e.target.selectedOptions, option => option.value);
  setSelectedRoles(options);
};

  //gets the name and the value from the input 
    const handleChange = (e) =>{
      const {name, value}=e.target;
      setUserData({
        ...userData,
        [name]:value
      })
    }

    //post the user data in the backend
    const handleSubmit = async(e) =>{
      e.preventDefault()
     if(!userData.email || !userData.password){
      return alert("Please, fill all the input fields")
     }
     try{
      const response = await axios.post('http://localhost:5000/api/auth/login', userData);
      
      localStorage.setItem("userId", response.data.user.id);
      localStorage.setItem("userName", response.data.user.name);
      localStorage.setItem("userEmail", response.data.user.email);
    
      const token = response.token;
      localStorage.setItem("token", token);
      
      const userRole = response.data.user.role; // assuming backend returns 'role'
      if(selectedRoles.includes(userRole)) {
        if(userRole === 'borrower') {
          // Roles match, proceed to dashboard
          window.location.href = '/home';
        } else if(userRole === 'librarian') {
          window.location.href = '/admin-dashboard';
        }
        //add the success alert
      alert("Login Successful");
      } else {
        alert("Selected Role doesn't match your account.");
      }
     } catch(err){
      alert('Login Failed. Please try again');
     }
    }


    return ( 
        <>
        <div className="h-screen w-full flex">
        {/* 1st section */}
        <div className="w-[45%] hidden sm:flex justify-center p-20 flex flex-col items-center sm:px-20 py-15"
         style={{ backgroundImage: `url(${backgroundPng})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <img src={LoginSvg} className="h-70" />
          <div className="h-50 w-full text-center text-white" >
          <h1 className="text-3xl font-bold mt-5">Hello, User!</h1>
          <p className="text-xl mt-5">Welcome back! Log in to continue exploring, manage your account, and pick up right where you left off with your favorite books.</p>
          </div>
        </div>

        <div className="w-full sm:w-[55%] flex justify-center items-center px-8 sm:px-20 py-24">
          {/* log in contain garne div */}
          <div className="h-full w-full flex flex-col justify-center items-center gap-12 mb-10">
            {/* heading wala section */}
            <div className="text-center">
              <h1 className="font-bold text-5xl">Log In</h1>
              <p className="mt-3 text-lg">
                If you have not logged in yet, Now is the time!
              </p>
            </div>

            {/* login form */}
            <form
              action="submit"
              onSubmit={handleSubmit}
              className="w-full sm:w-96 gap-5 flex flex-col"
            >
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
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  required
                  className="bg-[#EAE9E9] rounded-2xl w-full placeholder:font-semibold placeholder:text-gray-500 p-4 pl-12"
                />
              </div>


              <div className="relative flex items-center w-full gap-2">
                <RiLockPasswordFill className="absolute left-4 text-xl text-gray-500" />
                <select
                  name="roles"
                  onChange={handleRoleChange}
                  required
                  className="bg-[#EAE9E9] rounded-2xl w-full placeholder:font-semibold placeholder:text-gray-500 p-4 pl-12"
                >
                  <option value="" disabled selected>Select your role</option>
                  <option value="borrower">User</option>
                  <option value="librarian">Admin</option>
                </select>
              </div>

              <div><a className="link link-hover"
          onClick={() => window.location.href = '/forgot-password'}>Forgot password?</a></div>
              <button className="font-bold p-4 rounded-2xl text-white cursor-pointer bg-[#F25D5D] hover:bg-[#000] transition-all duration-200"
              onClick={handleSubmit}>
                Log In
              </button>
            </form>
            </div>
          </div>
        </div>

</>
    )}

export default Login;