// myprofile/components/Dashboard/ProfileCard.jsx
"use client";

import React from 'react';
// Assuming 'data' is passed as a prop, containing the profile details

export default function ProfileCard({ data }) {
    // Destructure properties from the data prop
    const { name, location, image } = data; 
    
    // Fallback image if data is missing
    const profileImage = image || '/path/to/default-profile.jpg'; 

    return (
        <div className="profile-card">
            {/* The main profile image */}
            <div className="profile-image-wrapper">
                <img 
                    src={profileImage} 
                    alt={`Profile of ${name}`} 
                    className="profile-photo"
                />
            </div>

            {/* Profile details at the bottom */}
            <div className="profile-details">
                <h5 className="profile-name">{name}</h5>
                <p className="profile-location">
                    {/* Placeholder for a location icon (e.g., FontAwesome or similar) */}
                    <span className="location-icon">📍</span> 
                    {location}
                </p>
            </div>
            {/* Optional: Add a subtle overlay/button for quick action like "Connect" or "View" */}
            <div className="profile-overlay">
                <button className="view-profile-btn">View Profile</button>
            </div>
        </div>
    );
}