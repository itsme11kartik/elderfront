import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import { 
  ClipboardList, 
  PlusCircle, 
  CheckCircle2, 
  XCircle, 
  Clock 
} from 'lucide-react';

const FamilyTasks = ({ username, userType }) => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [selectedElder, setSelectedElder] = useState('');
  const [elders, setElders] = useState([]);
  const [importanceLevel, setImportance] = useState('');
  const [completionTime, setCompletionTime] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [requestedTasks, setRequestedTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
    fetchElders();
    fetchRequestedTasks();
  }, []);

  // Function to calculate remaining time for a task
  const calculateTimeLeft = (completionTime) => {
    if (!completionTime) return "No deadline set";

    const now = new Date();
    const completionDate = new Date(completionTime);

    if (isNaN(completionDate.getTime())) return "Invalid deadline";

    const timeDiff = completionDate - now;

    if (timeDiff <= 0) return "Time's up!";

    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);

    return `${hours}h ${minutes}m ${seconds}s left`;
  };

  // Update remaining time for all tasks every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((t) => ({
          ...t,
          timeLeft: calculateTimeLeft(t.completionTime),
        }))
      );
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const updatetasks = async (t) => {
    setTask(t.task);
    setSelectedElder(t.name);
    setImportance(t.importanceLevel);
    setCompletionTime(t.completionTime);
    setIsUpdating(true);
    
    const response = await fetch(`https://elderback.onrender.com/family-task/tasks/${t._id}`, {
      method: 'DELETE',
      headers: { 'content-Type': 'application/json' },
    });
    
    if (response.ok) {
      fetchTasks();
    } else {
      console.error("Task not updated");
    }
  };

  const fetchRequestedTasks = async () => {
    try {
      const response = await fetch(`https://elderback.onrender.com/family-task/requested-task/${username}`);
      const data = await response.json();
      setRequestedTasks(data);
    } catch (error) {
      console.error("Error fetching requested tasks:", error);
    }
  };

  const deleteTasks = async (t) => {
    const response = await fetch(`https://elderback.onrender.com/family-task/tasks/${t._id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      fetchTasks();
    } else {
      console.error("Error in deleting the task");
    }
  };

  const fetchTasks = async () => {
    const response = await fetch(`https://elderback.onrender.com/family-task/tasks`);
    const data = await response.json();
    setTasks(data.map((t) => ({
      ...t,
      timeLeft: calculateTimeLeft(t.completionTime), // Initialize timeLeft for each task
    })));
  };

  const fetchElders = async () => {
    const response = await fetch('https://elderback.onrender.com/user/Elder');
    const data = await response.json();
    setElders(data);
  };

  const addTask = async (e) => {
    e.preventDefault();
    setIsUpdating(false);

    const response = await fetch('https://elderback.onrender.com/family-task/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task, name: selectedElder, createdby: username, importanceLevel, completionTime }),
    });

    if (response.ok) {
      fetchTasks();
      setTask('');
      setSelectedElder('');
      setImportance('');
      setCompletionTime('');
    }
  };

  const setAccepted = async (t) => {
    const response = await fetch(`https://elderback.onrender.com/family-task/requested-task/${t._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Accepted' }),
    });

    if (response.ok) {
      fetchRequestedTasks();
    } else {
      console.error("Error in accepting the task");
    }
  };

  const getImportanceColor = (importance) => {
    switch(importance) {
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
          {/* Add Task Section */}
          <div className="bg-white shadow-xl rounded-2xl p-6 border border-blue-100">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-blue-800 flex items-center">
                <PlusCircle className="mr-3 text-blue-500" />
                {isUpdating ? "Update Task" : "Add Task"}
              </h2>
              <p className="text-gray-500 mt-2">Assign tasks to elders and set their importance level.</p>
            </div>

            <form onSubmit={addTask} className="space-y-4">
              <input 
                type="text" 
                value={task} 
                onChange={(e) => setTask(e.target.value)} 
                className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-300 transition" 
                placeholder="Enter task" 
                required 
              />
              <select 
                value={selectedElder} 
                onChange={(e) => setSelectedElder(e.target.value)} 
                className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-300 transition" 
                required
              >
                <option value="">Select an elder</option>
                {elders.map((elder) => (
                  <option key={elder.id} value={elder.id}>{elder.name}</option>
                ))}
              </select>
              <select 
                value={importanceLevel} 
                onChange={(e) => setImportance(e.target.value)} 
                className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-300 transition" 
                required
              >
                <option value="">Select importance level</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <input 
                type="datetime-local" 
                value={completionTime} 
                onChange={(e) => setCompletionTime(e.target.value)} 
                className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-300 transition" 
                required 
              />
              <button 
                type="submit" 
                className={`w-full ${isUpdating ? "bg-yellow-500" : "bg-blue-500"} text-white py-3 rounded-lg hover:opacity-80 transition`}
              >
                {isUpdating ? "Update Task" : "Add Task"}
              </button>
            </form>
          </div>

          {/* Requested Tasks Section */}
          <div className="bg-white shadow-xl rounded-2xl p-6 border border-blue-100">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-blue-800 flex items-center">
                <ClipboardList className="mr-3 text-blue-500" />
                Requested Tasks
              </h2>
              <p className="text-gray-500 mt-2">Tasks requested by elders.</p>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto">
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
                      {t.status === 'Accepted' ? (
                        <button 
                          disabled 
                          className="p-2 text-green-500 cursor-not-allowed"
                        >
                          <CheckCircle2 className="w-6 h-6" />
                        </button>
                      ) : (
                        <button 
                          onClick={() => setAccepted(t)} 
                          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                        >
                          Accept
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No requested tasks yet.</p>
              )}
            </div>
          </div>

          {/* Task List Section */}
          <div className="bg-white shadow-xl rounded-2xl p-6 border border-blue-100">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-blue-800 flex items-center">
                <ClipboardList className="mr-3 text-blue-500" />
                Task List
              </h2>
              <p className="text-gray-500 mt-2">Tasks assigned to elders.</p>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {tasks.map((t) => (
                <div 
                  key={t.id} 
                  className={`${getImportanceColor(t.importanceLevel)} rounded-lg p-4 border hover:shadow-md transition`}
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
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock className="mr-2 text-blue-500" />
                    {t.timeLeft} {/* Display dynamically updating time */}
                  </div>
                  <div className="flex justify-end space-x-2 mt-2">
                    <button 
                      onClick={() => updatetasks(t)} 
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                    >
                      Update
                    </button>
                    <button 
                      onClick={() => deleteTasks(t)} 
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
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

export default FamilyTasks;