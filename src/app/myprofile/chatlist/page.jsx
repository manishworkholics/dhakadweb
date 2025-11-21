// myprofile/pages/ChatList.jsx
"use client";

import React, { useState } from 'react';
import DashboardLayout from "../components/Layout/DashboardLayout";

// --- Mock Data ---
const mockConversations = [
    { id: 1, name: "Muskan Dhakad", status: "online", image: "https://i.pinimg.com/videos/thumbnails/originals/45/09/cc/4509cc574f238e5dd9bf42ce4c8d1749.0000000.jpg", lastMessage: "Hello, I saw your profile!", time: "10:30 AM" },
    { id: 2, name: "Neha Sharma", status: "offline", image: "https://i.pinimg.com/videos/thumbnails/originals/45/09/cc/4509cc574f238e5dd9bf42ce4c8d1749.0000000.jpg", lastMessage: "Let's talk soon.", time: "Yesterday" },
    { id: 3, name: "Priya Patel", status: "online", image: "https://i.pinimg.com/videos/thumbnails/originals/45/09/cc/4509cc574f238e5dd9bf42ce4c8d1749.0000000.jpg", lastMessage: "Sent you my portfolio.", time: "11:00 AM" },
];

const mockMessages = [
    { id: 1, text: "Hi! Your profile is very impressive.", sender: "other", time: "10:30 AM" },
    { id: 2, text: "Thank you! I appreciate that. I enjoyed yours too.", sender: "self", time: "10:35 AM" },
    { id: 3, text: "Great! What do you do for work?", sender: "other", time: "10:40 AM" },
    { id: 4, text: "I'm a software engineer at Google. You?", sender: "self", time: "10:45 AM" },
];

// --- Sub-Components ---

// Component for the left panel: List of all chats
const ConversationList = ({ conversations, activeChatId, onSelectChat }) => (
    <div className="conversation-list-panel">
        <div className="chat-search">
            <input type="text" placeholder="Search chats..." className="search-input" />
        </div>
        {conversations.map(conv => (
            <div 
                key={conv.id}
                className={`conversation-item ${conv.id === activeChatId ? 'active' : ''}`}
                onClick={() => onSelectChat(conv.id)}
            >
                <div className={`avatar-status ${conv.status}`}>
                    <img src={conv.image} alt={conv.name} className="conv-avatar" />
                </div>
                <div className="conv-details">
                    <h5 className="conv-name">{conv.name}</h5>
                    <p className="conv-message">{conv.lastMessage}</p>
                </div>
                <span className="conv-time">{conv.time}</span>
            </div>
        ))}
    </div>
);

// Component for the right panel: Active chat window
const ChatWindow = ({ activeConversation, messages }) => {
    if (!activeConversation) {
        return (
            <div className="chat-window-panel chat-empty">
                <p>Select a match to start chatting.</p>
            </div>
        );
    }
    
    return (
        <div className="chat-window-panel">
            {/* Chat Header */}
            <div className="chat-header">
                <h4 className="chat-partner-name">{activeConversation.name}</h4>
                <span className={`chat-partner-status ${activeConversation.status}`}>{activeConversation.status}</span>
            </div>
            
            {/* Messages Area */}
            <div className="messages-container">
                {messages.map(msg => (
                    <div key={msg.id} className={`message-bubble ${msg.sender}`}>
                        <p className="message-text">{msg.text}</p>
                        <span className="message-time">{msg.time}</span>
                    </div>
                ))}
            </div>
            
            {/* Input Footer */}
            <div className="chat-input-footer">
                <input type="text" placeholder="Type a message..." className="message-input" />
                <button className="send-btn">Send</button>
            </div>
        </div>
    );
};

// --- Main ChatList Component ---

export default function ChatListPage() {
    const [activeChatId, setActiveChatId] = useState(mockConversations[0]?.id);
    const activeConversation = mockConversations.find(conv => conv.id === activeChatId);

    return (
        <DashboardLayout>
            <div className="chat-list-page-container">
                
                {/* 1. Conversation List (Left Panel) */}
                <ConversationList 
                    conversations={mockConversations} 
                    activeChatId={activeChatId} 
                    onSelectChat={setActiveChatId}
                />

                {/* 2. Active Chat Window (Right Panel) */}
                <ChatWindow 
                    activeConversation={activeConversation} 
                    messages={mockMessages} 
                />
            </div>
        </DashboardLayout>
    );
}