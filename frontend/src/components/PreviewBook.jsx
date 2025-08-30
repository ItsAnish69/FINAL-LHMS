import  {useEffect , useState} from 'react';
import { useNavigate } from 'react-router-dom'; 

const PreviewBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(()=> {
    fetch('https://lhms-website.onrender.com/api/book')
    .then(res => res.json())
    .then(data => setBooks(data));
  },[]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
      {books.map(book => (
        <div key={book._id} className="card bg-base-100 shadow-lg p-2 rounded-xl w-55 mx-auto">
          <figure key={book._id}className="px-3 pt-3">
            <img
              src={book.cover}
              alt={book.title}
              className="rounded-xl w-full h-72 object-cover"
            />
          </figure>
          <div className="card-body items-center text-center p-4">
            <h2 className="card-title text-lg md:text-xl">{book.title}</h2>
            <div className="card-actions">
            </div>
          </div>
        </div>
      ))}
        </div>
    </>
  )
}

export default PreviewBooks;
