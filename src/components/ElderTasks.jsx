import React, { useState, useEffect } from "react";
import Navbar from "./navbar";

const ElderTasks = ({ username, userType }) => {
  const [tasks, setTasks] = useState([]);
  const [dailySteps, setDailySteps] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [requestTask, setRequestTask] = useState("");
  const [familyMembers, setFamilyMembers] = useState([]);
  const [selectedFamilyMember, setSelectedFamilyMember] = useState("");

  useEffect(() => {
    fetchTasks();
    fetchHealthData();
    fetchFamilyMembers();
  }, []);

  const fetchTasks = async () => {
    console.log("Fetching tasks...");
    const response = await fetch(`https://elderback.onrender.com/family-task/get/${username}`);
    const data = await response.json();
    console.log("Tasks fetched:", data);
    setTasks(data);
  };

  const fetchHealthData = async () => {
    const response = await fetch("https://elderback.onrender.com/elder-health-data");
    const data = await response.json();
    setDailySteps(data.steps);
    setCaloriesBurned(data.calories);
  };

  const fetchFamilyMembers = async () => {
    try {
      const response = await fetch("https://elderback.onrender.com/user/family");
      const data = await response.json();
      console.log("Family members fetched:", data);
      setFamilyMembers(data);
    } catch (error) {
      console.error("Error fetching family members:", error);
    }
  };

  const requestNewTask = async () => {
    if (requestTask.trim() === "" || selectedFamilyMember === "") {
      alert("Please enter a task and select a family member.");
      return;
    }

    const response = await fetch("https://elderback.onrender.com/request-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        elder: username, 
        familyMember: selectedFamilyMember, 
        task: requestTask 
      }),
    });

    if (response.ok) {
      alert("Task request sent to family member.");
      setRequestTask("");
      setSelectedFamilyMember("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar username={username} userType={userType} />
      <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Side - Health Data & Request Task */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Daily Health Data</h2>
          <p className="text-lg">🚶 Steps Taken: <strong>{dailySteps}</strong></p>
          <p className="text-lg">🔥 Calories Burned: <strong>{caloriesBurned}</strong></p>

          {/* Request Task Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Request a Task</h3>
            
            {/* Family Member Selection */}
            <select
              value={selectedFamilyMember}
              onChange={(e) => setSelectedFamilyMember(e.target.value)}
              className="border p-2 rounded w-full mt-2"
            >
              <option value="">Select a Family Member</option>
              {familyMembers.map((member) => (
                <option key={member._id} value={member.username}>
                  {member.name}
                </option>
              ))}
            </select>

            {/* Task Input */}
            <input
              type="text"
              value={requestTask}
              onChange={(e) => setRequestTask(e.target.value)}
              className="border p-2 rounded w-full mt-2"
              placeholder="Enter task request"
            />

            <button
              onClick={requestNewTask}
              className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 mt-2"
            >
              Request Task
            </button>
          </div>
        </div>

        {/* Right Side - Task List */}
        <div className="bg-white p-6 rounded-lg shadow-md overflow-y-auto" style={{ maxHeight: "470px" }}>
          <h2 className="text-xl font-semibold mb-4">Assigned Tasks</h2>
          <ul className="space-y-4">
            {tasks.map((t) => (
              <li
                key={t.id}
                className={`p-4 rounded-lg shadow-md ${
                  t.importanceLevel === "High"
                    ? "bg-red-400 text-white"
                    : t.importanceLevel === "Medium"
                    ? "bg-yellow-400 text-black"
                    : "bg-green-400 text-black"
                }`}
              >
                <h3 className="font-bold text-lg">📝 {t.task}</h3>
                <p className="text-sm">⏰ Completion Time: <strong>{t.completionTime}</strong></p>
                <p className="text-sm font-bold">⚡ Importance: {t.importanceLevel}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ElderTasks;
