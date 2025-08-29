import React from 'react'
import BookCover from '../images/bookCover2.png'
import backgroundImage from '../images/background.png'
import Image1 from '../images/img1.jpg'
import Image2 from '../images/img2.jpg'
import Image3 from '../images/img3.jpg'
import DefaultBooks from './DefaultBooks'
import { useRef } from 'react'

const Banner = () => {
  const contentRef = useRef(null);

  const handleScroll = () => {
    contentRef.current?.scrollIntoView({behavior: "smooth"})
  }
  return (
    <>
    {/* sec 1 */}
    <div className="hero min-h-120 mt-15" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
  <div className="hero-content flex-col lg:flex-row-reverse w-full justify-between">
    <div className='flex gap-2 items-center'>
    <img
      src={Image3}
      className="max-w-sm h-55 z-10 relative left-3 top-3 rotate-[-15deg] shadow-2xl"
    />
     <img
      src={Image1}
      className="max-w-sm h-60 z-20 relative bottom-8 shadow-2xl"
    />
    <img
      src={Image2}
      className="max-w-sm h-55 z-10 rotate-[15deg] relative right-3 top-3 shadow-2xl"
    />
    </div>
    <div className='max-w-2xl'>
      <h1 className="text-5xl font-bold text-white  font-Lexend font-playwrite font-semibold">Trying to Look for that perfect Book?</h1>
      <p className="py-6 text-white">
        "Discover your next favorite read from our handpicked collection. Whether you're into thrilling mysteries,
        heartwarming romances, or inspiring non-fiction, we've got the perfect book waiting for you."
      </p>
      <button className="btn rounded-xl hover:bg-[#F25D5D] hover:text-white bg-[#ffffff] text-black"
      onClick={handleScroll}
      >Browse Collection</button>
    </div>
  </div>
</div>

{/* sec 2 */}
<div className="hero min-h-80"
ref={contentRef}>
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-4xl font-bold">Featured Books</h1>
      <p className="py-6">
        "Explore our top picks—bestsellers and must-reads specially curated just for you."
      </p>
    </div>
  </div>
</div>

<div className='flex flex-col gap-y-20'>
<DefaultBooks/>
</div>

<div className='w-full flex mt-25 justify-center'>
  <button className="btn rounded-xl bg-[#F25D5D] hover:text-white"
  onClick={() => {window.location.href='/books'}}>View More</button>
</div>

{/* feature section */}
<div className="mt-20 flex flex-col justify-center items-center px-4">
  <h2 className="text-3xl font-bold text-center">Why Join Us?</h2>
  <p className="text-md mt-5 max-w-2xl text-center">
    Join our community of book lovers and gain access to a world of knowledge
    and imagination. To get started, simply sign up and explore our vast
    collection of books.
  </p>
</div>

{/* Cards Section */}
<div className="w-full flex flex-col md:flex-row justify-around mt-15 items-center md:items-stretch gap-6 mt-10 px-4">
  {/* card one */}
  <div className="card bg-red-400 rounded-xl text-white w-full md:w-80 shadow-lg hover:scale-105 hover:translate-y-[-10px] transition-all duration-300">
    <div className="card-body">
      <h2 className="card-title font-bold text-xl">Always Available</h2>
      <p>
        Our library hub offers access to books from vast genres and makes it
        easier to help you find the right book faster.
      </p>
    </div>
  </div>

  {/* card two */}
  <div className="card bg-red-400 rounded-xl text-white w-full md:w-80 shadow-lg hover:scale-105 hover:translate-y-[-10px] transition-all duration-300">
    <div className="card-body">
      <h2 className="card-title font-bold text-xl">Time Management</h2>
      <p>
        Keep track of due dates, borrowing dates, and availability status,
        ensuring you never miss a deadline.
      </p>
    </div>
  </div>

  {/* card three */}
  <div className="card bg-red-400 rounded-xl text-white w-full md:w-80 shadow-lg hover:scale-105 hover:translate-y-[-10px] transition-all duration-300">
    <div className="card-body">
      <h2 className="card-title font-bold text-xl">Quick Search</h2>
      <p>
        With our digital search system, you can quickly find books by your
        favorite author, genre, or category without difficulty.
      </p>
    </div>
  </div>
</div>

{/* content section */}
<div
  className="hero min-h-100 mt-30"
  style={{
    // import the bookcover image form the images
    backgroundImage: `url(${BookCover})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',

  }}
>
  <div className="flex justify-end px-30 w-full text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-4xl font-bold">Ready to Transform your Library?</h1>
      <p className="mb-5">
       Get started from today and be prepare to experience the future of library management.
      </p>
    </div>
  </div>
</div>

</>
  )}

  export default Banner;



