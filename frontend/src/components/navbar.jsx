import React from "react";

const Navbar = () => {
  const navItems = (
    <>
      <li>
        <a href="/login">Home</a>
      </li>
      <li>
        <a href="/login">Books</a>
      </li>
      <li>
        <a href="/login">About Us</a>
      </li>
    </>
  );

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-[#fcfcfc] shadow-md">
      <div className="w-full px-4 md:px-10">
        <div className="navbar bg-base-100 w-full">
          {/* Left Section */}
          <div className="navbar-start">
          
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
              >
                {navItems}
              </ul>
            </div>

            {/* Logo */}
            <a className="text-2xl font-bold cursor-pointer">BookHub</a>
          </div>

          <div className="navbar-center hidden ml-140 lg:flex">
            <ul className="menu menu-horizontal px-1 text-md">{navItems}</ul>
          </div>

          {/* Right Buttons */}
          <div className="navbar-end flex gap-3">
            <button
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-[#F25D5D] duration-300"
              onClick={() => (window.location.href = "/login")}
            >
              Explore
            </button>
            <button
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-[#F25D5D] duration-300"
              onClick={() => (window.location.href = "/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
