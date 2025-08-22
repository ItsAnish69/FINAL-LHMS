import React from 'react'
import Image1 from '../images/img1.jpg'
import  {useEffect , useState} from 'react';
import { useNavigate } from 'react-router-dom'; 

const DefaultBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(()=> {
    fetch('http://localhost:5000/api/book')
    .then(res => res.json())
    .then(data => setBooks(data));
  },[]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
      {books.map(book => (
        <div key={book._id} className="card bg-base-100 shadow-lg rounded-xl w-55 mx-auto">
          <figure className="px-3 pt-3">
            <img
              src={book.cover || 'https://picsum.photos/200/300'}
              alt={book.title}
              className="rounded-xl w-full h-72 object-cover"
            />
          </figure>
          <div className="card-body items-center text-center p-4">
            <h2 className="card-title text-lg md:text-xl">{book.title}</h2>
            <p className="text-sm">By {book.author}</p>
            <div className="card-actions">
              <button 
                className="btn mt-3 rounded-xl hover:bg-gradient-to-r from-pink-500 to-orange-500 hover:text-white text-sm"
                onClick={() => navigate(`/book-info/${book._id}`)}>
                Get Now
              </button>
            </div>
          </div>
        </div>
      ))}
        </div>
    </>
  )
}

export default DefaultBooks;
