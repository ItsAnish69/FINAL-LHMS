import React from "react";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full flex flex-col bg-white">
      {/* Logo / Header */}
      <div className="flex items-center justify-center h-16 p-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold">BookHub</h1>
      </div>

      {/* Avatar Section */}
      <div className="avatar flex flex-col justify-center items-center mt-6">
        <div className="ring-primary w-24 h-24 rounded-full ring-2 ring-offset-2 overflow-hidden">
          <img
            src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
            alt="Admin Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-xl font-bold mt-3">Anish Karki</h1>
        <p className="text-gray-500 text-sm">Current Admin</p>
      </div>

      {/* Navigation */}
      {/* add 4 more button like the dashboard */}
      <nav className="mt-8 font-semibold">
        <button
          onClick={() => navigate("")}
          className="w-full flex items-center px-6 py-3 text-left cursor-pointer transition-colors hover:bg-gray-200"> Dashboard
        </button>

        <button onClick={() => navigate("Users")} className="w-full flex items-center px-6 py-3 text-left cursor-pointer transition-colors hover:bg-gray-200">
          Users Management
        </button>

        <button onClick={() => navigate("Books")} className="w-full flex items-center px-6 py-3 text-left cursor-pointer transition-colors hover:bg-gray-200">
          Books Management
        </button>

        <button onClick={() => navigate("Borrow-return")} className="w-full flex items-center px-6 py-3 text-left cursor-pointer transition-colors hover:bg-gray-200">
          Borrow & Return
        </button>

        <button onClick={() => navigate("Settings")} className="w-full flex items-center px-6 py-3 text-left cursor-pointer transition-colors hover:bg-gray-200">
          Settings
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
