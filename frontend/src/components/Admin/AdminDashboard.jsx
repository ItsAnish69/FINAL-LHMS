import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./EachLayout/Sidebar";
import TopBar from "./EachLayout/Topbar";
import { Menu, X } from "lucide-react";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar for large screens */}
      <div className="hidden md:block w-[18%]">
        <Sidebar />
      </div>

      {/* Sidebar drawer for small screens */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)} // close when clicking outside
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out bg-white w-64 shadow-xl md:hidden`}
      >
        {/* Drawer header with close button */}
        <div className="flex items-center justify-between h-14 px-4 border-b">
          <h1 className="text-xl font-bold">BookHub</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        {/* Sidebar contents */}
        <div className="overflow-y-auto h-[calc(100%-3.5rem)]">
          <Sidebar />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <div className="hidden md:block w-full">
          <TopBar activeSection="dashboard" />
        </div>

        {/* Mobile top row with hamburger menu */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white shadow z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>

        {/* Main Outlet */}
        <main className="flex-1 mt-14 md:mt-16 p-4 bg-gray-50 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
