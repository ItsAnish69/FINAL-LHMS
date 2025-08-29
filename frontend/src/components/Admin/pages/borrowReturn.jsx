import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BorrowReturn = () => {

  const [books, setBooks] = useState([]);
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);

  // modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBorrower, setSelectedBorrower] = useState(null);
  const [formData, setFormData] = useState({ userId:"", bookId:"", borrowDate:"", returnDate:"" });

  const name = localStorage.getItem('userName');
  let title = localStorage.getItem('bookTitle');

  useEffect(() => {
  fetch('http://localhost:5000/api/book')
    .then(res => res.json())
    .then(data => setBooks(data));
}, []);

  useEffect(() => {
    fetch(`http://localhost:5000/api/borrow/`)
      .then((res) => res.json())
      .then((data) => {
        setBorrows(data);
        setLoading(false);
      });
  }, []);

  // --------- DELETE ---------
  const handleDelete = (borrow) => {
    setSelectedBorrower(borrow);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!selectedBorrower) return;

    fetch(`http://localhost:5000/api/borrow/${selectedBorrower._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setBorrows(borrows.filter((u) => u._id !== selectedBorrower._id));
        alert("User deleted successfully");
        setShowDeleteModal(false);
        setSelectedBorrower(null);
      });
  };

  // --------- EDIT ---------
  const handleEdit = (borrow) => {
    setSelectedBorrower(borrow);
    setFormData({ userId: borrow.userId, bookId: borrow.bookId, borrowDate: borrow.borrowDate, returnDate: borrow.returnDate });
    setShowEditModal(true);
  };

  const confirmEdit = () => {
    if (!selectedBorrower) return;

    fetch(`http://localhost:5000/api/borrow/${selectedBorrower._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData), 
    })
      .then((res) => res.json())
      .then((updated) => {
        setBorrows(
          borrows.map((u) => (u._id === selectedBorrower._id ? { ...u, ...updated } : u))
        );
        alert("Borrower updated successfully");
        setShowEditModal(false);
        setSelectedBorrower(null);
      });
  };

  // --------- ADD ---------
  const handleAddUser = () => {
    setFormData({  userId:"", bookId:"", borrowDate:"", returnDate:"" });
    setShowAddModal(true);
  };

  const confirmAdd = () => {
    fetch(`http://localhost:5000/api/borrow`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newBorrow) => {
        setBorrows([...borrows, newBorrow]);
        alert("Borrower added successfully");
        //code to refresh the window
        window.location.reload();
        setShowAddModal(false);
      });
  };

  const filteredBorrows = borrows.filter(borrow =>
    borrow.userId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center p-4">
        <h2 className="text-2xl font-bold">Borrow Management</h2>
        <div>
          <button
            onClick={handleAddUser}
            className="bg-blue-600 text-white px-8 py-2 rounded-md mr-2"
          >
            Add User
          </button>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="p-3 flex justify-center items-center px-6 gap-x-5">
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search users..."
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
        <button className="bg-blue-600 text-white px-5 py-2 rounded-md">
          Filter
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto p-4">
        <table className="min-w-full border border-gray-300 table-fixed">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-b p-2 text-left w-1/12">ID</th>
              <th className="border-b p-2 text-left w-1/12">Name</th>
              <th className="border-b p-2 text-left w-2/12">Book</th>
              <th className="border-b p-2 text-left w-3/12">BorrowDate</th>
              <th className="border-b p-2 text-left w-4/12">ReturnDate</th>
              <th className="border-b p-2 text-left w-4/12">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="p-10 text-center text-xl">
                  Loading...
                </td>
              </tr>
            ) : filteredBorrows.length > 0 ? (
              filteredBorrows.map((borrow, idx) => {
                const bookTitle = books.find(b => b._id === borrow.bookId)?.title || "Unknown";
                return (
                  <tr key={borrow._id}>
                    <td className="border-b p-2">{idx + 1}</td>
                    <td className="border-b p-2">{borrow.userId}</td>
                    <td className="border-b p-2">{bookTitle}</td>
                    <td className="border-b p-2">{new Date(borrow.borrowDate).toISOString().slice(0, 10)}</td>
                    <td className="border-b p-2">{new Date(borrow.returnDate).toISOString().slice(0, 10)}</td>
                    <td className="border-b p-2">
                      <div className="flex space-x-5">
                        <button
                          className="text-blue-600 hover:underline"
                          onClick={() => handleEdit(borrow)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => handleDelete(borrow)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="p-10 text-center">
                  No users found
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
              Are you sure you want to delete this borrower?
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
      <h3 className="text-lg font-bold text-center mb-4">Edit Borrower</h3>

      <input
        type="text"
        className="border w-full p-2 mb-3 rounded"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="text"
        className="border w-full p-2 mb-3 rounded"
        placeholder="Title"
        value={formData.email}
        onChange={(e) =>
          setFormData({ ...formData, title: e.target.value })
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

{/* ADD USER MODAL */}
{showAddModal && (
  <div className="absolute inset-0 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-md shadow-lg w-96 border">
      <h3 className="text-lg font-bold text-center mb-4">Add Borrower</h3>

      <input
        type="text"
        className="border w-full p-2 mb-3 rounded"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="text"
        className="border w-full p-2 mb-3 rounded"
        placeholder="Title"
        value={formData.title}
        onChange={(e) =>
          setFormData({ ...formData, title: e.target.value })
        }
      />

       <input
        type="number"
        className="border w-full p-2 mb-3 rounded"
        placeholder="BorrowDate"
        value={formData.borrowDate}
        onChange={(e) =>
          setFormData({ ...formData, borrowDate: e.target.value })
        }
      />

       <input
        type="number"
        className="border w-full p-2 mb-3 rounded"
        placeholder="ReturnDate"
        value={formData.returnDate}
        onChange={(e) =>
          setFormData({ ...formData, returnDate: e.target.value })
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

}

export default BorrowReturn;
