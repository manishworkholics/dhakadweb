// myprofile/pages/Dashboard.jsx (The Final Assembly)
"use client";

import React, { useEffect, useState } from 'react';
// 1. Import Layout
import DashboardLayout from "../components/Layout/DashboardLayout";

// 2. Import Widgets & Shared Components
import ProfileCompleteness from "../components/Dashboard/ProfileCompleteness";
import PaidMembershipCard from "../components/Dashboard/PaidMembershipCard";
import RecentChatList from "../components/Dashboard/RecentChatList";
import ProfileCard from "../components/Dashboard/ProfileCard";
import ViewAllButton from "../components/Shared/ViewAllButton"; // <-- Your new button!


// --- Mock Data (As used previously) ---
const mockMatches = [
    { id: 1, name: "Muskan Dhakad", location: "Indore, MP", image: "/images/match1.jpg" },
    { id: 2, name: "Nehaa Dhakad", location: "Indore, MP", image: "/images/match2.jpg" },
    { id: 3, name: "Priya Dhakad", location: "Indore, MP", image: "/images/match3.jpg" },
    { id: 4, name: "Muskan Dhakad", location: "Indore, MP", image: "/images/match4.jpg" },
];

// --- Main Dashboard Page Component ---




export default function DashboardPage() {

    const [profile, setProfile] = useState(null);

    const [userId, setUserId] = useState(null);
    const token = localStorage.getItem("token");
    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUserId(JSON.parse(userData)._id);
        }
    }, []);


    const fetchProfile = async () => {
        try {
            const res = await fetch(
                `http://143.110.244.163:5000/api/profile/own-profile/${userId}`, { headers: { Authorization: `Bearer ${token}` }, }
            );
            const data = await res.json();

            setProfile(data.profile);
        } catch (error) {
            console.log("Profile fetch error:", error);
        }
    };

    useEffect(() => {
        if (userId) fetchProfile();
    }, [userId]);



    return (
        <DashboardLayout data={profile}>
            <div className="dashboard-content-main">

                {/* 1. NEW PROFILES MATCHES Section */}
                <div className="section dashboard-section new-matches">
                    <h3 className="section-title">NEW PROFILES MATCHES (45)</h3>
                    <div className="card-grid-4">
                        {mockMatches.map(match => (
                            <ProfileCard key={`new-${match.id}`} data={match} />
                        ))}
                    </div>
                    {/* The View All Button is used here */}
                    <div className="view-all-wrapper border-bottom">
                        <ViewAllButton label="View All" href="/matches/new" />
                    </div>

                </div>

                {/* 2. PROFILES STATUS / PAID MEMBER / CHAT LIST (Three-Column Row) */}
                <div className="section dashboard-section status-row-grid">

                    {/* 2a. Profiles Status */}
                    <div className="status-item profile-status-wrap">
                        <h3 className="section-title">PROFILES STATUS</h3>
                        <ProfileCompleteness percentage={profile?.profileScore ?? 0} />


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
                    <h3 className="section-title">Recently Viewed Profiles (22)</h3>
                    <div className="card-grid-4">
                        {mockMatches.slice(0, 4).map(profile => (
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

