import React from 'react'
import Navbar from './navbar'
import BookCover from '../images/bookshelf.png';
import Book1 from '../images/digitalbook.png';
import Book2 from '../images/bookimages.png';
import Book3 from '../images/bookvertical.png';
import Footer from './footer';


const AboutUs = () => {
  return (
    <>
        <Navbar />
        <div
          className="hero min-h-85 mt-5 bg-gradient-to-r from-pink-500 to-orange-500"
        >
          <div className="flex justify-center px-30 w-full text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-4xl font-bold">Who We Are?</h1>
              <p className="mb-5">
               BookHub is your go-to online bookstore built for book lovers, by book lovers.
                We offer a wide range of books across genres — from fiction and self-help to academic
                 and children's books — all in one beautifully designed platform.
              </p>
              <button className="btn bg-white rounded-xl ">Get Started</button>
            </div>
          </div>
        </div>


        <div className="hero w-full items-start mt-15 ">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img
      src={Book1}
      className="max-w-sm rounded-lg shadow-2xl h-65"
    />
    <div className="flex justify-center px-30 w-full text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-4xl font-bold">Our Mission</h1>
              <p className="mb-5">
               To make reading more accessible, enjoyable, and engaging for everyone.
            We aim to connect readers with stories and knowledge that inspire, educate, and entertain.
              </p>
            </div>
          </div>
</div>
</div>

       <div className="hero w-full items-start mt-25 ">
  <div className="hero-content flex-col lg:flex-row">
    <img
      src={Book2}
      className="max-w-sm rounded-lg shadow-2xl h-60"
    />
    <div className="flex justify-center px-30 w-full text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-4xl font-bold">What We Offer?</h1>
              <p className="mb-5">
               At BookHub, we offer a diverse selection of books across various genres, 
                ensuring that there’s something for everyone. Our user-friendly platform makes 
                it easy to discover new titles, authors, and genres, all tailored to your reading preferences.
              </p>
            </div>
          </div>
</div>
</div>


   <div className="hero w-full items-start mt-25">
  <div className="hero-content flex-col lg:flex-cols">
    <img
      src={Book3}
      className="w-full rounded-lg shadow-2xl h-60"
    />
    <div className="flex justify-center px-30 w-full text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-4xl font-bold mt-10">Join the Journey</h1>
              <p className="mb-5">
            Whether you’re a casual reader or a passionate bookworm, BookHub is here to fuel your reading journey. Let’s build a smarter, more connected world—one book at a time.
              </p>
                </div>
          </div>
</div>
</div>

<Footer/>
    </>
  )
}

export default AboutUs;
