import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import {
  ClipboardList,
  PlusCircle,
  UserCircle2,
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react";

const ElderTasks = ({ username, userType }) => {
  const [tasks, setTasks] = useState([]);
  const [requestTask, setRequestTask] = useState("");
  const [familyMembers, setFamilyMembers] = useState([]);
  const [selectedFamilyMember, setSelectedFamilyMember] = useState("");
  const [requestedTasks, setRequestedTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
    fetchFamilyMembers();
    fetchRequestedTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`https://elderback.onrender.com/family-task/get/${username}`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchFamilyMembers = async () => {
    try {
      const response = await fetch("https://elderback.onrender.com/user/family");
      const data = await response.json();
      setFamilyMembers(data);
    } catch (error) {
      console.error("Error fetching family members:", error);
    }
  };

  const fetchRequestedTasks = async () => {
    try {
      const response = await fetch(`https://elderback.onrender.com/family-task/request-task/${username}`);
      const data = await response.json();
      setRequestedTasks(data);
    } catch (error) {
      console.error("Error fetching requested tasks:", error);
    }
  };
  const [completedTasks, setCompletedTasks] = useState(new Set());

  const setTaskStatus = async (t) => {
    try {
      const response = await fetch(`https://elderback.onrender.com/family-task/task/${t._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: t.task,
          name: t.name,
          createdby: t.createdby,
          importanceLevel: t.importanceLevel,
          completionTime: t.completionTime,
          status: "Completed",
        }),
      });

      if (response.ok) {
        alert("Task status updated successfully.");
        fetchTasks();
        setCompletedTasks((prev) => new Set(prev).add(t._id)); // Add task to completed set
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };



  const requestNewTask = async () => {
    if (requestTask.trim() === "" || selectedFamilyMember === "") {
      alert("Please enter a task and select a family member.");
      return;
    }

    try {
      const response = await fetch(`https://elderback.onrender.com/family-task/requested-task`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: requestTask,
          requestedBy: username,
          requestedTo: selectedFamilyMember,
          status: "Pending",
        }),
      });

      if (response.ok) {
        alert("Task request sent successfully.");
        setRequestTask("");
        setSelectedFamilyMember("");
        fetchRequestedTasks();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error requesting task:", error);
    }
  };

  const getImportanceColor = (importance) => {
    switch (importance) {
      case 'High':
        return 'bg-gradient-to-r from-red-100 to-red-200 border-red-300';
      case 'Medium':
        return 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300';
      default:
        return 'bg-gradient-to-r from-green-100 to-green-200 border-green-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navbar username={username} userType={userType} />
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Task Request Section */}
          <div className="md:col-span-1 bg-white shadow-xl rounded-2xl p-6 border border-blue-100">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-blue-800 flex items-center">
                <PlusCircle className="mr-3 text-blue-500" />
                Request a Task
              </h2>
              <p className="text-gray-500 mt-2">Select a family member and describe the task you need help with.</p>
            </div>

            <div className="space-y-4">
              <select
                value={selectedFamilyMember}
                onChange={(e) => setSelectedFamilyMember(e.target.value)}
                className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-300 transition"
              >
                <option value="">Select a Family Member</option>
                {familyMembers.map((member) => (
                  <option key={member._id} value={member.username}>
                    {member.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={requestTask}
                onChange={(e) => setRequestTask(e.target.value)}
                className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-300 transition"
                placeholder="Describe the task"
              />

              <button
                onClick={requestNewTask}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition"
              >
                Send Task Request
              </button>
            </div>
          </div>

          {/* Requested Tasks Section */}
          <div className="md:col-span-1 bg-white shadow-xl rounded-2xl p-6 border border-blue-100">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-blue-800 flex items-center">
                <ClipboardList className="mr-3 text-blue-500" />
                Requested Tasks
              </h2>
              <p className="text-gray-500 mt-2">Track the tasks you've requested from family members.</p>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {requestedTasks.length > 0 ? (
                requestedTasks.map((t, index) => (
                  <div
                    key={t._id || index}
                    className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:bg-blue-100 transition"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-blue-800">{t.task}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          From: {t.requestedBy} → To: {t.requestedTo}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium 
                        ${t.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          t.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'}`}
                      >
                        {t.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No requested tasks yet.</p>
              )}
            </div>
          </div>

          {/* Assigned Tasks Section */}
          <div className="md:col-span-1 bg-white shadow-xl rounded-2xl p-6 border border-blue-100">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-blue-800 flex items-center">
                <ClipboardList className="mr-3 text-blue-500" />
                Assigned Tasks
              </h2>
              <p className="text-gray-500 mt-2">These are the tasks assigned to you by your family.</p>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  className={`${getImportanceColor(t.importanceLevel)} 
                    rounded-lg p-4 border hover:shadow-md transition`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-blue-800">{t.task}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium 
    ${t.importanceLevel === 'High' ? 'bg-red-100 text-red-800' :
                        t.importanceLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'}`}
                    >
                      {t.importanceLevel}
                    </span>

                    {/* Show checkmark if completed, otherwise show button */}
                    {t.status === "Completed" ? (
                      <CheckCircle2 className="text-green-600 w-6 h-6" />
                    ) : (
                      <button
                        onClick={() => setTaskStatus(t)}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-3 rounded-md transition duration-200"
                      >
                        Done
                      </button>
                    )}
                  </div>


                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElderTasks;