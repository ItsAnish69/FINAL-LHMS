
const NotFound = () => {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center font-bold gap-5'>
      <h1 className='text-4xl'>
        The page you're looking for doesn't exist!
      </h1>
      {/* make the button go back to the Login page */}
      <div className="flex gap-5 ">
      <button 
        className='bg-[#F25D5D] text-white px-5 py-3 rounded-2xl hover:bg-[#000] transition-all duration-200'
        onClick={() => window.location.href = '/login'}>
        Go back to Login page
      </button>

      <button 
        className='bg-[#F25D5D] text-white px-5 py-3 rounded-2xl hover:bg-[#000] transition-all duration-200'
        onClick={() => window.location.href = '/register'}>
        Go back to register page
      </button>

       <button 
        className='bg-[#F25D5D] text-white px-5 py-3 rounded-2xl hover:bg-[#000] transition-all duration-200'
        onClick={() => window.location.href = '/'}>
        Go back to Preview page
      </button>
      </div>
      </div>
  )
}

export default NotFound
