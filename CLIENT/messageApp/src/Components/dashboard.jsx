import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import styles from "../stayles/dashbord.module.css";

const ChatDashboard = () => {
  const authentication = useSelector((state) => state.authentication); // Access Redux state
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  const handleContactClick = async (contact) => {
    setSelectedContact(contact);
    try {
      const userId = authentication.user._id; // Extract user ID
      const contactId = contact._id;         // Extract contact ID
      const token = authentication.token;    // Get the token

      // Include the token in the Authorization header
      const messageResponses = await Promise.all([
        axios.get(`http://localhost:8000/api/v1/user/${userId}/message/${contactId}`, {
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the token here
          },
          withCredentials: true,
        }),
        axios.get(`http://localhost:8000/api/v1/user/${contactId}/message/${userId}`, {
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the token here
          },
          withCredentials: true,
        }),
      ]);

      const allMessages = messageResponses.flatMap((response) => response.data.messages);
      allMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // Sort by date
      setMessages(allMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;

    const newMessage = {
      _id: Date.now(),
      message: messageText,
      createdBy: authentication.user._id,
      createdFor: selectedContact._id,
      createdAt: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessageText("");

    try {
      await axios.post(
        `http://localhost:8000/api/v1/user/${authentication.user._id}/message/${selectedContact._id}`,
        {
          message: messageText,
          createdBy: authentication.user._id,
          createdFor: selectedContact._id,
        },
        {
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${authentication.token}`, // Add the token here
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== newMessage._id));
    }
  };



  return (
    <div className={styles.container}>
      {/* Navigation Panel */}
      <div className={styles.navPanel}>
        <div className={styles.navPanelHeader}>
          <span>Contacts</span>
          <img src="/defaultface.png" alt="Profile" className={styles.profileImage} />
        </div>
        <button className={styles.addContact}>Add Contact</button>
        <div className={styles.favorites}>Favorites</div>
        <div className={styles.contactList}>
          {authentication.user.contacts.map((contact) => (
            <div
              key={contact._id}
              className={styles.contact}
              onClick={() => handleContactClick(contact)}
            >
              <img src="/defaultface.png" alt={contact.name} />
              <div>{contact.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className={styles.chatWindow}>
        {selectedContact ? (
          <>
            <div className={styles.chatHeader}>{selectedContact.name}</div>
            <div className={styles.chatMessages}>
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`${styles.message} ${
                    msg.createdBy === authentication.user._id ? styles.sent : styles.received
                  }`}
                >
                  {msg.message}
                </div>
              ))}
            </div>
            <div className={styles.inputArea}>
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </>
        ) : (
          <div className={styles.chatHeader}>Select a contact to start chatting</div>
        )}
      </div>
    </div>
  );
};

export default ChatDashboard;
