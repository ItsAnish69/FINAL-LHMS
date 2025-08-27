import React, { useState } from "react";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "Anish Karki",
    email: "anish@example.com",
    address: "Kathmandu, Nepal",
    dob: "2005-08-15", // sample date
  });


  // Example notification list
  const [notifList] = useState([
    { id: 1, message: "New user registered: John Doe" },
    { id: 2, message: "New book added: React for Beginners" },
  ]);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleNotificationChange = (e) => {
    setNotifications({ ...notifications, [e.target.name]: e.target.checked });
  };

  const handleProfileSave = () => {
    alert("Profile updated!");
    // Make API call to update user profile here
  };

  const handleNotificationSave = () => {
    alert("Notification settings updated!");
    // Make API call to save notification preferences here
  };

  return (
    <div className="p-6 space-y-10">
      {/* Profile Settings */}
      
      <section className="bg-white shadow-xl rounded-xl p-5 ">
        <div className=" p-5 rounded-md w-60 w-full bg-gray-100 flex flex-col justify-center items-center">
          <img
            src='https://via.placeholder.com/150'
            alt="Profile Image" 
            className="w-40 h-40 rounded-full border-4 border-[#f25d5d] mb-4"
          />
          <button className="bg-[#f25d5d] text-white px-4 py-2 rounded-md hover:scale-105 transition-transform">Change Profile Image</button>
          </div>  
        <h2 className="text-xl font-bold mb-6 mt-5">Profile Settings</h2>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              className="w-full bg-gray-100 px-4 py-2 rounded-md"
            />
          </div>

          {/* Email (Uneditable) */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              disabled
              className="w-full px-4 py-2 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={profile.address}
              onChange={handleProfileChange}
              className="w-full bg-gray-100 px-4 py-2 rounded-md"
            />
          </div>

          {/* Date of Birth (Calendar, uneditable) */}
          <div>
            <label className="block text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={profile.dob}
              disabled
              className="w-full px-4 py-2 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        <button
          onClick={handleProfileSave}
          className="mt-6 bg-red-400 text-white px-6 py-2 rounded-md scale-95 hover:scale-100 transition-transform"
        >
          Save Profile
        </button>
      </section>

      {/* Notification Settings */}
      <section className="bg-white shadow-lg rounded-xl p-6 border">
        <h2 className="text-xl font-bold mb-6">Notification Settings</h2>

        {/* Notification Display */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold mb-3">Recent Notifications</h3>
          {notifList.length > 0 ? (
            <ul className="space-y-2">
              {notifList.map((notif) => (
                <li
                  key={notif.id}
                  className="p-3 rounded-md bg-white shadow border text-gray-700"
                >
                  {notif.message}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No new notifications</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Settings;
