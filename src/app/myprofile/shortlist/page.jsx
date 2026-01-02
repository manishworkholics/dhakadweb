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
        <div className="align-items-start py-3 border-bottom row">
            <div className="col-lg-3 col-md-3 col-4">
                <div className="interest-image w-100 d-flex align-items-center justify-content-center" style={{ height: "200px", overflow:'hidden' }}>
                    <img
                        src={profile?.profile?.photos?.[0] || "/dhakadweb/assets/images/default-profile.png"}
                        alt={profile?.profile?.name}
                        className="rounded w-100 h-100"
                        style={{ objectFit: "cover" }}
                    />
                </div>
            </div>

            <div className="col-lg-6 col-md-6 col-5">
                <h4 className="mb-2 fw-semibold text-dark">{profile?.profile?.name}</h4>
                <p className="text-muted small mb-4">
                    City: <strong className="text-dark me-3">{profile?.profile?.location || "N/A"}</strong> &bull;
                    Age:{" "}
                    <strong className="text-dark me-3">
                        {profile?.profile?.dob
                            ? new Date().getFullYear() -
                            new Date(profile?.profile?.dob).getFullYear()
                            : "N/A"}{" "}
                        Yrs
                    </strong>{" "}
                    &bull;
                    Job: <strong className="text-dark">{profile?.profile?.occupation || "N/A"}</strong>
                </p>

                <button className="btn btn-sm rounded-3 fw-medium py-1 px-2" style={{ border: "1px solid #BABABA" }}>
                    <Link href={`/profiledetail/${profile?.profile?._id}`} className="text-decoration-none text-black fs-6"> View full profile </Link>
                </button>
            </div>

            <div className="col-lg-3 col-md-3 col-3">
                <div className="d-flex align-items-end justify-content-end w-100">
                    <button
                        onClick={() => onRemove(profile?.profile?._id)}
                        className="btn btn-sm rounded-pill px-3 py-1 fw-medium"
                        style={{
                            backgroundColor: "#ffff",
                            borderColor: "#6c6c6c",
                            color: "#6c6c6c",
                        }}
                    >
                        Remove Shortlist
                    </button>
                </div>
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
            const token = sessionStorage.getItem("token");

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
            const token = sessionStorage.getItem("token");

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
                <h4 className="fw-semibold">Shortlist</h4>

                <div className="card shadow-sm p-4">
                    {loading ? (
                        <p className="text-center py-5 text-muted">Loading...</p>
                    ) : shortlistedProfiles.length > 0 ? (
                        shortlistedProfiles.map((profile) => (
                            <ShortListItem
                                key={profile._id}
                                profile={profile}
                                onRemove={handleRemoveShortlist}
                            />
                        ))
                    ) : (
                        <p className="text-center py-5 text-muted">
                            No shortlisted profiles yet.
                        </p>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
