// myprofile/page.js (This serves as the main Dashboard page for the /myprofile route)
"use client";

import React from "react";
// 1. Import Layout
import DashboardLayout from "./components/Layout/DashboardLayout"; 
// NOTE: We don't import Sidebar here, as it's included inside DashboardLayout.

// 2. Import Dashboard Widgets & Shared Components
import ProfileCompleteness from "./components/Dashboard/ProfileCompleteness";
import PaidMembershipCard from "./components/Dashboard/PaidMembershipCard";
import RecentChatList from "./components/Dashboard/RecentChatList";
import ProfileCard from "./components/Dashboard/ProfileCard";
import ViewAllButton from "./components/Shared/ViewAllButton";

// --- Mock Data for Demonstration ---
const mockMatches = [
    { id: 1, name: "Muskan Dhakad", location: "Indore, MP", image: "https://images.pexels.com/photos/1580271/pexels-photo-1580271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
    { id: 2, name: "Neha Dhakad", location: "Indore, MP", image: "https://images.pexels.com/photos/1580271/pexels-photo-1580271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
    { id: 3, name: "Priya Dhakad", location: "Indore, MP", image: "https://images.pexels.com/photos/1580271/pexels-photo-1580271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
    { id: 4, name: "Muskan Dhakad", location: "Indore, MP", image: "https://images.pexels.com/photos/1580271/pexels-photo-1580271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
];

export default function MyProfileDashboard() {
    return (
        <DashboardLayout>
            {/* The content below renders inside the main column (col-md-9) of the DashboardLayout */}
            <div className="dashboard-content-main">
                
                {/* 1. NEW PROFILES MATCHES Section */}
                <div className="section dashboard-section new-matches">
                    <h3 className="section-title">NEW PROFILES MATCHES (45)</h3>
                    <div className="card-grid-4"> 
                        {mockMatches.map(match => (
                            // Using the ProfileCard component
                            <ProfileCard key={`new-${match.id}`} data={match} />
                        ))}
                    </div>
                    {/* The View All Button is used here */}
                    <div className="view-all-wrapper">
                        <ViewAllButton label="View All" href="/matches/new" />
                    </div>
                </div>

                {/* 2. PROFILES STATUS / PAID MEMBER / CHAT LIST (Three-Column Row) */}
                <div className="section dashboard-section status-row-grid">
                    
                    {/* 2a. Profiles Status */}
                    <div className="status-item profile-status-wrap">
                        <h3 className="section-title">PROFILES STATUS</h3>
                        <ProfileCompleteness percentage={60} />
                    </div>
                    
                    {/* 2b. Paid Membership CTA */}
                    <div className="status-item membership-wrap">
                        <h3 className="section-title">BECOME A PAID MEMBER</h3>
                        <PaidMembershipCard />
                    </div>
                    
                    {/* 2c. Recent Chat List */}
                    <div className="status-item chat-list-wrap">
                        <h3 className="section-title">RECENT CHAT LIST</h3>
                        <RecentChatList />
                    </div>

                </div>

                {/* 3. PROFILES YOU VIEWED Section */}
                <div className="section dashboard-section viewed-profiles">
                    <h3 className="section-title">PROFILES YOU VIEWED (22)</h3>
                    <div className="card-grid-4">
                        {mockMatches.slice(0, 4).map(profile => (
                            // Reusing the ProfileCard component
                            <ProfileCard key={`viewed-${profile.id}`} data={profile} />
                        ))}
                    </div>
                    {/* The View All Button is used here */}
                    <div className="view-all-wrapper">
                         <ViewAllButton label="View All" href="/profiles/viewed" />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

// NOTE: Ensure the CSS classes used here (e.g., .card-grid-4, .status-row-grid) 
// are defined in your global or dashboard-specific stylesheet.