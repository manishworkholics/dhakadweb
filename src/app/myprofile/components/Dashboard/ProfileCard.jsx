// myprofile/components/Dashboard/ProfileCard.jsx
"use client";

import React from 'react';
import Link from "next/link";
// Assuming 'data' is passed as a prop, containing the profile details

export default function ProfileCard({ data }) {
    // Destructure properties from the data prop
    const { name, location, photos, _id } = data;

    // Fallback image if data is missing
    const profileImage = photos?.[0] || '/dhakadweb/assets/images/dummy.png';

    return (
        <Link
            href={`/profiledetail/${_id}`}
            style={{ textDecoration: "none" }}
        >
            <div className="profile-card">
                {/* The main profile image */}
                <div className="profile-image-wrapper">
                    <img
                        src={profileImage}
                        alt={`Profile of ${name}`}
                        className="profile-photo rounded-3" />

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
                        <i className="fa-solid fa-location-dot text-4CAF50 me-1"></i>
                        {location}
                    </p>
                </div>

            </div>
        </Link>
    );
}