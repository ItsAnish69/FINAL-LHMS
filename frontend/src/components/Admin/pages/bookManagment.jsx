import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BookManagement = () => {
  const { id } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [formData, setFormData] = useState({ title: "", author: "", isbn: "", quantity: "", available: "", cover:"" });

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/book/`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      });
  }, []);

  localStorage.setItem('bookTitle', JSON.stringify(books.map(book => book.title)));

  // --------- DELETE ---------
  const handleDelete = (book) => {
    setSelectedBook(book);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!selectedBook) return;

    fetch(`http://localhost:5000/api/book/${selectedBook._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setBooks(books.filter((b) => b._id !== selectedBook._id));
        alert("Book deleted successfully");
        setShowDeleteModal(false);
        setSelectedBook(null);
      });
  };

  // --------- EDIT ---------
  const handleEdit = (book) => {
    setSelectedBook(book);
    setFormData({ title: book.title, author: book.author, isbn: book.isbn });
    setShowEditModal(true);
  };

  const confirmEdit = () => {
    if (!selectedBook) return;

    fetch(`http://localhost:5000/api/book/${selectedBook._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((updated) => {
        setBooks(
          books.map((b) => (b._id === selectedBook._id ? { ...b, ...updated } : b))
        );
        alert("Book updated successfully");
        setShowEditModal(false);
        setSelectedBook(null);
      });
  };

  // --------- ADD ---------
  const handleAddBook = () => {
    setFormData({ title: "", author: "", isbn: "", quantity: "", available: "", cover:"" });
    setShowAddModal(true);
  };

  const confirmAdd = () => {
    fetch(`http://localhost:5000/api/book/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newBook) => {
        setBooks([...books, newBook]);
        alert("Book added successfully");
        window.location.reload();
        setShowAddModal(false);
      });
  };

  const filteredBooks = books.filter(
    book => book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center p-4">
        <h2 className="text-2xl font-bold">User Management</h2>
        <div>
          <button
            onClick={handleAddBook}
            className="bg-blue-600 text-white px-8 py-2 rounded-md mr-2"
          >
            Add Book
          </button>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="p-3 flex justify-center items-center px-6 gap-x-5">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
        <button className="bg-blue-600 text-white px-5 py-2 rounded-md">
          Filter
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto p-4">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-b p-2 text-left w-1/12">ID</th>
              <th className="border-b p-2 text-left w-2/12">Title</th>
              <th className="border-b p-2 text-left w-3/12">Author</th>
              <th className="border-b p-2 text-left w-4/12">Isbn</th>
              <th className="border-b p-2 text-left w-3/12">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-10 text-center text-xl">
                  Loading...
                </td>
              </tr>
            ) : filteredBooks.length > 0 ? (
              filteredBooks.map((book, idx) => (
                <tr key={book._id}>
                  <td className="border-b p-2">{idx + 1}</td>
                  <td className="border-b p-2">{book.title}</td>
                  <td className="border-b p-2">{book.author}</td>
                  <td className="border-b p-2">{book.isbn}</td>
                  <td className="border-b p-2">
                    <div className="flex space-x-5">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => handleEdit(book)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(book)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-10 text-center">
                  No Books found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96 border">
            <h3 className="text-lg font-bold text-center mb-4">
              Are you sure you want to delete this Book?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Yes
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
{showEditModal && (
  <div className="absolute inset-0 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-md shadow-lg w-96 border">
      <h3 className="text-lg font-bold text-center mb-4">Edit Book</h3>

      <input
        type="text"
        className="border w-full p-2 mb-3 rounded"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <input
        type="text"
        className="border w-full p-2 mb-3 rounded"
        placeholder="Author"
        value={formData.author}
        onChange={(e) =>
          setFormData({ ...formData, author: e.target.value })
        }
      />
       <input
        type="number"
        className="border w-full p-2 mb-3 rounded"
        placeholder="Quantity"
        value={formData.quantity}
        onChange={(e) =>
          setFormData({ ...formData, quantity: e.target.value })
        }
      />

       <input
        type="number"
        className="border w-full p-2 mb-3 rounded"
        placeholder="Available"
        value={formData.available}
        onChange={(e) =>
          setFormData({ ...formData, available: e.target.value })
        }
      />

      <input
        type="text"
        className="border w-full p-2 mb-3 rounded"
        placeholder="Cover"
        value={formData.cover}
        onChange={(e) =>
          setFormData({ ...formData, cover: e.target.value })
        }
      />

      <div className="flex gap-3 mt-4">
        <button
          onClick={confirmEdit}
          className="bg-blue-600 text-white px-4 py-2 rounded-md w-full"
        >
          Update
        </button>
        <button
          onClick={() => setShowEditModal(false)}
          className="bg-gray-400 text-white px-4 py-2 rounded-md w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

{/* ADD Book MODAL */}
{showAddModal && (
  <div className="absolute inset-0 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-md shadow-lg w-96 border">
      <h3 className="text-lg font-bold text-center mb-4">Add Book</h3>

      <input
        type="text"
        className="border w-full p-2 mb-3 rounded"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <input
        type="text"
        className="border w-full p-2 mb-3 rounded"
        placeholder="Author"
        value={formData.author}
        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
      />
      <input
        type="text"
        className="border w-full p-2 mb-3 rounded"
        placeholder="Isbn Number"
        value={formData.isbn}
        onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
      />

      <input
        type="number"
        className="border w-full p-2 mb-3 rounded"
        placeholder="quantity"
        value={formData.quantity}
        onChange={(e) =>
          setFormData({ ...formData, quantity: e.target.value })
        }
      />

      <input
        type="number"
        className="border w-full p-2 mb-3 rounded"
        placeholder="Available"
        value={formData.available}
        onChange={(e) =>
          setFormData({ ...formData, available: e.target.value })
        }
      />

      <input
        type="text"
        className="border w-full p-2 mb-3 rounded"
        placeholder="Cover URL"
        value={formData.cover}
        onChange={(e) =>
          setFormData({ ...formData, cover: e.target.value })
        }
      />

      <div className="flex gap-3 mt-4">
        <button
          onClick={confirmAdd}
          className="bg-green-600 text-white px-4 py-2 rounded-md w-full"
        >
          Add
        </button>
        <button
          onClick={() => setShowAddModal(false)}
          className="bg-gray-400 text-white px-4 py-2 rounded-md w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default BookManagement;
