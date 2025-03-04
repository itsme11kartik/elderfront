import React, { useState, useEffect } from 'react';
import Navbar from './navbar';

const categories = [
  "General Discussions",
  "Health & Wellness",
  "Caregiving Tips",
  "Hobbies & Activities",
  "Support & Assistance"
];

const CommunityForum = ({ username, userType }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const res = await fetch("https://elderback.onrender.com/post/");
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handlePostSubmit = async () => {
    try {
      const res = await fetch("https://elderback.onrender.com/post/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newPost,
          username,
          selectedCategory
        })
      });
      if (res.ok) {
        setSelectedCategory(categories[0]); // Reset to default category
        setNewPost('');
        fetchPost();
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <>
      <Navbar username={username} userType={userType} />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
            Community Forum
          </h1>

          {/* Category Tabs */}
          <div className="flex space-x-2 mb-6 overflow-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } transition duration-300`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Post Input */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="w-full p-3 border border-blue-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Share something in ${selectedCategory}...`}
              rows="4"
            ></textarea>
            <button
              onClick={handlePostSubmit}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Post
            </button>
          </div>

          {/* Posts Display */}
          <div>
            {posts
              .filter(post => post.selectedCategory === selectedCategory)
              .map((post, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md mb-4">
                  <p className="text-gray-700 text-lg">{post.newPost}</p>
                  <div className="flex items-center mt-4">
                    <span className="text-sm text-gray-600">Posted by: {post.username}</span>
                    <span className="ml-4 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {post.selectedCategory}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityForum;