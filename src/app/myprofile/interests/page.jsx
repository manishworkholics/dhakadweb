// myprofile/interests/page.jsx
"use client";

import React, { useState } from 'react';
import DashboardLayout from "../components/Layout/DashboardLayout";

// --- Mock Data ---
const mockRequests = [
    { id: 101, name: "Muskan Dhakad", city: "Indore, MP", age: 21, job: "Working", requestTime: "10:30AM, 18 May 2025", image: "https://i.pinimg.com/videos/thumbnails/originals/45/09/cc/4509cc574f238e5dd9bf42ce4c8d1749.0000000.jpg" },
    { id: 102, name: "Neha Sharma", city: "Bhopal, MP", age: 24, job: "Student", requestTime: "Yesterday", image: "https://i.pinimg.com/videos/thumbnails/originals/45/09/cc/4509cc574f238e5dd9bf42ce4c8d1749.0000000.jpg" },
    { id: 103, name: "Priya Patel", city: "Mumbai, MH", age: 28, job: "Working", requestTime: "2 days ago", image: "https://i.pinimg.com/videos/thumbnails/originals/45/09/cc/4509cc574f238e5dd9bf42ce4c8d1749.0000000.jpg" },
    { id: 104, name: "Anjali Gupta", city: "Delhi, DL", age: 26, job: "Working", requestTime: "1 week ago", image: "https://i.pinimg.com/videos/thumbnails/originals/45/09/cc/4509cc574f238e5dd9bf42ce4c8d1749.0000000.jpg" },
];

// --- New Component: Request List Item (Matches Figma Design) ---
const RequestListItem = ({ profile, type }) => (
    <div key={profile.id} className="request-list-item">
        <div className="profile-image-col">
            <img src={profile.image} alt={profile.name} className="request-profile-image" />
        </div>

        <div className="profile-details-col">
            <h5 className="request-profile-name">{profile.name}</h5>

            <p className="request-meta-info">
                <span className="meta-item">City: **{profile.city}**</span> |
                <span className="meta-item">Age: **{profile.age} Yrs**</span> |
                <span className="meta-item">Job: **{profile.job}**</span>
            </p>
            <p className="request-meta-info request-time">
                Request On: **{profile.requestTime}**
            </p>

            <button className="btn btn-sm btn-outline-secondary">View full profile</button>
        </div>

        <div className="action-buttons-col">
            {type === 'new' && (
                <>
                    <button className="btn btn-sm btn-outline-success rounded-pill px-3">Accept</button>
                    <button className="btn btn-sm btn-outline-danger rounded-pill px-4">Deny</button>
                </>
            )}
            {/* You would have different actions/styles for accepted/denied lists */}
        </div>
    </div>
);


export default function InterestsPage() {
    // Note: Tabs updated to match the Figma image: New requests, Accept request, Deny request
    const [activeTab, setActiveTab] = useState('new');

    // Mock data for accepted/denied lists (using subsets of mockRequests for demonstration)
    const acceptedRequests = mockRequests.slice(0, 2);
    const deniedRequests = mockRequests.slice(2);

    let currentProfiles = [];
    if (activeTab === 'new') currentProfiles = mockRequests;
    if (activeTab === 'accepted') currentProfiles = acceptedRequests;
    if (activeTab === 'denied') currentProfiles = deniedRequests;


    return (
        <DashboardLayout>
            <div className="interests-page-content-custom">
                <h5 className="page-header-title">INTEREST REQUEST</h5>

                {/* Tab Navigation (Customized to Figma text) */}
                <div className="interests-tabs-custom">
                    <button
                        className={`tab-button ${activeTab === 'new' ? 'active' : ''}`}
                        onClick={() => setActiveTab('new')}
                    >
                        New requests
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'accepted' ? 'active' : ''}`}
                        onClick={() => setActiveTab('accepted')}
                    >
                        Accept request
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'denied' ? 'active' : ''}`}
                        onClick={() => setActiveTab('denied')}
                    >
                        Deny request
                    </button>
                </div>

                {/* Tab Content */}
                <div className="tab-content-area-custom">
                    {currentProfiles.length > 0 ? (
                        currentProfiles.map(profile => (
                            <RequestListItem key={profile.id} profile={profile} type={activeTab} />
                        ))
                    ) : (
                        <p className="no-requests-message">No {activeTab} requests to display.</p>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}