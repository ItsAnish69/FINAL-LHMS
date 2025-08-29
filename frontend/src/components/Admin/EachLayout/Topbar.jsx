import { User, LogOut } from "lucide-react";
import backgroundPng from '../../../images/background.png';

const TopBar = ({ activeSection }) => {
  const sidebarItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "users", label: "User Management" },
    { id: "books", label: "Book Management" },
    { id: "transactions", label: "Borrow/Return" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <header className="fixed top-0 left-0 md:left-[18%] w-full md:w-[82%] h-14 md:h-16 bg-white shadow-md z-40">
      <div className="flex items-center justify-between px-4 md:px-6 h-full">
        {/* Active Section Title */}
        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 truncate">
          {sidebarItems.find((item) => item.id === activeSection)?.label}
        </h2>

        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Welcome Badge */}
          <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-[#F25D5D] rounded-md transition">
            <User className="h-4 w-4 text-white" />
            {/* Text hidden on xs, visible on sm+ */}
            <span className="hidden sm:inline text-xs sm:text-sm font-medium text-white">
              Welcome, Admin
            </span>
          </div>

          {/* Logout Button */}
          <button className="p-1.5 sm:p-2 rounded-md text-gray-500 cursor-pointer text-white hover:bg-white hover:text-gray-500 transition">
            <LogOut
              className="h-4 w-4 sm:h-5 sm:w-5"
              onClick={() =>
                document.getElementById("logout_modal").showModal()
              }
            />
          </button>
        </div>
      </div>

      {/* Logout Modal */}
      <dialog id="logout_modal" className="modal">
        <div className="modal-box w-11/12 max-w-sm sm:max-w-md p-6 sm:p-8 flex flex-col items-center bg-white">
          <h3 className="font-bold text-base sm:text-lg md:text-xl mb-2 text-center">
            Are you sure you want to logout?
          </h3>
          <p className="py-2 sm:py-4 text-sm sm:text-base text-center">
            If you want to logout, use the button below
          </p>
          <div className="modal-action w-full flex justify-center">
            <form method="dialog">
              <div className="flex gap-3">
                <button
                  className="btn w-20 sm:w-24 bg-red-400 text-white hover:scale-105 text-sm sm:text-base"
                  onClick={() => (window.location.href = "/")}
                >
                  Yes
                </button>
                <button className="btn w-20 sm:w-24 bg-gray-300 text-white hover:scale-105 text-sm sm:text-base">
                  No
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </header>
  );
};

export default TopBar;
