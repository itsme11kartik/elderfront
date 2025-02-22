import React, { useState, useEffect } from 'react';
import Navbar from './navbar';

const FamilyTasks = ({ username, userType }) => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [selectedElder, setSelectedElder] = useState('');
  const [elders, setElders] = useState([]);
  const [importanceLevel, setImportance] = useState('');
  const [completionTime, setCompletionTime] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchTasks();
    fetchElders();
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
    const response = await fetch('https://elderback.onrender.com/family-task/getfull');
    const data = await response.json();
    setTasks(data);
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
      body: JSON.stringify({ task, name: selectedElder,createdby:username, importanceLevel, completionTime }),
    });

    if (response.ok) {
      fetchTasks();
      setTask('');
      setSelectedElder('');
      setImportance('');
      setCompletionTime('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar username={username} userType={userType} />
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Family Tasks</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <form onSubmit={addTask} className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-semibold">{isUpdating ? "Update Task" : "Add Task"}</h2>
            <input type="text" value={task} onChange={(e) => setTask(e.target.value)} className="border p-2 rounded w-full" placeholder="Enter task" required />
            <select value={selectedElder} onChange={(e) => setSelectedElder(e.target.value)} className="border p-2 rounded w-full" required>
              <option value="">Select an elder</option>
              {elders.map((elder) => (
                <option key={elder.id} value={elder.id}>{elder.name}</option>
              ))}
            </select>
            <select value={importanceLevel} onChange={(e) => setImportance(e.target.value)} className="border p-2 rounded w-full" required>
              <option value="">Select importance level</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <input type="time" value={completionTime} onChange={(e) => setCompletionTime(e.target.value)} className="border p-2 rounded w-full" required />
            <button type="submit" className={`${isUpdating ? "bg-yellow-500" : "bg-blue-500"} text-white p-2 rounded w-full hover:opacity-80`}>{isUpdating ? "Update Task" : "Add Task"}</button>
          </form>

          <div className="bg-white p-6 rounded-lg shadow-md overflow-y-auto" style={{ maxHeight: '540px' }}>
            <h2 className="text-xl font-semibold mb-4">Task List</h2>
            <ul className="space-y-4">
              {tasks.map((t) => (
                <li key={t.id} className={`p-4 rounded-lg shadow-md flex justify-between items-center ${t.importanceLevel === 'High' ? 'bg-red-400 text-white' : t.importanceLevel === 'Medium' ? 'bg-yellow-400 text-black' : 'bg-green-400 text-black'}`}>
                  <div>
                    <h3 className="font-bold text-lg">📝 {t.task}</h3>
                    <p className="text-sm">👤 Aiigned by: <strong>{username}</strong></p>
                    <p className="text-sm">👤 Assigned to: <strong>{t.name}</strong></p>
                    <p className="text-sm">⏰ Completion Time: <strong>{t.completionTime}</strong></p>
                    <p className="text-sm font-bold">⚡ Importance: {t.importanceLevel}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => updatetasks(t)} className="bg-white text-black px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600">✏️ Update</button>
                    <button onClick={() => deleteTasks(t)} className="bg-red-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-800">❌</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyTasks;
