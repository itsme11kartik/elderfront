import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ username, userType }) {
  const [showLogout, setShowLogout] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove JWT token from storage
    navigate("/login"); // Redirect to login page
  };

  let homeLink = "/";
  let task = "/";
  if (userType === "Family") {
    homeLink = "/family-home";
    task="/family-task";
  } else if (userType === "Elder") {
    homeLink = "/elder-home";
    task="/elder-task";
  }

  
  

  console.log("User Type:", userType);

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-blue-600 p-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center">
        <img
          src="https://media.istockphoto.com/id/1089740228/vector/elderly-healthcare-heart-shaped-logo-nursing-home-sign.jpg?s=612x612&w=0&k=20&c=5zSiq4HL370qXBX69EtYdCZQAhSvA_9WnxEEA_rjhTM="
          alt="Elderly Home Logo"
          className="h-14 w-14 rounded-full shadow-lg hidden md:block"
        />
        <h1 className="text-white text-2xl font-bold tracking-wide ml-3 hidden md:block">
          ElderlyCare
        </h1>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex space-x-6">
        <Link to={homeLink} className="text-white text-lg font-medium hover:underline">
          Home
        </Link>
        <Link to={task} className="text-white text-lg font-medium hover:underline">
          Tasks
        </Link>
        <Link to="/chat" className="text-white text-lg font-medium hover:underline">
          Chat
        </Link>
        <Link to="/community" className="text-white text-lg font-medium hover:underline">
          Community
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white text-3xl font-semibold -ml-[130px] px-4 py-2 rounded focus:outline-none"
        >
          {isMobileMenuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 rounded-lg overflow-hidden ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-4 bg-blue-600 text-white rounded-t-lg">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-red-500">
            ✖
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-2 overflow-y-auto h-[calc(100%-64px)]">
          <Link to={homeLink} className="text-blue-800 text-lg font-medium hover:bg-gray-200 rounded px-2 py-1 transition duration-200">
            Home
          </Link>
          <Link to={task} className="text-blue-800 text-lg font-medium hover:bg-gray-200 rounded px-2 py-1 transition duration-200">
            Tasks
          </Link>
          <Link to="/chat" className="text-blue-800 text-lg font-medium hover:bg-gray-200 rounded px-2 py-1 transition duration-200">
            Chat
          </Link>
          <Link to="/community" className="text-blue-800 text-lg font-medium hover:bg-gray-200 rounded px-2 py-1 transition duration-200">
            Community
          </Link>
        </div>
      </div>

      {/* Right Side - Profile & Logout Popup */}
      <div className="relative flex items-center space-x-4">
        <span className="text-white text-lg font-semibold">{username}</span>

        {/* Profile Picture (Click to toggle logout popup) */}
        <div className="relative">
          <img
            src="https://png.pngtree.com/png-vector/20210426/ourmid/pngtree-young-man-cartoon-profile-vector-hd-image-png-image_3238138.jpg"
            alt="Profile"
            className="h-14 w-14 rounded-full border object-cover cursor-pointer"
            onClick={() => setShowLogout(!showLogout)}
          />

          {/* Logout Popup */}
          {showLogout && (
            <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-red-600 cursor-pointer "
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;