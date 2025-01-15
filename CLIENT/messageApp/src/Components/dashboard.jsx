import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ChatDashboard = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [activeTab, setActiveTab] = useState("contacts"); // For switching between tabs

  const contacts = [
    { id: 1, name: "John Doe", profileImg: "/defaultface.png" },
    { id: 2, name: "Jane Smith", profileImg: "/defaultface.png" },
    { id: 3, name: "Bob Johnson", profileImg: "/defaultface.png" },
  ];

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setMessages([
      { id: 1, text: "Hello!", sender: contact.name },
      { id: 2, text: "How are you?", sender: contact.name },
    ]);
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessages([...messages, { id: Date.now(), text: messageText, sender: "You" }]);
      setMessageText("");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column flex-md-row">
      {/* Navigation Panel */}
      <div className="col-12 col-md-3 bg-light d-flex flex-column">
        {/* Top Navigation */}
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-white">
          <div className="d-flex align-items-center">
            <img
              src="/defaultface.png"
              alt="Profile"
              className="rounded-circle me-2"
              style={{ width: "40px", height: "40px" }}
            />
            <h6 className="mb-0">Profile</h6>
          </div>
          <button className="btn btn-outline-primary btn-sm">+ Add Contact</button>
        </div>

        {/* Navigation Tabs */}
        <div className="d-flex justify-content-around p-2 border-bottom bg-light">
          <button
            className={`btn btn-link text-dark ${activeTab === "contacts" ? "fw-bold" : ""}`}
            onClick={() => setActiveTab("contacts")}
          >
            Contacts
          </button>
          <button
            className={`btn btn-link text-dark ${activeTab === "favorites" ? "fw-bold" : ""}`}
            onClick={() => setActiveTab("favorites")}
          >
            Favorites
          </button>
        </div>

        {/* Contacts List */}
        <div className="contacts-list p-2 flex-grow-1 overflow-auto">
          {activeTab === "contacts" && (
            <>
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="d-flex align-items-center p-2 mb-2 bg-white shadow-sm rounded"
                  onClick={() => handleContactClick(contact)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={contact.profileImg}
                    alt={contact.name}
                    className="rounded-circle me-3"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div>
                    <h6 className="mb-0">{contact.name}</h6>
                    <small className="text-muted">Click to chat</small>
                  </div>
                </div>
              ))}
            </>
          )}
          {activeTab === "favorites" && <div className="p-2">No favorites yet!</div>}
        </div>
      </div>

      {/* Chat Window */}
      <div className="col-12 col-md-9 d-flex flex-column">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="border-bottom p-3 d-flex align-items-center">
              <img
                src={selectedContact.profileImg}
                alt={selectedContact.name}
                className="rounded-circle me-3"
                style={{ width: "50px", height: "50px" }}
              />
              <h5 className="mb-0">{selectedContact.name}</h5>
            </div>

            {/* Messages */}
            <div className="messages flex-grow-1 p-3 bg-light overflow-auto">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`d-flex mb-3 ${msg.sender === "You" ? "justify-content-end" : ""}`}
                >
                  <div
                    className={`p-2 rounded ${
                      msg.sender === "You" ? "bg-primary text-white" : "bg-secondary text-white"
                    }`}
                  >
                    <small>{msg.sender}</small>
                    <div>{msg.text}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-3 border-top">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleSendMessage}>
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-grow-1 d-flex align-items-center justify-content-center">
            <h5>Select a contact to start chatting</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatDashboard;
