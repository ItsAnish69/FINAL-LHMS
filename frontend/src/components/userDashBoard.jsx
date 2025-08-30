import { BookOpen, Star, User } from "lucide-react";
import defaultProfile from "../images/defaultAvatar.jpg";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const UserDashboard = () => {
  const userId = localStorage.getItem('userId');
  const [user, setUser] = useState(null);
  const userName =  localStorage.getItem('userName') || '';
  const userEmail = localStorage.getItem('userEmail') || '';
  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState([]);

  
  // Fetching the specific user's activity
  useEffect(() => {
    if (!userId) return;
    axios.get(`https://lhms-website.onrender.com/api/borrow/user/${userId}`)
    .then(res => setActivity(res.data))
    .catch(() => setActivity([]));
  }, [userId]);

  
  useEffect(() => {
    if (!userId) return;
    axios.get(`https://lhms-website.onrender.com/api/borrow/${userId}`)
    .then(res => setActivity(res.data))
    .catch(() => setActivity([]));
  }, [userId]);


  useEffect(() => {
    if (!userId) return;
    axios.post(`https://lhms-website.onrender.com/api/user/${userId}`)
    .then(res => {
      setUser(res.data);
      setLoading(false);
    })
    .catch(() => setLoading(false));
  }, [userId]);

    // Handle returning a book
    const handleReturn = async (borrowId, bookId) => {
      // Delete borrow record
      await axios.delete(`https://lhms-website.onrender.com/api/borrow/${borrowId}`);
      // Update available count
      const bookRes = await axios.get(`https://lhms-website.onrender.com/api/book/${bookId}`);
      const currentAvailable = bookRes.data.available;
      const newAvailable = currentAvailable + 1;
      await axios.put(`https://lhms-website.onrender.com/api/book/${bookId}`, { available: newAvailable });
      alert("Book returned successfully");
      window.location.reload();
    };

    const safeActivity = Array.isArray(activity) ? activity : [];

    return (
      <div className="min-h-screen bg-gray-50 p-6 space-y-6">
        {/* Welcome Message */}
        <header className="bg-[#f25d5d] p-6 rounded-xl flex justify-between items-center shadow">
        <div>
        <h1 className="text-2xl font-bold text-white">Welcome Back, {userName} 👋</h1>
        <p className="text-white">Here’s your library dashboard overview.</p>
        </div>
        <button className="bg-white text-[#f25d5d] rounded-lg font-bold px-4 py-2 hover:scale-105"
        onClick={() => {window.location.href = "/home"}}>Return to Library</button>
      </header>

      {/* Profile and Stats Side by Side */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
          <img
            src={defaultProfile}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-[#f25d5d] mb-4"
            />
          
          <div className="w-full max-w-lg space-y-4">
            <div>
              <label className="text-sm text-gray-500">Name</label>
              <p className="text-lg font-medium text-gray-800 border-b">{userName}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <p className="text-lg font-medium text-gray-800 border-b">{userEmail}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Library</label>
              <input
                type="text"
                value="BookHub Library"
                disabled
                className="w-full mt-1 border rounded p-2"
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex gap-y-10 p-5 bg-red-400 justify-center items-center rounded-xl shadow-xl ">
        <div className="flex flex-col gap-8 w-full">
          <div className="w-full h-80 bg-white rounded-xl shadow-lg flex flex-col justify-center items-center">
            <BookOpen className="w-15 h-15 text-[#f25d5d] mx-auto mb-2" />
            <h3 className="text-3xl font-bold text-gray-800">
              {Array.isArray(activity) ? activity.length : 0}
            </h3>
            <p className="text-xl text-gray-500">Borrowed Books</p>
          </div>
        </div>
        </div>

      </section>

        {/* Book Activity Log */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-4">
          <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-[#f25d5d]" />
            <span>Book Activity</span>
          </h2>
          {/* Book Activity List */}
          <div className="space-y-4">
            {safeActivity.length === 0 ? (
              <p className="text-gray-500">No borrowed books yet.</p>
            ) : (
              safeActivity.length > 0 ? (
                safeActivity.map((borrow) => {
                  const title = borrow.bookId?.title || "Unknown";
                  const borrowDate = new Date(borrow.borrowDate);
                  const dueDate = new Date(borrowDate.getTime() + 7 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .slice(0, 10);
                  return (
                    <div key={borrow._id} className="border p-4 rounded-lg hover:bg-gray-50">
                      <p className="font-medium text-gray-800">Borrowed: {title}</p>
                      <p className="text-sm text-gray-500">Due: {dueDate}</p>
                      <div className="flex justify-end">
                        <button
                          className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          onClick={() => handleReturn(borrow._id, borrow.bookId?._id)}
                        >
                          Return Book
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : null
            )}
          </div>
        </div>
      </div>
  );
}
export default UserDashboard;