import React from 'react'
import BookCover from '../images/bookCover2.png'
import Image1 from '../images/img1.jpg'
import Image2 from '../images/img2.jpg'
import Image3 from '../images/img3.jpg'
import DefaultBooks from './DefaultBooks'

const Banner = () => {
  return (
    <>
    {/* sec 1 */}
    <div className="hero min-h-120 bg-gradient-to-r from-pink-500 to-orange-500">
  <div className="hero-content flex-col lg:flex-row-reverse w-full justify-between">
    <div className='flex gap-2'>
    <img
      src={Image1}
      className="max-w-sm rounded-lg h-65 shadow-2xl"
    />
     <img
      src={Image2}
      className="max-w-sm rounded-lg h-65 shadow-2xl"
    />
    </div>
    <div>
      <h1 className="text-5xl font-bold">Trying to Look for that perfect Book?</h1>
      <p className="py-6">
        "Discover your next favorite read from our handpicked collection. Whether you're into thrilling mysteries,
        heartwarming romances, or inspiring non-fiction, we've got the perfect book waiting for you."
      </p>
      <button className="btn rounded-xl bg-[#ffffff]">Get Started</button>
    </div>
  </div>
</div>

{/* sec 2 */}
<div className="hero min-h-80">
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
<DefaultBooks/>
</div>

<div className='w-full flex mt-25 justify-center'>
  <button className="btn rounded-xl bg-gradient-to-r from-pink-500 to-orange-500">View More</button>
</div>

{/* content */}
<div
  className="hero min-h-100 mt-30"
  style={{
    // import the bookcover image form the images
    backgroundImage: `url(${BookCover})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <div className="flex justify-end px-30 w-full text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-4xl font-bold">Ready to Transform your Library?</h1>
      <p className="mb-5">
       Get started from today and be prepare to experience the future of library management.
      </p>
      <button className="btn rounded-xl ">Get Started</button>
    </div>
  </div>
</div>

</>
  )}

  export default Banner;



