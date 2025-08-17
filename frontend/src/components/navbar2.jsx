import React from 'react'
import { href } from 'react-router-dom';

const Navbar = () => {
    const navItems = (
        <>
        <li><a href='/home'>Home</a></li>
        <li><a href='/books'>Book</a></li>
        <li><a href='/about'>About Us</a></li>
        <li><a href='/contact'>Contact</a></li>
        </>
    )
  return (
    <>
    <div className='max-w-screen-2xl container mx-auto md:px-20 px-4'>
    <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
         </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {navItems}
      </ul>
    </div>
    <a className="text-2xl font-bold">BookHub</a>
  </div>
  <div className="navbar-end space-x-8">
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-md">
      {navItems}
    </ul>
  </div>

<div className='flex justify-center items-center relative left-15'>
  <div className="navbar-start w-12 flex justify-center">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn-ghost p-2 rounded-lg hover:border ">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
         </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content p-2 bg-white outline rounded-box z-1 mt-3 w-45 right-1 px-3 py-2">
        <li><a href='/cart' className='hover:bg-[#F25D5D] hover:text-white px-5 py-3'>Cart</a></li>
        <li><a href='/forgot-password' className='hover:bg-[#F25D5D] hover:text-white px-5 py-3'>Change Password</a></li>
        <li>
          <a
            href="/"
            className="hover:bg-[#F25D5D] hover:text-white px-5 py-3"
            onClick={e => {
              e.preventDefault(); // Prevent default anchor behavior
              if (window.confirm("Are you sure you want to proceed?")) {
                //redirect to default page
                window.location.href = '/'; // 
              } else {
                // User canceled, do nothing or redirect to home
                window.location.href = '/home';
              }
            }}
          >
            Logout
          </a>
        </li>
      </ul>
    </div>
    </div>
  </div>
</div>
</div>
</div>
    </>
  )
}

export default Navbar
