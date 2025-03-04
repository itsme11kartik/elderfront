import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Home, 
  ClipboardList, 
  MessageCircle, 
  Users, 
  LogOut, 
  Menu, 
  X 
} from "lucide-react";

function Navbar({ username, userType }) {
  const [showLogout, setShowLogout] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login"); 
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

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <img
            src="https://media.istockphoto.com/id/1089740228/vector/elderly-healthcare-heart-shaped-logo-nursing-home-sign.jpg?s=612x612&w=0&k=20&c=5zSiq4HL370qXBX69EtYdCZQAhSvA_9WnxEEA_rjhTM="
            alt="ElderlyCare Logo"
            className="h-12 w-12 rounded-full border-2 border-white"
          />
          <span className="text-white text-2xl font-bold tracking-wide">ElderlyCare</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to={homeLink} 
            className="text-white flex items-center space-x-2 hover:text-blue-100 transition"
          >
            <Home size={20} />
            <span>Home</span>
          </Link>
          <Link 
            to={task} 
            className="text-white flex items-center space-x-2 hover:text-blue-100 transition"
          >
            <ClipboardList size={20} />
            <span>Tasks</span>
          </Link>
          <Link 
            to="/chat" 
            className="text-white flex items-center space-x-2 hover:text-blue-100 transition"
          >
            <MessageCircle size={20} />
            <span>Chat</span>
          </Link>
          <Link 
            to="/forum" 
            className="text-white flex items-center space-x-2 hover:text-blue-100 transition"
          >
            <Users size={20} />
            <span>Community</span>
          </Link>
        </div>

        {/* User Profile and Logout */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:block text-white font-medium">{username}</div>
          <div className="relative">
            <img
              src="https://png.pngtree.com/png-vector/20210426/ourmid/pngtree-young-man-cartoon-profile-vector-hd-image-png-image_3238138.jpg"
              alt="Profile"
              className="h-12 w-12 rounded-full border-2 border-white object-cover cursor-pointer"
              onClick={() => setShowLogout(!showLogout)}
            />
            {showLogout && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg overflow-hidden">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link 
              to={homeLink} 
              className="block text-blue-800 py-2 hover:bg-blue-50 transition flex items-center space-x-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link 
              to={task} 
              className="block text-blue-800 py-2 hover:bg-blue-50 transition flex items-center space-x-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <ClipboardList size={20} />
              <span>Tasks</span>
            </Link>
            <Link 
              to="/chat" 
              className="block text-blue-800 py-2 hover:bg-blue-50 transition flex items-center space-x-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <MessageCircle size={20} />
              <span>Chat</span>
            </Link>
            <Link 
              to="/forum" 
              className="block text-blue-800 py-2 hover:bg-blue-50 transition flex items-center space-x-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Users size={20} />
              <span>Community</span>
            </Link>
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 text-red-600 hover:bg-red-50 py-2 transition"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;