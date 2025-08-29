import Footer from "./footer";
import Navbar from "./navbar2";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const [borrows, setBorrows] = useState([]);
  const [showBorrowModal, setShowBorrowModal] = useState(false);

  const userId = localStorage.getItem('userId');
  const borrowDate = Date.now();
  const returnDate = new Date(borrowDate + 7 * 24 * 60 * 60 * 1000).toISOString();

  useEffect(() => {
    fetch(`http://localhost:5000/api/book/${id}`)
    .then(res => res.json())
    .then(data => {
      setBook(data);
      setLoading(false); 
    });
  }, [id]);

    const BorrowModal = () =>{
      setShowBorrowModal(true);
    }

    const handleBorrow = () => {
    fetch(`http://localhost:5000/api/borrow`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, bookId: id, borrowDate, returnDate})
    })
      .then((res) => res.json())
      .then((newBorrow) => {
        setBorrows([...borrows, newBorrow]);
        localStorage.setItem('bookTitle', book.title);
        alert("Book borrowed successfully");
        window.location.reload();
        setShowAddModal(false);
      });
  };

  return (
    <>
      <Navbar/>
      {loading ? (
        <div className="p-10 text-center text-xl">Loading...</div>
      ) : book ? (
        <div className="p-6 max-w-6xl mt-30 ml-5 mx-auto grid md:grid-cols-2 gap-8">
          {/* Book Cover */}
          <div className="flex justify-center">
            <img
              src={book.cover || 'https://picsum.photos/200/300'}
              alt={book.title}
              className="w-70 h-[430px] object-cover rounded-2xl shadow-lg"
            />
          </div>

          {/* Book Info */}
          <div>
            <h1 className="text-3xl font-bold mt-5">{book.title}</h1>
            <p className="text-lg text-gray-600 mt-5">By {book.author}</p>
            <span className="flex gap-x-10">
            <p className="text-lg text-gray-600 mt-4 border p-2 text-yellow-600 rounded-xl">Quantity: {book.quantity}</p>
            <p className="text-lg text-gray-600 mt-4 border p-2 text-green-600 rounded-xl">Available: {book.available}</p>
            </span>
            <p className="mt-5 text-sm bg-blue-100 text-blue-600 inline-block px-3 py-1 rounded-full">
              ISBN: { book.isbn || "Category"}
            </p>

            {/* Description */}
            <p className="mt-6 text-gray-700 leading-relaxed">
              {book.paragraph || "No description available."}
            </p>

            {/* Buttons */}
            <div className="mt-8 flex gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition"
               onClick={BorrowModal}>
                Borrow Now
              </button>
              <button className="bg--200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-xl shadow-md transition">
                Add to Favourite
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-10 text-center text-xl">Book not found</div>
      )}

      {/* comment section */}
      <div className="p-6 max-w-6xl mt-10 ml-5 mx-auto">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <div className="border-t border-gray-300 pt-4">
          <p className="text-gray-700">No comments yet. Be the first to comment on this book!</p>
        </div>
        <div className="mt-4">
          <textarea
            className="w-full border border-gray-300 p-2 rounded-md"
            rows="4"
            placeholder="Add a comment..."
          ></textarea>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mt-2"
            onClick={() => {
              alert("Thank you for your comment!");
              document.querySelector("textarea").value = "";
            }}>
            Submit
          </button>
        </div>
      </div>
      <Footer/>

      {/* popup modal for borrow */}
      {showBorrowModal && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96 border">
            <h3 className="text-lg font-bold text-center mb-4">
              Confirm Borrow
            </h3>
            <p className="text-center mb-4">
              Are you sure you want to borrow this book?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleBorrow}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Yes
              </button>
              <button
                onClick={() => setShowBorrowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  )};

  export default BookDetail;
