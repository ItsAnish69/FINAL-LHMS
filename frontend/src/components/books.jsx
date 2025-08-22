import React from 'react';
import Navbar from './navbar2';
import BookCover from '../images/bookshelf.png';
import Image4 from '../images/img4.png';
import Footer from './footer';
import DefaultBooks from './DefaultBooks';


const Books = () => {
  return (
    <>
      <Navbar/>
    {/* book section */} 
    <div
      className="hero min-h-120 mt-15"
      style={{
        // import the bookcover image form the images
        backgroundImage: `url(${BookCover})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex justify-start px-30 w-full text-left">
        <div className="max-w-md">
          <h1 className="mb-5 text-4xl font-bold">Read More, Learn More!</h1>
          <p className="mb-5">
          Unlock new knowledge with every page you turn. Whether it's fiction, history, 
          or self-help, reading expands your mind, sharpens your thinking, and fuels lifelong 
          learning.
          </p>
          <button className="btn rounded-xl bg-white mb-35">Learn more</button>
        </div>
      </div>
    </div>

     <div className="hero min-h-80">
       <div className="hero-content text-center">
         <div className="max-w-md">
           <h1 className="text-4xl font-bold">Book Collection</h1>
           <p className="py-6">
            "Discover our diverse collection of books, from timeless classics to contemporary bestsellers, all curated to enrich your reading journey."
           </p>
         </div>
       </div>
     </div>

     <div className='mt-5'>
        <h1 className='text-2xl ml-20 underline font-bold mb-10'>Fantasy Collection</h1>
     <DefaultBooks/>
     </div>

     {/* <div className='mt-25'>
      <h1 className='text-2xl ml-20 underline font-bold mb-10'>Mystery Collection</h1>
     <DefaultBooks/>
     </div>

     <div className='mt-25 flex flex-col'>
     <h1 className='text-2xl ml-20 underline font-bold mb-10'>Historic & Fiction Collection</h1>
     <DefaultBooks/>
      <div className='my-10'></div>
     <DefaultBooks/>
      </div> */}

    <div
      className="hero min-h-100 mt-30"
      style={{
        // import the bookcover image form the images
        backgroundImage: `url(${Image4})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex justify-start px-30 w-full text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-4xl font-bold">Discover the Future of Reading</h1>
          <p className="mb-5">
           Embrace the digital age with our innovative reading solutions. From e-books to audiobooks, we offer a seamless reading experience that fits your lifestyle.
          </p>
          <button className="btn hover:bg-white rounded-xl"
          onClick={() => {window.location.href = "/about"}}>Learn More</button>
        </div>
      </div>
    </div>

      <Footer/>
    </>
  )
}
export default Books;
