import React, { useState } from "react";
import defaultProfile from "../../../images/defaultAvatar.jpg";
const Settings = () => {
  const [profile, setProfile] = useState([]);


const name = localStorage.getItem("userName");
const email = localStorage.getItem("userEmail");

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
    <div className="p-6 space-y-10 flex justify-center items-center">
      {/* Profile Settings */}
      
      <section className="bg-white shadow-xl w-full rounded-xl p-5 ">
        <div className=" p-5 rounded-md w-60 w-full bg-gray-100 flex flex-col justify-center items-center">
          <img
            src={defaultProfile}
            alt="Profile Image" 
            className="w-40 h-40 rounded-full border-4 border-[#f25d5d] mb-4"
          />
          </div>  
        <h2 className="text-xl font-bold mb-6 mt-5">Profile Settings</h2>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={name}
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
              value={email}
              disabled
              className="w-full px-4 py-2 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Library */}
          <div>
            <label className="block text-gray-700 mb-1">Library</label>
            <input
              type="text"
              name="library"
              value={"BookHub Library"}
              onChange={handleProfileChange}
              className="w-full bg-gray-100 px-4 py-2 rounded-md"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;
