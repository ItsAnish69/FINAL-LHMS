import React from 'react';
import Navbar from './navbar2';
import BookCover from '../images/bookshelf.png';
import Image1 from '../images/img1.jpg';
import Image2 from '../images/img2.jpg';
import Image3 from '../images/img3.jpg';
import Footer from './footer';
import DefaultBooks from './DefaultBooks';


const Books = () => {
  return (
    <>
      <Navbar/>
    {/* book section */}
    <div
      className="hero min-h-120"
      style={{
        // import the bookcover image form the images
        backgroundImage: `url(${BookCover})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex justify-start px-30 w-full text-left">
        <div className="max-w-md">
          <h1 className="mb-5 text-4xl font-bold">Ready to Transform your Library?</h1>
          <p className="mb-5">
           Get started from today and be prepare to experience the future of library management.
          </p>
          <button className="btn rounded-xl bg-white mb-35">Get Started</button>
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
        <h1 className='text-2xl ml-30 underline font-bold'>Fantasy Collection</h1>
     <DefaultBooks/>
     </div>

     <div className='mt-25'>
      <h1 className='text-2xl ml-30 underline font-bold'>Mystery Collection</h1>
     <DefaultBooks/>
     </div>

     <div className='mt-25 flex flex-col gap-20'>
     <h1 className='text-2xl ml-30 underline font-bold'>Historic & Fiction Collection</h1>
     <DefaultBooks/>

     <DefaultBooks/>
      </div>

     <Footer/>
    </>
  )
}
export default Books;
