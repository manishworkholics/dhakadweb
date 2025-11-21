// myprofile/components/Dashboard/RecentChatList.jsx
"use client";

import React from 'react';

// Mock data to simulate the chat list entries
const mockChats = [
    { id: 1, name: "Muskan Dhakad", location: "Indore, MP", image: "https://images.pexels.com/photos/1580271/pexels-photo-1580271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
    { id: 2, name: "Muskan Dhakad", location: "Indore, MP", image: "https://images.pexels.com/photos/1580271/pexels-photo-1580271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
    { id: 3, name: "Muskan Dhakad", location: "Indore, MP", image: "https://images.pexels.com/photos/1580271/pexels-photo-1580271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
    { id: 4, name: "Muskan Dhakad", location: "Indore, MP", image: "https://images.pexels.com/photos/1580271/pexels-photo-1580271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
    { id: 5, name: "Muskan Dhakad", location: "Indore, MP", image: "https://images.pexels.com/photos/1580271/pexels-photo-1580271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
];

export default function RecentChatList() {
    return (
        <div className="recent-chat-list-card">
            <ul className="chat-list">
                {mockChats.map((chat) => (
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
                                <span className="location-dot">•</span>
                                {chat.location}
                            </p>
                        </div>
                        
                        {/* Status/Arrow Placeholder */}
                        <div className="chat-status-arrow">
                            {/* You might use an icon here, e.g., > or an arrow icon */}
                            &gt;
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}