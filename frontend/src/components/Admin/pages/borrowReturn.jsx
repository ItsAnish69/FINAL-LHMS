import { Book } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BorrowReturn = () => {

  const [books, setBooks] = useState([]);
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
  fetch('https://lhms-website.onrender.com/api/book')
    .then(res => res.json())
    .then(data => setBooks(data));
}, []);

  useEffect(() => {
    fetch(`https://lhms-website.onrender.com/api/borrow/`)
      .then((res) => res.json())
      .then((data) => {
        setBorrows(data);
        setLoading(false);
      });
  }, []);

  const filteredBorrows = borrows.filter(borrow =>
    borrow.userId?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center p-4">
        <h2 className="text-2xl font-bold">Borrow Management</h2>
        <div>
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
              <th className="border-b p-2 text-left w-2/12">Name</th>
              <th className="border-b p-2 text-left w-3/12">Book</th>
              <th className="border-b p-2 text-left w-3/12">BorrowDate</th>
              <th className="border-b p-2 text-left w-4/12">ReturnDate</th>
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
                const bookTitle = borrow.bookId?.title || "Unknown";
                const userName = borrow.userId?.name || "Unknown";

                return (
                  <tr key={borrow._id}>
                    <td className="border-b p-2">{idx + 1}</td>
                    <td className="border-b p-2">{userName}</td>
                    <td className="border-b p-2">{bookTitle}</td>
                    <td className="border-b p-2">{new Date(borrow.borrowDate).toISOString().slice(0, 10)}</td>
                    <td className="border-b p-2">{new Date(borrow.returnDate).toISOString().slice(0, 10)}</td>
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
    </>
  );

}

export default BorrowReturn;
