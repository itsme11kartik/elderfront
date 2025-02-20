import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Navbar from "./navbar";

const socket = io("http://localhost:8000", {
    transports: ["websocket"],  // Force WebSocket
    reconnection: true, // Reconnect on failure
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
  });
  socket.on("connect", () => {
    console.log("Connected to WebSocket server!");
  });
  
  socket.on("connect_error", (err) => {
    console.error("WebSocket connection error:", err.message);
  });

const Chat = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Request previous messages when component mounts
    socket.emit("fetchMessages");

    // Listen for messages from backend
    socket.on("loadMessages", (loadedMessages) => {
      setMessages(loadedMessages);
    });

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup event listeners on unmount
    return () => {
      socket.off("loadMessages");
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() !== "") {
      const newMessage = { username, text: input };
      socket.emit("sendMessage", newMessage);
      setInput("");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar username={username} />
      <div className="flex-grow flex flex-col p-4 bg-gray-100">
        <h2 className="text-xl font-semibold text-blue-700 text-center">
          Family & Volunteer Chat
        </h2>

        {/* Chat messages */}
        <div className="flex-grow bg-white p-4 rounded-lg shadow-md overflow-y-auto mt-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 my-1 max-w-xs rounded-lg ${
                msg.username === username
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-200 text-black self-start"
              }`}
            >
              <strong>{msg.username}: </strong> {msg.text}
            </div>
          ))}
        </div>

        {/* Input field */}
        <div className="mt-2 flex items-center">
          <input
            type="text"
            className="flex-grow p-2 border rounded-l-lg focus:outline-none"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
