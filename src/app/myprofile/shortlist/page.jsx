// myprofile/pages/Shortlist.jsx
"use client";

import React, { useState } from 'react';
import DashboardLayout from "../components/Layout/DashboardLayout";
import ProfileCard from "../components/Dashboard/ProfileCard"; // Reuse the card component

// --- Mock Data ---
const mockShortlistedProfiles = [
    { id: 301, name: "Rahul Kushwah", location: "Mumbai, MH", image: "https://i.pinimg.com/videos/thumbnails/originals/45/09/cc/4509cc574f238e5dd9bf42ce4c8d1749.0000000.jpg" },
    { id: 302, name: "Sneha Goyal", location: "Jaipur, RJ", image: "https://i.pinimg.com/videos/thumbnails/originals/45/09/cc/4509cc574f238e5dd9bf42ce4c8d1749.0000000.jpg" },
    { id: 303, name: "Amit Soni", location: "Chennai, TN", image: "https://i.pinimg.com/videos/thumbnails/originals/45/09/cc/4509cc574f238e5dd9bf42ce4c8d1749.0000000.jpg" },
    { id: 304, name: "Divya Verma", location: "Kolkata, WB", image: "https://i.pinimg.com/videos/thumbnails/originals/45/09/cc/4509cc574f238e5dd9bf42ce4c8d1749.0000000.jpg" },
    { id: 305, name: "Pranav Singh", location: "Hyderabad, TS", image: "https://i.pinimg.com/videos/thumbnails/originals/45/09/cc/4509cc574f238e5dd9bf42ce4c8d1749.0000000.jpg" },
    // Add more profiles as needed
];

export default function ShortlistPage() {
    const [shortlist, setShortlist] = useState(mockShortlistedProfiles);

    const handleRemove = (profileId) => {
        // Simple client-side removal for demonstration
        setShortlist(shortlist.filter(p => p.id !== profileId));
        // In a real app, you would call an API here
        console.log(`Removed profile ${profileId} from shortlist.`);
    };

    return (
        <DashboardLayout>
            <div className="shortlist-page-content">
                <h2 className="page-header-title">My Shortlisted Profiles ({shortlist.length})</h2>

                {shortlist.length > 0 ? (
                    <div className="shortlist-profile-grid">
                        {shortlist.map(profile => (
                            <div key={profile.id} className="shortlist-card-wrapper">
                                <ProfileCard data={profile} />
                                
                                {/* Action Bar below the card */}
                                <div className="shortlist-actions">
                                    <button 
                                        className="action-btn message-btn"
                                        onClick={() => console.log(`Open chat with ${profile.name}`)}
                                    >
                                        Message
                                    </button>
                                    <button 
                                        className="action-btn remove-btn"
                                        onClick={() => handleRemove(profile.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-shortlist-message">
                        <p>You haven't shortlisted any profiles yet.</p>
                        <a href="/search" className="browse-link">Start browsing matches!</a>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}