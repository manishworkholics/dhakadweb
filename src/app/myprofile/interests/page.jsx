"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://143.110.244.163:5000/api/interest/request";

const RequestListItem = ({ profile, type, mainTab, onAction }) => {
    const showActions = mainTab === "received" && type === "new";

    const calculateAge = (dob) => {
        if (!dob) return "";

        const birthDate = new Date(dob);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }

        return age;
    };

    return (
        <div className="align-items-start py-3 row">
            <div className="col-lg-6 col-md-6 col-12">
                <div
                    className="interest-image w-100 d-flex align-items-center justify-content-center position-relative mb-lg-0 mb-md-0 mb-3"
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
                            backgroundImage: `url(${profile?.profile?.photos?.[0] || "/placeholder.png"})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            filter: "blur(12px)",
                            transform: "scale(1.1)",
                            zIndex: 1,
                        }}
                    >
                        {/* Optional dark overlay to make main image pop */}
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

                    {/* Main Image */}
                    <img
                        src={profile?.profile?.photos?.[0] || "/placeholder.png"}
                        alt={profile?.profile?.name || "Profile"}
                        className="rounded w-100 h-100 position-relative"
                        style={{ objectFit: "contain", zIndex: 2 }}
                    />
                </div>

            </div>

            <div className="col-lg-6 col-md-6 col-12">
                <h5 className="mb-1 fw-semibold text-dark">{profile?.profile?.name}</h5>
                <p className="text-muted small mb-1">
                    City: <strong className="text-dark me-3">{profile?.profile?.location}</strong> </p>
                <p className="text-muted small mb-1">
                    Age:  <strong className="text-dark me-3">
                        {calculateAge(profile?.profile?.dob)} yrs
                    </strong> </p>
                <p className="text-muted small mb-1">
                    Occupation: <strong className="text-dark">{profile?.profile?.occupation}</strong>
                </p>
                <p className="text-muted small mb-2">
                    Requested On: <strong className="text-dark">{new Date(profile.createdAt).toLocaleString()}</strong>
                </p>

                <Link
                    href={`/profiledetail/${profile?.profile?._id}`}
                    className="btn short-btn rounded-3 fw-medium py-1 px-2 mb-2"
                    style={{ borderColor: "#cfcfcf", color: "#000000" }}
                >
                    View full profile
                </Link>
            </div>

            {showActions && (
                <div className="d-flex justify-content-end align-items-center">
                    <button
                        className="btn btn-sm btn-success rounded-pill px-4 fw-medium me-2"
                        style={{ backgroundColor: "#e8f5e9", borderColor: "#4CAF50", color: "#4CAF50" }}
                        onClick={() => onAction(profile._id, "accept")}
                    >
                        Accept
                    </button>

                    <button
                        className="btn btn-sm btn-danger rounded-pill px-4 fw-medium"
                        style={{ backgroundColor: "#ffebee", borderColor: "#f44336", color: "#f44336" }}
                        onClick={() => onAction(profile._id, "reject")}
                    >
                        Deny
                    </button>
                </div>
            )}
        </div>
    );
};

export default function InterestsPage() {
    const [mainTab, setMainTab] = useState("received");
    const [activeSubTab, setActiveSubTab] = useState("new");

    const [receivedRequests, setReceivedRequests] = useState({
        new: [],
        accepted: [],
        rejected: [],
    });

    const [sentRequests, setSentRequests] = useState([]);

    // 🔥 Fetch interests from backend
    const fetchRequests = async () => {
        try {
            const token = localStorage.getItem("token");

            let receivedURL = `${API_URL}/received`;

            // Dynamically apply status filter only when in Received Tab
            if (mainTab === "received") {
                if (activeSubTab === "new") receivedURL += `?status=pending`;
                if (activeSubTab === "accepted") receivedURL += `?status=accepted`;
                if (activeSubTab === "denied") receivedURL += `?status=rejected`;
            }

            // Fetch Received Requests
            const received = await axios.get(receivedURL, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Fetch Sent Requests
            const sent = await axios.get(`${API_URL}/sent`, {
                headers: { Authorization: `Bearer ${token}` },
            });


            if (received.data.success) {
                setReceivedRequests({
                    new: received.data.requests.filter((r) => r.status === "pending"),
                    accepted: received.data.requests.filter((r) => r.status === "accepted"),
                    rejected: received.data.requests.filter((r) => r.status === "rejected"),
                });
            }

            if (sent.data.success) {
                setSentRequests(sent.data.requests);
            }

        } catch (err) {
            toast.error("Error fetching interest requests");
        }
    };


    useEffect(() => {
        fetchRequests();
    }, [mainTab, activeSubTab]);


    // 🔥 Accept / Reject Handler
    const updateRequestStatus = async (requestId, actionType) => {
        try {
            const token = localStorage.getItem("token");

            const url =
                actionType === "accept"
                    ? `${API_URL}/accept/${requestId}`
                    : `${API_URL}/reject/${requestId}`;

            const res = await axios.put(
                url,
                { requestId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data.success) {
                toast.success(
                    actionType === "accept"
                        ? "Request Accepted!"
                        : "Request Denied!"
                );
                fetchRequests();
            }
        } catch (err) {
            toast.error("Failed to update");
        }
    };

    let currentProfiles = [];

    if (mainTab === "received") {
        if (activeSubTab === "new") currentProfiles = receivedRequests.new;
        if (activeSubTab === "accepted") currentProfiles = receivedRequests.accepted;
        if (activeSubTab === "denied") currentProfiles = receivedRequests.rejected;
    } else {
        currentProfiles = sentRequests;
    }

    return (
        <DashboardLayout>
            <div className="p-4">

                {/* Tabs */}
                <div className="d-flex mb-4">
                    <button
                        className={`btn btn-sm rounded-3 me-3 fw-medium py-2 px-lg-3 px-md-3 px-2 ${mainTab === "received" ? "short-btn" : "short-out-btn"}`}
                        onClick={() => setMainTab("received")}
                    >
                        Interest Received
                    </button>

                    <button
                        className={`btn btn-sm rounded-3 fw-medium py-2 px-lg-3 px-md-3 px-2 ${mainTab === "sent" ? "btn-danger" : "btn-outline-danger"}`}
                        onClick={() => setMainTab("sent")}
                    >
                        Interest Sent
                    </button>
                </div>

                {/* Card container */}
                {/* Sub Tabs */}
                {mainTab === "received" && (
                    <ul className="nav nav-tabs interests-tabs mb-3">
                        {["new", "accepted", "denied"].map((tab) => (
                            <li className="nav-item" key={tab}>
                                <button
                                    className={`nav-link text-capitalize tab-button me-lg-2 me-md-2 me-1 mb-0 p-lg-2 p-md-2 p-1 ${activeSubTab === tab ? "active" : ""}`}
                                    onClick={() => setActiveSubTab(tab)}
                                >
                                    {tab} Requests
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                {/* List */}
                <div className="request-list-container">
                    {currentProfiles.length > 0 ? (
                        <div className="row">
                            {currentProfiles.map((profile) => (
                                <div className="col-lg-6 col-md-6 col-12 mb-3" key={profile._id}>
                                    <div className="card p-3 h-100 rounded-3 short-card">
                                        <RequestListItem
                                            profile={profile}
                                            type={activeSubTab}
                                            mainTab={mainTab}
                                            onAction={updateRequestStatus}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center py-5 text-muted">
                            No requests found.
                        </p>
                    )}
                </div>

            </div>
        </DashboardLayout>
    );
}