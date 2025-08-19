import React from 'react'
import Navbar from './navbar2';
import Img from '../images/contactimage.png'
import Img2 from '../images/contact2.png'
import Footer from './footer';
import { useState, setUserData } from 'react';

 const contact = () => {

  //sets the user data
  const [userData, setUserData] = useState({
    username:'',
    email:'',
    message:''
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
     if(!userData.username || !userData.email || !userData.message){
      return alert("Please, Fill all the input fields!")
     }
     try{
      const reponse = await axios.post('http://localhost:5000/api/auth/contact', userData);
      alert("Thank you for messaging! We'll contact you soon.")
     } catch(err){
      alert("Message can be send through the registered account only!");
     }
    }


  return (
    <>
    <Navbar/>
        <div className='w-full h-150 bg-[#ffd6a8]'>
        <div className="hero bg-base-200 text-[#1f4444]">
    <div className="hero-content text-center mt-10 ">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Get In Touch With Us</h1>
      <p className="py-6">
        Have questions, feedback, or need support? We are here to help. 
        Fill out the form below or reach us through our email and phone number. Our team will get back to you as quickly as possible.
      </p>
      <button className="btn btn-primary bg-[#1f4444] text-white border-none hover:text-[#1f4444] hover:bg-white">Get Started</button>
    </div>
  </div>
</div>
<div className='flex h-60 flex w-full justify-center mt-5'>
<img src={Img}/>
</div>
</div>

    <div className='flex w-full h-150'>
        <div className='flex flex-col ml-20 mt-30 justify-center items-center '>
        <h1 className='text-3xl font-bold'>Drop us a line</h1>
        {/* form */}
         <div className="card w-full  bg-white mt-10 w-md h-100 shrink-0 shadow-2xl mb-10">
      <div className="card-body">
        <fieldset className="fieldset text-black">
          <label className="label">Username</label>
          <input 
          type="text" 
          className="input border border-gray-500 rounded-md w-full" 
          placeholder="username"
          name="username"
          onChange={handleChange}
          />
          <label className="label">Email</label>
          <input 
          type="email" 
          className="input border border-gray-500 rounded-md w-full" 
          placeholder="email" 
          name="email"
          onChange={handleChange}
          />

            <label className="label">Message</label>
        <textarea
          className="w-full border p-2 rounded-md"
          rows="5"
          placeholder="Add a comment..."
          name='message'
          onChange={handleChange}
        ></textarea>
    
          <button className="btn mt-4 bg-[#1f4444] text-white hover:bg-white hover:text-[#1f4444]"
          onClick={handleSubmit}>Submit</button>
        </fieldset>
      </div>
    </div>
    </div>

    <div className='w-full h-130 flex justify-center items-center mt-25'>
        <img src={Img2} className='h-90 ml-25 rounded-xl'/>
    </div>
    </div>
        <Footer/>
    </>
)
}

export default contact;
