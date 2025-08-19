import React from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className='h-full w-full flex'>
        <div className='flex h-[100vh] w-[25vw] border bg-[#14de61] flex flex-col justify-start items-center gap-y-5'>
          <h1 className='text-lg mt-10 sm:text-3xl'>BookHub</h1>
          {/* <img src={ProfileImg} alt="Admin Image" 
          className='h-30 w-30'/> */}
          <div className='text-md text-center '>
          <h2 className='font-bold text-2xl'>Anish Karki</h2>
          <h2 className='font-thin'>Current Admin</h2>
        </div>

        <div className='flex flex-col gap-y-5 mt-10'>
          <button className='font-bold text-xl' onClick={() => navigate('employee')}>Employee</button>
          <button className='font-bold text-xl'>User</button>
          <button className='font-bold text-xl'>Book</button>
        </div>
        </div>
        <div className='w-full h-full'>
        {/* header */}
          <div className='w-full h-[10vh] border bg-red-500 flex justify-between items-center px-5'>
            <h1>Dashboard</h1>
            <div className='flex gap-x-5 justify-center items-center'>
            <p>Welcome, Admin</p>
            {/* <img src={ProfileImg} alt="Admin profile" className='h-10 w-10' /> */}
            </div>
          </div>
          {/* main component */}
          <div className='w-full h-[90vh] border bg-blue-500'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
export default AdminDashboard