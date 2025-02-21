import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ username,userType }) {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove JWT token from storage
    navigate("/login"); // Redirect to login page
  };
  const Type = "";
  if(userType==="Family"){
    Type="/family-home";
  }else{
    Type="/elder-home";
  }
  console.log(userType);

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-blue-600 p-4 flex justify-between items-center shadow-lg">
      {/* Left Side - Logo & Title */}
      <div className="flex items-center">
        <img
          src="https://media.istockphoto.com/id/1089740228/vector/elderly-healthcare-heart-shaped-logo-nursing-home-sign.jpg?s=612x612&w=0&k=20&c=5zSiq4HL370qXBX69EtYdCZQAhSvA_9WnxEEA_rjhTM="
          alt="Elderly Home Logo"
          className="h-14 w-14 rounded-full shadow-lg"
        />
        <h1 className="text-white text-2xl font-bold tracking-wide ml-3">
          ElderlyCare
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-6">
        <Link to={Type} className="text-white text-lg font-medium hover:underline">
          Home
        </Link>
        <Link to="/tasks" className="text-white text-lg font-medium hover:underline">
          Tasks
        </Link>
        <Link to="/chat" className="text-white text-lg font-medium hover:underline">
          Chat
        </Link>
        <Link to="/community" className="text-white text-lg font-medium hover:underline">
          Community
        </Link>
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
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
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
