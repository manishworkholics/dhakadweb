// myprofile/components/Dashboard/RecentChatList.jsx
"use client";

import React from 'react';

// Mock data to simulate the chat list entries
const mockChats = [
    { id: 1, name: "Muskan Dhakad 1", location: "Indore, MP", image: "https://images.pexels.com/photos/1580271/pexels-photo-1580271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
    { id: 2, name: "Muskan Dhakad 2", location: "Indore, MP", image: "https://images.pexels.com/photos/1580271/pexels-photo-1580271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
    { id: 3, name: "Muskan Dhakad 3", location: "Indore, MP", image: "https://images.pexels.com/photos/1580271/pexels-photo-1580271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
    { id: 4, name: "Muskan Dhakad 4", location: "Indore, MP", image: "https://images.pexels.com/photos/1580271/pexels-photo-1580271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
    { id: 5, name: "Muskan Dhakad 5", location: "Indore, MP", image: "https://images.pexels.com/photos/1580271/pexels-photo-1580271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
];

// Define the maximum number of chats to display
const MAX_CHATS_DISPLAY = 4;

export default function RecentChatList() {
    // Use .slice(0, MAX_CHATS_DISPLAY) to get only the first 4 elements
    const chatsToDisplay = mockChats.slice(0, MAX_CHATS_DISPLAY);

    return (
        <div className="recent-chat-list-card">
            <ul className="chat-list py-1">
                {chatsToDisplay.map((chat) => (
                    <li key={chat.id} className="chat-item">
                        {/* Profile Image */}
                        <div className="chat-avatar-wrapper">
                            <img 
                                src={chat.image} 
                                alt={chat.name} 
                                className="chat-avatar"
                            />
                        </div>

                        {/* Name and Location */}
                        <div className="chat-info">
                            <h6 className="chat-name">{chat.name}</h6>
                            <p className="chat-location">
                                {/* Using a simple dot/circle placeholder for location */}
                               <i className="fa-solid fa-location-dot text-4CAF50 me-1"></i>
                                {chat.location}
                            </p>
                        </div>
                        
                        {/* Status/Arrow Placeholder - Removed for brevity, use as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
}