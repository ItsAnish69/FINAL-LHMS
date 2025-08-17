import Footer from "./footer";
import Navbar from "./navbar2";

const BookDetail = () => {
  return (
    <>
    <Navbar/>
    {/* how to use the relative postion */}
        <div className="p-6 max-w-6xl mt-10 ml-5 mx-auto grid md:grid-cols-2 gap-8">
      {/* Book Cover */}
      <div className="flex justify-center">
        <img
          src="https://via.placeholder.com/300x400"
          alt="Book Cover"
          className="w-80 h-[430px] object-cover rounded-2xl shadow-lg"
        />
      </div>

      {/* Book Info */}
      <div>
        <h1 className="text-3xl font-bold">Book Title</h1>
        <p className="text-lg text-gray-600 mt-2">By Author Name</p>
        <p className="mt-2 text-sm bg-blue-100 text-blue-600 inline-block px-3 py-1 rounded-full">
          Category
        </p>

        {/* Ratings & Borrowed */}
        <div className="flex items-center gap-4 mt-4">
          <span className="text-yellow-500 text-lg">⭐ 4.5</span>
          <span className="text-gray-500">120 borrowed</span>
        </div>

        {/* Description */}
        <p className="mt-6 text-gray-700 leading-relaxed">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde labore reprehenderit corrupti dicta in magni 
          exercitationem deleniti eos molestiae quas at beatae cupiditate accusamus distinctio doloribus asperiores, vero 
          iusto omnis ipsa blanditiis aliquid atque, incidunt ad! Reiciendis architecto aspernatur laborum, qui quasi vel distinctio 
          adipisci, placeat excepturi facilis, a temporibus.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition">
            Borrow Now
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-xl shadow-md transition">
            Add to Favourite
          </button>
        </div>
      </div>
    </div>
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
            alert("Thank you for your comment!")
        }}>
          Submit
        </button>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default BookDetail;
