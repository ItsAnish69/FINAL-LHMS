import React from 'react'
import Image1 from '../images/img1.jpg'

const DefaultBooks = () => {

  const handleButtonClick = () => {
    window.location.href = '/book-info';
  };

  return (
    <>
      {/* Grid with 4 responsive cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">

        {/* Card 1 */}
        <div className="card bg-base-100 shadow-lg rounded-xl w-55 mx-auto">
          <figure className="px-3 pt-3">
            <img
              src={Image1}
              alt="Book"
              className="rounded-xl w-full h-72 object-cover"
            />
          </figure>
          <div className="card-body items-center text-center p-4">
            <h2 className="card-title text-lg md:text-xl">The Originals</h2>
            <p className="text-sm">By Nell Steves</p>
            <div className="card-actions">
              <button 
                className="btn mt-3 rounded-xl hover:bg-gradient-to-r from-pink-500 to-orange-500 hover:text-white text-sm"
                onClick={handleButtonClick}
              >
                Get Now
              </button>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card bg-base-100 shadow-lg rounded-xl w-55 mx-auto">
          <figure className="px-3 pt-3">
            <img
              src={Image1}
              alt="Book"
              className="rounded-xl w-full h-72 object-cover"
            />
          </figure>
          <div className="card-body items-center text-center p-4">
            <h2 className="card-title text-lg md:text-xl">The Originals</h2>
            <p className="text-sm">By Nell Steves</p>
            <div className="card-actions">
              <button 
                className="btn mt-3 rounded-xl hover:bg-gradient-to-r from-pink-500 to-orange-500 hover:text-white text-sm"
                onClick={handleButtonClick}
              >
                Get Now
              </button>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card bg-base-100 shadow-lg rounded-xl w-55 mx-auto">
          <figure className="px-3 pt-3">
            <img
              src={Image1}
              alt="Book"
              className="rounded-xl w-full h-72 object-cover"
            />
          </figure>
          <div className="card-body items-center text-center p-4">
            <h2 className="card-title text-lg md:text-xl">The Originals</h2>
            <p className="text-sm">By Nell Steves</p>
            <div className="card-actions">
              <button 
                className="btn mt-3 rounded-xl hover:bg-gradient-to-r from-pink-500 to-orange-500 hover:text-white text-sm"
                onClick={handleButtonClick}
              >
                Get Now
              </button>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="card bg-base-100 shadow-lg rounded-xl w-55 mx-auto">
          <figure className="px-3 pt-3">
            <img
              src={Image1}
              alt="Book"
              className="rounded-xl w-full h-72 object-cover"
            />
          </figure>
          <div className="card-body items-center text-center p-4">
            <h2 className="card-title text-lg md:text-xl">The Originals</h2>
            <p className="text-sm">By Nell Steves</p>
            <div className="card-actions">
              <button 
                className="btn mt-3 rounded-xl hover:bg-gradient-to-r from-pink-500 to-orange-500 hover:text-white text-sm"
                onClick={handleButtonClick}
              >
                Get Now
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default DefaultBooks;
