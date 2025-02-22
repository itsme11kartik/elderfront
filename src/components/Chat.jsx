import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Navbar from "./navbar";

const socket = io("https://elderback.onrender.com", {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
});

socket.on("connect", () => {
  console.log("Connected to WebSocket server!");
});

socket.on("connect_error", (err) => {
  console.error("WebSocket connection error:", err.message);
});

const Chat = ({ username, userType }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    socket.emit("fetchMessages");

    socket.on("loadMessages", (loadedMessages) => {
      setMessages(loadedMessages);
    });

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("loadMessages");
      socket.off("receiveMessage");
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() !== "") {
      const newMessage = { username, text: input };
      socket.emit("sendMessage", newMessage);
      setInput("");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Navbar username={username} userType={userType} />
      <div className="flex-grow flex flex-col p-4 max-w-2xl mx-auto w-full">
        <h2 className="text-2xl font-semibold text-center text-blue-700 mb-4">
          Family & Volunteer Chat
        </h2>
        
        {/* Chat messages container */}
        <div className="flex-grow bg-white p-4 rounded-lg shadow-md overflow-y-auto h-96 border border-gray-300">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex mb-2 ${msg.username === username ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-3 max-w-xs rounded-lg shadow-md text-sm ${
                  msg.username === username
                    ? "bg-blue-500 text-white self-end"
                    : "bg-gray-200 text-black self-start"
                }`}
              >
                <strong className="block text-xs text-gray-600 mb-1">
                  {msg.username}
                </strong>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        {/* Input field */}
        <div className="mt-2 flex items-center bg-white p-2 rounded-lg shadow-md border border-gray-300">
          <input
            type="text"
            className="flex-grow p-2 border-none focus:outline-none"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
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
