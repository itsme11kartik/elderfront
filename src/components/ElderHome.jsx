import React, { useState, useEffect } from "react";
import Navbar from "./navbar";

function ElderHome({ username, userType }) {
  const [tasks, setTasks] = useState([]);
  const [requestedTasks, setRequestedTasks] = useState([]);
  const [communityPosts, setCommunityPosts] = useState([]);

  // Fetch tasks assigned to the user
  const fetchTasks = async () => {
    try {
      const response = await fetch(`https://elderback.onrender.com/family-task/get/${username}`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Fetch requested tasks
  const fetchRequestedTasks = async () => {
    try {
      const response = await fetch(`https://elderback.onrender.com/family-task/request-task/${username}`);
      const data = await response.json();
      setRequestedTasks(data);
    } catch (error) {
      console.error("Error fetching requested tasks:", error);
    }
  };

  // Fetch community posts
  const fetchCommunityPosts = async () => {
    try {
      const response = await fetch("https://elderback.onrender.com/post/");
      const data = await response.json();
      setCommunityPosts(data);
    } catch (error) {
      console.error("Error fetching community posts:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchRequestedTasks();
    fetchCommunityPosts();
  }, [username]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navbar username={username} userType={userType} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Welcome Section */}
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-3xl font-bold text-blue-900">Good Morning, {username}! ☀️</h2>
          <p className="text-gray-600 mt-2">Here’s your daily summary:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-800 font-semibold">{tasks.filter(task => task.status === "Completed").length} Tasks Completed</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-yellow-800 font-semibold">{tasks.filter(task => task.status === "Pending").length} Pending Tasks</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-red-800 font-semibold">{requestedTasks.length} Requested Tasks</p>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Assigned Tasks Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">📅 Your Tasks</h3>
            <div className="space-y-4">
              {tasks.slice(0, 3).map((task) => (
                <div
                  key={task._id}
                  className={`p-4 rounded-lg ${
                    task.status === "Completed"
                      ? "bg-green-100"
                      : task.importanceLevel === "High"
                      ? "bg-red-100"
                      : "bg-yellow-100"
                  }`}
                >
                  <p className="font-semibold">{task.task}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Due: {task.completionTime} | Status: {task.status}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Requested Tasks Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">🤝 Requested Tasks</h3>
            <div className="space-y-4">
              {requestedTasks.slice(0, 3).map((task) => (
                <div
                  key={task._id}
                  className={`p-4 rounded-lg ${
                    task.status === "Completed"
                      ? "bg-green-100"
                      : task.status === "Pending"
                      ? "bg-yellow-100"
                      : "bg-red-100"
                  }`}
                >
                  <p className="font-semibold">{task.task}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Requested To: {task.requestedTo} | Status: {task.status}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Community Posts Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">🌍 Community Posts</h3>
            <div className="space-y-4">
              {communityPosts.slice(0, 3).map((post) => (
                <div key={post._id} className="p-4 bg-blue-50 rounded-lg">
                  <p className="font-semibold">{post.newPost}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Posted by: {post.username} | Category: {post.selectedCategory}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Emergency SOS Button */}
        <div className="fixed bottom-8 right-8">
          <button className="bg-red-600 text-white px-8 py-4 rounded-full shadow-lg hover:bg-red-700 transition duration-300 text-lg flex items-center">
            🚨 SOS
          </button>
        </div>
      </div>
    </div>
  );
}

export default ElderHome;