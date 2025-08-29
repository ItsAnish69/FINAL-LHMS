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
  const fileInputRef = useRef();


useEffect(() => {
  if (!userId) return;
  axios.get(`http://localhost:5000/api/borrow/${userId}`)
    .then(res => setActivity(res.data))
    .catch(() => setActivity([]));
}, [userId]);

  useEffect(() => {
    if (!userId) return;
    axios.post(`http://localhost:5000/api/user/${userId}`)
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userId]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData();
      formData.append('avatar', e.target.files[0]);
      console.log('user id:', userId);
      axios.post(`http://localhost:5000/api/user/${userId}/upload-profile`, formData)
        .then(res => {
          setUser(res.data);
          alert('Profile picture updated!');
        })
        .catch(() => alert('Failed to upload image.'));
    }
  };

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
          <input
            type="file"
            accept="image/*"
            style={{display:"none"}}
            ref={fileInputRef}
            onChange={handleImageChange}
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
                className="w-full mt-1 border rounded p-2"
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex gap-y-10 p-5 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col gap-8 w-full h-50 justify-evenly items-center">
          <div className="bg-white p-8 h-40 w-full rounded-xl shadow text-center">
            <BookOpen className="w-10 h-10 text-[#f25d5d] mx-auto mb-2" />
            <h3 className="text-xl font-bold text-gray-800">3</h3>
            <p className="text-gray-500">Borrowed Books</p>
          </div>
          <div className="bg-white p-8 h-40 w-full rounded-xl shadow text-center">
            <Star className="w-10 h-10 text-yellow-500 mx-auto mb-2" />
            <h3 className="text-xl font-bold text-gray-800">2</h3>
            <p className="text-gray-500">Favourite Books</p>
          </div>
        </div>
        </div>

      </section>

      {/* Book Activity and Favourite Books Side by Side */}
        {/* Book Activity Log */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-[#f25d5d]" />
            <span>Book Activity</span>
          </h2>
          {/* Book Activity List */}
          <div className="space-y-4">
            <div className="border p-4 rounded-lg hover:bg-gray-50">
              <p className="font-medium text-gray-800">Borrowed: The Great Gatsby</p>
              <p className="text-sm text-gray-500">Due: 2025-08-20</p>
              {/* put the button on the right side */}
              <div className="flex justify-end">
                <button className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                  Return Book
                </button>
              </div>
            </div>
            <div className="border p-4 rounded-lg hover:bg-gray-50">
              <p className="font-medium text-gray-800">Borrowed: 1984</p>
              <p className="text-sm text-gray-500">Due: 2025-08-10</p>
              <div className="flex justify-end">
                <button className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                Return Book
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
}
export default UserDashboard;