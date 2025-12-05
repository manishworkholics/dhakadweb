// myprofile/interests/page.jsx
"use client";

import React, { useState } from 'react';
import DashboardLayout from "../components/Layout/DashboardLayout";
import Link from 'next/link';

// --- Mock Data ---
const mockRequests = [
    { id: 101, name: "Muskan Dhakad", city: "Indore, MP", age: 21, job: "Working", requestTime: "10:30AM, 18 May 2025", image: "https://images.pexels.com/photos/1580271/pexels-photo-1580271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
    { id: 102, name: "Muskan Dhakad", city: "Indore, MP", age: 21, job: "Working", requestTime: "10:30AM, 18 May 2025", image: "https://images.pexels.com/photos/1580271/pexels-photo-1580271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
    { id: 103, name: "Muskan Dhakad", city: "Indore, MP", age: 21, job: "Working", requestTime: "10:30AM, 18 May 2025", image: "https://images.pexels.com/photos/1580271/pexels-photo-1580271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
    { id: 104, name: "Muskan Dhakad", city: "Indore, MP", age: 21, job: "Working", requestTime: "10:30AM, 18 May 2025", image: "https://images.pexels.com/photos/1580271/pexels-photo-1580271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
];

// --- Custom Styles (Pink accent color) ---
const PINK_COLOR = '#e91e63';

// --- Sub-Component: Request List Item (Unchanged from previous step) ---
const RequestListItem = ({ profile, type }) => {
    const showActions = type === 'new';
    return (
        <div key={profile.id} className="align-items-start py-3 border-bottom row">
            <div className="col-lg-2 col-md-2 col-6">
                <div className="interest-image w-100 d-flex align-items-center justify-content-center" style={{ height: "125px", overflow:'hidden' }}>
                    <img
                        src={profile.image}
                        alt={profile.name}
                        className="rounded w-100 h-100"
                        style={{ objectFit: 'cover' }}
                    />
                </div>
            </div>

            <div className="col-lg-7 col-md-7 col-6">
                <h5 className="mb-1 fw-semibold text-dark">{profile.name}</h5>
                <p className="text-muted small mb-1">
                    City: <strong className="text-dark me-3">{profile.city}</strong> &bull;
                    Age: <strong className="text-dark me-3">{profile.age} Yrs</strong> &bull;
                    Job: <strong className="text-dark">{profile.job}</strong>
                </p>
                <p className="text-muted small mb-2">
                    Request On: <strong className="text-dark">{profile.requestTime}</strong>
                </p>

                <button
                    className="btn btn-sm btn-outline-secondary rounded-3 fw-medium py-1 px-2"
                    style={{ borderColor: '#cfcfcf', color: '#000000' }}
                >
                    View full profile
                </button>
            </div>

            {showActions && (
                <div className="col-lg-3 col-md-3 col-12">
                    <div className="d-flex align-items-end justify-content-between w-100">
                        <button
                            className="btn btn-sm btn-success rounded-pill px-4 fw-medium"
                            style={{ backgroundColor: '#e8f5e9', borderColor: '#4CAF50', color: '#4CAF50' }}
                        >
                            Accept
                        </button>
                        <button
                            className="btn btn-sm btn-danger rounded-pill px-4 fw-medium"
                            style={{ backgroundColor: '#ffebee', borderColor: '#f44336', color: '#f44336' }}
                        >
                            Deny
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};


export default function InterestsPage() {
    const [mainTab, setMainTab] = useState('received');
    const [activeSubTab, setActiveSubTab] = useState('new');

    const acceptedRequests = mockRequests.slice(0, 0);
    const deniedRequests = mockRequests.slice(0, 0);

    let currentProfiles = [];
    if (activeSubTab === 'new') currentProfiles = mockRequests;
    if (activeSubTab === 'accepted') currentProfiles = acceptedRequests;
    if (activeSubTab === 'denied') currentProfiles = deniedRequests;

    // Custom class for nav-link styling when active, forcing the pink border
    const activeNavLinkStyle = {
        color: '#d4ac4a',
        borderColor: `${'#CFCFCF'} ${'#CFCFCF'} white ${'#CFCFCF'}`,
        borderBottomColor: 'white', // Ensure the bottom is hidden by the content border-top
    };

    return (
        <DashboardLayout>
            <div className="p-4">

                {/* 1. Main Tab Navigation (Interests Received / Interests Sent) */}
                <div className="d-flex mb-4">
                    <button
                        className={`btn btn-sm ${mainTab === 'received' ? 'btn-danger' : 'btn-outline-danger'} rounded-3 me-3 fw-medium py-1 px-2`}
                        onClick={() => setMainTab('received')}
                        style={{
                            backgroundColor: mainTab === 'received' ? '#fff' : 'transparent',
                            borderColor: '#cfcfcf',
                            color: mainTab === 'received' ? 'black' : black
                        }}
                    >
                        Interests Received
                    </button>
                    <button
                        className={`btn btn-sm ${mainTab === 'sent' ? 'btn-danger' : 'btn-outline-danger'} rounded-3 fw-medium py-1 px-2`}
                        onClick={() => setMainTab('sent')}
                        style={{
                            backgroundColor: mainTab === 'sent' ? PINK_COLOR : 'transparent',
                            borderColor: '#cfcfcf',
                            color: mainTab === 'sent' ? 'white' : '#000000'
                        }}
                    >
                        Interests Sent
                    </button>
                </div>

                {/* 2. Content Card (White box containing sub-tabs and list) */}
                <div className="card shadow-sm p-4">

                    {/* Sub Tab Navigation (New, Accept, Deny) - Using standard Bootstrap Nav Tabs */}
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <Link
                                className={`nav-link text-decoration-none ${activeSubTab === 'new' ? 'active' : ''}`}
                                style={activeSubTab === 'new' ? activeNavLinkStyle : {}}
                                href="#"
                                onClick={(e) => { e.preventDefault(); setActiveSubTab('new'); }}
                            >
                                New requests
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link text-decoration-none text-767676 ${activeSubTab === 'accepted' ? 'active' : ''}`}
                                style={activeSubTab === 'accepted' ? activeNavLinkStyle : {}}
                                href="#"
                                onClick={(e) => { e.preventDefault(); setActiveSubTab('accepted'); }}
                            >
                                Accept request
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link text-decoration-none text-767676 ${activeSubTab === 'denied' ? 'active' : ''}`}
                                style={activeSubTab === 'denied' ? activeNavLinkStyle : {}}
                                href="#"
                                onClick={(e) => { e.preventDefault(); setActiveSubTab('denied'); }}
                            >
                                Deny request
                            </Link>
                        </li>
                    </ul>

                    {/* Tab Content: List of Requests */}
                    <div className="request-list-container">
                        {mainTab === 'received' && currentProfiles.length > 0 ? (
                            currentProfiles.map(profile => (
                                <RequestListItem key={profile.id} profile={profile} type={activeSubTab} />
                            ))
                        ) : (
                            <p className="text-center py-5 text-muted">
                                {mainTab === 'received'
                                    ? `No ${activeSubTab} interests received to display.`
                                    : "No interests sent to display."
                                }
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}