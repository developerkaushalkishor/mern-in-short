import React, { useState, useEffect } from "react";
import axios from "axios"; // is use for making http request

const MessageManager = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [currentId, setCurrentId] = useState(null);

  const fetchMessages = async () => {
    const response = await axios.get("http://localhost:5000/messages");
    setMessages(response.data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleAddMessage = async () => {
    if (newMessage) {
      await axios.post("http://localhost:5000/messages", {
        content: newMessage,
      });
      setNewMessage("");
      fetchMessages();
    }
  };

  const handleUpdateMessage = async (id) => {
    if (updateMessage) {
      await axios.put(`http://localhost:5000/messages/${id}`, {
        content: updateMessage,
      });
      setUpdateMessage("");
      setCurrentId(null);
      fetchMessages();
    }
  };

  const handleDeleteMessage = async (id) => {
    await axios.delete(`http://localhost:5000/messages/${id}`);
    fetchMessages();
  };

  return (
    <div>
      <h1>Message Manager</h1>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Add a new message"
      />
      <button onClick={handleAddMessage}>Add Message</button>

      <ul>
        {messages.map((msg) => (
          <li key={msg._id}>
            {currentId === msg._id ? (
              <>
                <input
                  type="text"
                  value={updateMessage}
                  onChange={(e) => setUpdateMessage(e.target.value)}
                  placeholder="Update message"
                />
                <button onClick={() => handleUpdateMessage(msg._id)}>
                  Update
                </button>
              </>
            ) : (
              <>
                {msg.content}
                <button
                  onClick={() => {
                    setCurrentId(msg._id);
                    setUpdateMessage(msg.content);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteMessage(msg._id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageManager;
