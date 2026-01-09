"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";

// --- API Base URL ---
const API_URL = "http://143.110.244.163:5000/api";

// --- Sub-Component: Shortlisted User Card ---
const ShortListItem = ({ profile, onRemove }) => {
    return (
        <div className="align-items-start py-3 row">
            <div className="col-lg-5 col-md-5 col-12 mb-lg-0 mb-md-0 mb-2">
                <div
                    className="interest-image w-100 d-flex align-items-center justify-content-center position-relative"
                    style={{ height: "200px", overflow: "hidden", borderRadius: "12px" }}
                >
                    {/* Blurred Background */}
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundImage: `url(${profile?.profile?.photos?.[0] || "/dhakadweb/assets/images/default-profile.png"})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            filter: "blur(15px)",
                            transform: "scale(1.1)",
                            zIndex: 1,
                        }}
                    >
                        {/* Optional Dark Overlay */}
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backgroundColor: "rgba(0,0,0,0.15)",
                            }}
                        ></div>
                    </div>

                    {/* Main Profile Image */}
                    <img
                        src={profile?.profile?.photos?.[0] || "/dhakadweb/assets/images/default-profile.png"}
                        alt={profile?.profile?.name || "Profile"}
                        className="rounded w-100 h-100 position-relative"
                        style={{ objectFit: "contain", zIndex: 2 }}
                    />
                </div>

            </div>

            <div className="col-lg-7 col-md-7 col-12 text-lg-start text-md-start text-center">
                <h5 className="mb-2 fw-semibold text-dark">{profile?.profile?.name}</h5>
                <div className="mb-2">
                    <p className="text-muted small mb-2">
                        City: <strong className="text-dark me-3">{profile?.profile?.location || "N/A"}</strong>
                        </p>
                    <p className="text-muted small mb-2">
                        Age:{" "}

                        <strong className="text-dark me-3">
                            {profile?.profile?.dob
                                ? new Date().getFullYear() -
                                new Date(profile?.profile?.dob).getFullYear()
                                : "N/A"}{" "}
                            Yrs
                        </strong>{" "}</p>
                    <p className="text-muted small">
                        Occupation: <strong className="text-dark">{profile?.profile?.occupation || "N/A"}</strong>
                    </p>
                </div>
                    <Link href={`/profiledetail/${profile?.profile?._id}`} className="text-decoration-none text-white short-btn rounded-4 fw-medium py-2 px-4 mb-lg-0 mb-md-0 mb-2"> View Full Profile </Link>
            </div>
                <div className="text-lg-end text-md-end text-center">
                    <button
                        onClick={() => onRemove(profile?.profile?._id)}
                        className="btn btn-outline-danger rounded-pill px-3 py-2 fw-medium"
                        style={{
                            fontSize:"12px"
                        }}
                    >
                        Remove Shortlist
                    </button>
                </div>
            </div>
    );
};

export default function Shortlist() {
    const [shortlistedProfiles, setShortlistedProfiles] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch shortlisted profiles
    const fetchShortlistedProfiles = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(`${API_URL}/shortlist`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data.success) {
                setShortlistedProfiles(res.data.shortlist);
            }
        } catch (err) {
            toast.error("Failed to fetch shortlisted profiles");
        } finally {
            setLoading(false);
        }
    };

    // Remove from shortlist handler
    const handleRemoveShortlist = async (profileId) => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.delete(
                `${API_URL}/shortlist/${profileId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (res.data.success) {
                toast.success("Removed from shortlist");
                fetchShortlistedProfiles(); // refresh UI
            }
        } catch (err) {
            toast.error("Failed to remove");
        }
    };

    useEffect(() => {
        fetchShortlistedProfiles();
    }, []);

    return (
        <DashboardLayout>
            <div className="p-4">
                <h4 className="fw-semibold mb-3">Shortlist</h4>

                {loading ? (
                    <p className="text-center py-5 text-muted">Loading...</p>
                ) : shortlistedProfiles.length > 0 ? (
                    <div className="row g-3">   {/* ✅ GRID */}
                        {shortlistedProfiles.map((profile) => (
                            <div
                                key={profile._id}
                                className="col-lg-6 col-md-6 col-12"
                            >
                                <div className="card p-2 rounded-3 short-card">
                                    <ShortListItem
                                        profile={profile}
                                        onRemove={handleRemoveShortlist}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center py-5 text-muted">
                        No shortlisted profiles yet.
                    </p>
                )}
            </div>
        </DashboardLayout>

    );
}
