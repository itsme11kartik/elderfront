import Navbar from "./navbar";
import { Link } from "react-router-dom";
import { 
  ClipboardList, 
  MessageCircle, 
  Users, 
  Activity, 
  AlertCircle 
} from 'lucide-react';

function FamilyHome({ userType, username }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navbar username={username} userType={userType} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-6 flex items-center">
          Welcome to Family Dashboard, {username}!
        </h1>

        {/* Task Overview */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Task Management Card */}
          <div className="bg-white shadow-xl rounded-2xl p-6 border border-blue-100 hover:shadow-2xl transition">
            <div className="flex items-center mb-4">
              <ClipboardList className="w-8 h-8 text-blue-500 mr-3" />
              <h2 className="text-xl font-semibold text-blue-800">Task Management</h2>
            </div>
            <p className="text-gray-600 mb-4">Assign and track elderly care tasks efficiently.</p>
            <Link 
              to="/family-task" 
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Manage Tasks
            </Link>
          </div>

          {/* Chat with Elderly Card */}
          <div className="bg-white shadow-xl rounded-2xl p-6 border border-blue-100 hover:shadow-2xl transition">
            <div className="flex items-center mb-4">
              <MessageCircle className="w-8 h-8 text-blue-500 mr-3" />
              <h2 className="text-xl font-semibold text-blue-800">Chat with Elderly</h2>
            </div>
            <p className="text-gray-600 mb-4">Stay connected with real-time messaging.</p>
            <Link 
              to="/chat" 
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Go to Chat
            </Link>
          </div>
        </div>

        {/* Additional Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {/* Community Forum Card */}
          <div className="bg-white shadow-xl rounded-2xl p-6 border border-blue-100 hover:shadow-2xl transition">
            <div className="flex items-center mb-4">
              <Users className="w-8 h-8 text-blue-500 mr-3" />
              <h2 className="text-xl font-semibold text-blue-800">Community Forum</h2>
            </div>
            <p className="text-gray-600 mb-4">Help elderly users engage with others in the community.</p>
            <Link 
              to="/community" 
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Join Community
            </Link>
          </div>

          {/* Health & Activity Log Card */}
          <div className="bg-white shadow-xl rounded-2xl p-6 border border-blue-100 hover:shadow-2xl transition">
            <div className="flex items-center mb-4">
              <Activity className="w-8 h-8 text-blue-500 mr-3" />
              <h2 className="text-xl font-semibold text-blue-800">Health & Activity Log</h2>
            </div>
            <p className="text-gray-600 mb-4">Monitor step counts, sleep hours, and more.</p>
            <Link 
              to="/health" 
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              View Logs
            </Link>
          </div>

          {/* Emergency Alerts Card */}
          <div className="bg-white shadow-xl rounded-2xl p-6 border border-blue-100 hover:shadow-2xl transition">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-8 h-8 text-blue-500 mr-3" />
              <h2 className="text-xl font-semibold text-blue-800">Emergency Alerts</h2>
            </div>
            <p className="text-gray-600 mb-4">Get notified about emergency situations instantly.</p>
            <Link 
              to="/alerts" 
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              View Alerts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FamilyHome;