


"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "./components/Layout/DashboardLayout";

// Dashboard Components
import ProfileCompleteness from "./components/Dashboard/ProfileCompleteness";
import PaidMembershipCard from "./components/Dashboard/PaidMembershipCard";
import RecentChatList from "./components/Dashboard/RecentChatList";
import ProfileCard from "./components/Dashboard/ProfileCard";
import ViewAllButton from "./components/Shared/ViewAllButton";
import { useRouter } from "next/navigation";
import { buildApiUrl, buildAuthHeaders } from "@/lib/api";

export default function MyProfileDashboard() {
    const router = useRouter();

    const [profile, setProfile] = useState(null);
    const [primium, setPrimium] = useState(null);
    const [viewedprofile, setViewedProfile] = useState(null);
    const [matchprofile, setMatchProfile] = useState(null);
    const [userId, setUserId] = useState(null);

    const [loadingMatches, setLoadingMatches] = useState(true);
    const [loadingViewed, setLoadingViewed] = useState(true);

    const [isTabletRange, setIsTabletRange] = useState(false);

    /* ---------- Responsive ---------- */
    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleResize = () => {
            const width = window.innerWidth;
            setIsTabletRange(width >= 768 && width <= 1399);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    /* ---------- User ---------- */
    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUserId(JSON.parse(userData)._id);
        }
    }, []);

    /* ---------- API Calls ---------- */
    const fetchProfile = async () => {
        try {
            const res = await fetch(
                buildApiUrl(`/api/profile/own-profile/${userId}`),
                {
                    headers: {
                        ...buildAuthHeaders(),
                    },
                }
            );
            const data = await res.json();
            setProfile(data.profile);
            setPrimium(data.hasPremiumAccess)
        } catch (error) {
            console.log("Profile fetch error:", error);
        }
    };

    const fetchViewedProfile = async () => {
        try {
            setLoadingViewed(true);
            const res = await fetch(buildApiUrl("/api/viewed/viewed"), {
                headers: {
                    ...buildAuthHeaders(),
                },
            });
            const data = await res.json();
            setViewedProfile(data);
        } catch (error) {
            console.log("Viewed profile fetch error:", error);
        } finally {
            setLoadingViewed(false);
        }
    };

    const fetchMatchedProfile = async () => {
        try {
            setLoadingMatches(true);
            const res = await fetch(
                buildApiUrl("/api/matches/new-matches"),
                {
                    headers: {
                        ...buildAuthHeaders(),
                    },
                }
            );
            const data = await res.json();
            setMatchProfile(data);
        } catch (error) {
            console.log("Match profile fetch error:", error);
        } finally {
            setLoadingMatches(false);
        }
    };

    useEffect(() => {
        if (userId) fetchProfile();
        fetchViewedProfile();
        fetchMatchedProfile();
    }, [userId]);

    /* ---------- Auth check ---------- */
    useEffect(() => {
        const token = localStorage.getItem("usertoken");
        if (!token) {
            router.replace("/login");
        }
    }, []);

    /* ---------- UI Logic ---------- */
    const newMatchLimit = isTabletRange ? 3 : 3;
    const showViewAllMatches =
        (matchprofile?.matches?.length || 0) > newMatchLimit;

    /* ---------- Skeleton Card ---------- */
    const SkeletonCard = () => (
        <div className="profile-card skeleton-card">
            <div className="skeleton-img"></div>
            <div className="skeleton-line w-75"></div>
            <div className="skeleton-line w-50"></div>
        </div>
    );

    return (
        <DashboardLayout>
            {/* Skeleton CSS */}
            <style>{`
        .skeleton-card {
          background: #fff;
          border-radius: 12px;
          padding: 10px;
        }
        .skeleton-img {
          width: 100%;
          height: 180px;
          border-radius: 10px;
          background: linear-gradient(90deg,#eee 25%,#f5f5f5 37%,#eee 63%);
          background-size: 400% 100%;
          animation: shimmer 1.4s ease infinite;
        }
        .skeleton-line {
          height: 12px;
          margin-top: 10px;
          border-radius: 6px;
          background: linear-gradient(90deg,#eee 25%,#f5f5f5 37%,#eee 63%);
          background-size: 400% 100%;
          animation: shimmer 1.4s ease infinite;
        }
        @keyframes shimmer {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style>

            <div className="dashboard-content-main">
                <div className="row">
                    <div className="col-lg-8">

                        {/* ---------- NEW MATCHES ---------- */}
                        <div className="section dashboard-section new-matches mb-4">
                            <h3 className="section-title">
                                New Matches ({matchprofile?.count})
                            </h3>

                            <div className="card-grid-4">
                                {loadingMatches
                                    ? [...Array(newMatchLimit)].map((_, i) => (
                                        <SkeletonCard key={i} />
                                    ))
                                    : matchprofile?.matches
                                        ?.slice(0, newMatchLimit)
                                        .map((profile) => (
                                            <ProfileCard
                                                key={`match-${profile._id}`}
                                                data={profile}
                                            />
                                        ))}
                            </div>

                            {/* {showViewAllMatches && (
                                <div className="view-all-wrapper py-3">
                                    <ViewAllButton
                                        label="View All"
                                        href="/myprofile/newmatches"
                                    />
                                </div>
                            )} */}


                            {showViewAllMatches && (
                                primium ? (
                                    <div className="view-all-wrapper py-3">
                                        <ViewAllButton
                                            label="View All"
                                            href="/myprofile/newmatches"
                                        />
                                    </div>
                                ) : (
                                    <div className="alert alert-warning py-2 text-center">
                                        🔒 Upgrade to premium to view all matches
                                    </div>
                                )
                            )}

                        </div>

                        {/* ---------- PROFILE STATUS ---------- */}
                        <div className="section dashboard-section mb-lg-0 mb-md-4 mb-4">
                            <div className="status-item profile-status-wrap">
                                <h3 className="section-title">PROFILE STATUS</h3>
                                <ProfileCompleteness
                                    percentage={profile?.profileScore ?? 0}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="status-item membership-wrap">
                            <h3 className="section-title">BECOME A PAID MEMBER</h3>
                            <PaidMembershipCard />
                        </div>

                        <div className="status-item chat-list-wrap mb-lg-0 mb-md-4 mb-4">
                            <h3 className="section-title">RECENT CHAT LIST</h3>
                            <RecentChatList />
                        </div>
                    </div>
                </div>

                {/* ---------- VIEWED PROFILES ---------- */}
                <div className="section dashboard-section viewed-profiles">
                    <h3 className="section-title">
                        Recently Viewed Profiles ({viewedprofile?.results})
                    </h3>

                    <div className="card-grid-4">
                        {loadingViewed
                            ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
                            : viewedprofile?.profiles
                                ?.slice(0, 4)
                                .map((profile) => (
                                    <ProfileCard
                                        key={`viewed-${profile._id}`}
                                        data={profile}
                                    />
                                ))}
                    </div>

                    <div className="view-all-wrapper pt-2">
                        {viewedprofile && (
                            primium ? (
                                <div className="view-all-wrapper py-3">
                                    <ViewAllButton
                                        label="View All"
                                        href="/myprofile/recentlyviewed"
                                    />
                                </div>
                            ) : (
                                <div className="alert alert-warning py-2 text-center">
                                    🔒 Upgrade to premium to see all recently viewed profiles
                                </div>
                            )
                        )}

                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
