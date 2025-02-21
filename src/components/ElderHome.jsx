import Navbar from "./navbar";

function ElderHome({ username,userType }) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar username={username}  userType={userType}/>

      
      <div className="max-w-4xl mx-auto p-6 space-y-6">

        
        <div className="bg-white p-5 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold">Good Morning, {username}! ☀️</h2>
          <p className="text-gray-600 mt-2">Here’s your daily summary:</p>
          <ul className="text-gray-700 mt-2">
            <li>2 Tasks Completed</li>
            <li>1 Missed Reminder</li>
            <li>1 Pending Grocery Order</li>
          </ul>
        </div>

        
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">📅 Today's Tasks & Medications</h3>
          <ul className="space-y-2">
            <li className="bg-green-100 p-3 rounded-md">💊 Take Blood Pressure Medicine - 9:00 AM </li>
            <li className="bg-yellow-100 p-3 rounded-md">🏥 Doctor Appointment - 2:00 PM </li>
            <li className="bg-red-100 p-3 rounded-md">🛒 Grocery Shopping - 5:00 PM </li>
          </ul>
        </div>

        
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">🛍️ Grocery Requests</h3>
          <p className="text-gray-600">You have a pending request for groceries.</p>
          <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg">View Order</button>
        </div>

        
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">🤝 Volunteer Help</h3>
          <p className="text-gray-600">Need assistance? Request a volunteer for help.</p>
          <button className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg">Request Help</button>
        </div>

        
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">💬 Chat with Family & Volunteers</h3>
          <p className="text-gray-600">Stay connected with your loved ones.</p>
          <button className="mt-3 px-4 py-2 bg-purple-500 text-white rounded-lg">Open Chat</button>
        </div>

        
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">📊 Health & Activity</h3>
          <p className="text-gray-600">Your daily progress:</p>
          <ul className="text-gray-700 mt-2">
            <li>🏃 Steps: 4,500</li>
            <li>💤 Sleep: 7 hrs</li>
            <li>🔥 Calories Burned: 300 kcal</li>
          </ul>
        </div>

        
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">🌍 Community Forum</h3>
          <p className="text-gray-600">Engage with other elderly users.</p>
          <button className="mt-3 px-4 py-2 bg-orange-500 text-white rounded-lg">Join Discussion</button>
        </div>

        
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">🎙️ Voice Command</h3>
          <p className="text-gray-600">Speak to add or check tasks.</p>
          <button className="mt-3 px-4 py-2 bg-indigo-500 text-white rounded-lg">Use Voice</button>
        </div>

        
        <div className="fixed bottom-5 right-5">
          <button className="bg-red-500 text-white px-6 py-3 rounded-full shadow-lg text-lg">🚨 SOS</button>
        </div>

      </div>
    </div>
  );
}

export default ElderHome;
