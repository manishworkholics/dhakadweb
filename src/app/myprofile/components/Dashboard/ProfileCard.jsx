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
                    <span className="location-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="13" viewBox="0 0 10 13" fill="none">
                            <path d="M5 0C2.24315 0 5.09024e-05 2.33285 5.09024e-05 5.19675C-0.0180739 9.386 4.81 12.8596 5 13C5 13 10.0181 9.386 9.99995 5.2C9.99995 2.33285 7.75685 0 5 0ZM5 7.8C3.61876 7.8 2.50003 6.6365 2.50003 5.2C2.50003 3.7635 3.61876 2.6 5 2.6C6.38124 2.6 7.49998 3.7635 7.49998 5.2C7.49998 6.6365 6.38124 7.8 5 7.8Z" fill="#4CAF50" />
                        </svg>
                    </span>
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