// myprofile/pages/Notification.jsx
"use client";

import React from 'react';
import DashboardLayout from "../components/Layout/DashboardLayout";

// --- Mock Data ---
const mockNotifications = [
    { 
        id: 1, 
        type: "interest", 
        message: "Neha Dhakad has expressed interest in your profile.", 
        time: "1 hour ago", 
        link: "/myprofile/interests" 
    },
    { 
        id: 2, 
        type: "message", 
        message: "You received a new message from Muskan Dhakad.", 
        time: "3 hours ago", 
        link: "/myprofile/chatlist" 
    },
    { 
        id: 3, 
        type: "view", 
        message: "Your profile was viewed by a Gold Member today.", 
        time: "Yesterday", 
        link: "/myprofile/profile-views" 
    },
    { 
        id: 4, 
        type: "plan", 
        message: "Your premium subscription has been successfully renewed.", 
        time: "2 days ago", 
        link: "/myprofile/plan" 
    },
    { 
        id: 5, 
        type: "interest", 
        message: "Priya Dhakad sent you a connection request.", 
        time: "1 week ago", 
        link: "/myprofile/interests" 
    },
];

// Helper function to get an icon based on notification type
const getIcon = (type) => {
    switch (type) {
        case 'interest': return '❤️';
        case 'message': return '✉️';
        case 'view': return '👁️';
        case 'plan': return '✨';
        default: return 'ℹ️';
    }
};

export default function NotificationPage() {
    return (
        <DashboardLayout>
            <div className="notification-page-content">
                <h2 className="page-header-title">Notifications</h2>

                <div className="notification-list">
                    {mockNotifications.map(notification => (
                        <a 
                            key={notification.id} 
                            href={notification.link} 
                            className={`notification-item ${notification.type}`}
                        >
                            <div className="notification-icon-wrapper">
                                <span className="notification-icon">{getIcon(notification.type)}</span>
                            </div>
                            <div className="notification-details">
                                <p className="notification-message">{notification.message}</p>
                                <span className="notification-time">{notification.time}</span>
                            </div>
                            <span className="go-to-arrow">&gt;</span>
                        </a>
                    ))}
                </div>
                
                {mockNotifications.length === 0 && (
                    <div className="no-notifications-message">
                        <p>You currently have no new notifications.</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}