import React from 'react'
import BookCover from '../images/bookCover2.png'
import backgroundImage from '../images/background.png'
import Image1 from '../images/img1.jpg'
import Image2 from '../images/img2.jpg'
import Image3 from '../images/img3.jpg'
import DefaultBooks from './PreviewBook'
import PreviewBooks from './PreviewBook'

const Banner2 = () => {
  const scrollIntoView = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <>
    {/* sec 1 */}
    <div className="hero min-h-120 mt-10" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
  <div className="hero-content flex-col lg:flex-row-reverse w-full justify-between">
    <div className='flex gap-2 items-center hover:animate-[wiggle_1s_ease-in-out]'>
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
  <button className="btn rounded-xl hover:bg-[#F25D5D] hover:text-white bg-[#ffffff] text-black transition-all transform hover:scale-105"
  onClick={() => scrollIntoView("collection")}
  >Explore More</button>      
    </div>
  </div>
</div>

{/* sec 2 */}
<div className="hero min-h-80">
  <div className="hero-content text-center" id='collection'>
    <div className="max-w-md">
      <h1 className="text-4xl font-bold">Featured Books</h1>
      <p className="py-6">
        "Explore our top picks—bestsellers and must-reads specially curated just for you."
      </p>
    </div>
  </div>
</div>

<div className='flex flex-col gap-y-20'>
<PreviewBooks/>
</div>

<div className='w-full flex mt-25 justify-center'>
  <button className="btn rounded-xl bg-[#F25D5D] hover:text-white" 
  onClick={() => {window.location.href = '/books'}}>View More</button>
</div>

{/* content section */}
<div
  className="hero min-h-100 mt-30 transform transition-all duration-300"
  id="featured-books"
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
      <button className="btn rounded-xl bg-white">Get Started</button>
    </div>
  </div>
</div>

</>
  )}

  export default Banner2;



