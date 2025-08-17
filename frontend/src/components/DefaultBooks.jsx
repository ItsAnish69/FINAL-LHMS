import React from 'react'
import Image1 from '../images/img1.jpg'
import { href } from 'react-router-dom';

 const DefaultBooks = () => {

  //call all the button
  const handleButtonClick = () => {
    window.location.href = '/book-info';
  };

  return (
    <>
    <div className='flex justify-around'>
    <div className="card bg-base-100 w-75 shadow-lg rounded-xl">
  <figure className="px-10 pt-10">
    <img
     style={{ backgroundImage: `url(${Image1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      className="rounded-xl h-60 w-40" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title text-2xl">The Originals</h2>
    <p>By Nell Steves</p>
    <div className="card-actions">
      <button className="btn mt-3 rounded-xl hover:bg-gradient-to-r from-pink-500 to-orange-500 hover:text-white"
      onClick={handleButtonClick}>Get Now</button>
    </div>
  </div>
</div>

<div className="card bg-base-100 w-75 shadow-lg rounded-xl">
  <figure className="px-10 pt-10">
    <img
     style={{ backgroundImage: `url(${Image1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      className="rounded-xl h-60 w-40" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title text-2xl">The Originals</h2>
    <p>By Nell Steves</p>
    <div className="card-actions">
      <button className="btn mt-3 rounded-xl hover:bg-gradient-to-r from-pink-500 to-orange-500 hover:text-white"
      onClick={handleButtonClick}>Get Now</button>
    </div>
  </div>
</div>

<div className="card bg-base-100 w-75 shadow-lg rounded-xl">
  <figure className="px-10 pt-10">
    <img
     style={{ backgroundImage: `url(${Image1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      className="rounded-xl h-60 w-40" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title text-2xl">The Originals</h2>
    <p>By Nell Steves</p>
    <div className="card-actions">
      <button className="btn mt-3 rounded-xl hover:bg-gradient-to-r from-pink-500 to-orange-500 hover:text-white"
      onClick={handleButtonClick}>Get Now</button>
    </div>
  </div>
</div>

<div className="card bg-base-100 w-75 shadow-lg rounded-xl">
  <figure className="px-10 pt-10">
    <img
     style={{ backgroundImage: `url(${Image1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      className="rounded-xl h-60 w-40" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title text-2xl">The Originals</h2>
    <p>By Nell Steves</p>
    <div className="card-actions">
      <button className="btn mt-3 rounded-xl hover:bg-gradient-to-r from-pink-500 to-orange-500 hover:text-white"
      onClick={handleButtonClick}>Get Now</button>
    </div>
  </div>
</div>
</div>
    </>
  )
}

export default DefaultBooks;
