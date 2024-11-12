import React, { useEffect, useState } from "react";
import axios from "axios";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  // Fetch messages from the backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:3001/messages");
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Messages</h2>
      <div className="space-y-4">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <p className="text-gray-700 font-semibold">From: {message.email}</p>
              <h3 className="text-lg font-semibold text-gray-800 mt-2">Title: {message.subject}</h3>
              <p className="text-gray-600 mt-1">Message: {message.message}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No messages available</p>
        )}
      </div>
    </div>
  );
};

export default Messages;
