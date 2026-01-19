
"use client";

import React, { useEffect, useState } from 'react';

import DashboardLayout from "./components/Layout/DashboardLayout";


// 2. Import Dashboard Widgets & Shared Components
import ProfileCompleteness from "./components/Dashboard/ProfileCompleteness";
import PaidMembershipCard from "./components/Dashboard/PaidMembershipCard";
import RecentChatList from "./components/Dashboard/RecentChatList";
import ProfileCard from "./components/Dashboard/ProfileCard";
import ViewAllButton from "./components/Shared/ViewAllButton";
import { useRouter } from "next/navigation";
// --- Mock Data for Demonstration ---



export default function MyProfileDashboard() {
    const router = useRouter();
    const [profile, setProfile] = useState(null);
    const [viewedprofile, setViewedProfile] = useState(null);
    const [matchprofile, setMatchProfile] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUserId(JSON.parse(userData)._id);
        }
    }, []);


    const fetchProfile = async () => {
        try {
            const res = await fetch(
                `http://143.110.244.163:5000/api/profile/own-profile/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}` // or your auth token
                }
            }
            );
            const data = await res.json();

            setProfile(data.profile);
        } catch (error) {
            console.log("Profile fetch error:", error);
        }
    };

    const fetchViewedProfile = async () => {
        try {

            const res = await fetch(`http://143.110.244.163:5000/api/viewed/viewed`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}` // or your auth token
                }
            });
            const data = await res.json();

            setViewedProfile(data);
        } catch (error) {
            console.log("Profile fetch error:", error);
        }
    };

    const fetchMatchedProfile = async () => {
        try {

            const res = await fetch(`http://143.110.244.163:5000/api/matches/new-matches`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}` // or your auth token
                }
            });
            const data = await res.json();

            setMatchProfile(data);
        } catch (error) {
            console.log("Profile fetch error:", error);
        }
    };


    useEffect(() => {
        if (userId) fetchProfile();
        fetchViewedProfile();
        fetchMatchedProfile();
    }, [userId]);

    useEffect(() => {
        fetchProfile();

    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.replace("/login");
        }
    }, []);

    return (
        <DashboardLayout>
            {/* The content below renders inside the main column (col-md-9) of the DashboardLayout */}
            <div className="dashboard-content-main">
                <div className='row'>
                    <div className='col-lg-8'>
                        {/* 1. NEW PROFILES MATCHES Section */}
                        <div className="section dashboard-section new-matches mb-4">
                            <h3 className="section-title">New Matches  ({matchprofile?.count})</h3>
                            <div className="card-grid-4">
                                {matchprofile?.matches?.slice(0, 4).map(profile => (
                                    // Reusing the ProfileCard component
                                    <ProfileCard key={`viewed-${profile._id}`} data={profile} />
                                ))}
                            </div>
                            {/* The View All Button is used here */}
                            <div className="view-all-wrapper py-3">
                                <ViewAllButton label="View All" href="/myprofile/newmatches" />
                            </div>
                        </div>

                        {/* 2. PROFILES STATUS / PAID MEMBER / CHAT LIST (Three-Column Row) */}
                        <div className="section dashboard-section">

                            {/* 2a. Profiles Status */}
                            <div className="status-item profile-status-wrap">
                                <h3 className="section-title">PROFILE STATUS</h3>
                                <ProfileCompleteness percentage={profile?.profileScore ?? 0} />
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4'>
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
                </div>
                {/* 3. PROFILES YOU VIEWED Section */}
                <div className="section dashboard-section viewed-profiles">
                    <h3 className="section-title">Recently Viewed Profiles ({viewedprofile?.results})</h3>
                    <div className="card-grid-4">
                        {viewedprofile?.profiles?.slice(0, 4).map(profile => (
                            // Reusing the ProfileCard component
                            <ProfileCard key={`viewed-${profile._id}`} data={profile} />
                        ))}
                    </div>
                    {/* The View All Button is used here */}
                    <div className="view-all-wrapper pt-2">
                        <ViewAllButton label="View All" href="/myprofile/recentlyviewed" />
                    </div>
                </div>
            </div>
        </DashboardLayout >
    );
}

