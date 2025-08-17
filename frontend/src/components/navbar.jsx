import React from 'react'

const Navbar = () => {
    const navItems = (
        <>
        <li><a href='/login'>Home</a></li>
        <li><a href='/login'>Book</a></li>
        <li><a href='/login'>About Us</a></li>
        </>
    )
  return (
    <>
    <div className='max-w-screen-2xl mx-auto md:px-20 px-4'>
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

  <div className="ml-10 flex gap-2">
    <button className="bg-black text-white px-3 py-2 rounded-md hover:bg-[#F25D5D] duration-300 cursor-pointer"
    onClick={() => window.location.href = '/login'} >Explore</button>
    <button className="bg-black text-white px-3 py-2 rounded-md hover:bg-[#F25D5D] duration-300 cursor-pointer"
    onClick={() => window.location.href = '/Login'} >Login</button>
  </div>

</div>
</div>
</div>
    </>
  )
}

export default Navbar
