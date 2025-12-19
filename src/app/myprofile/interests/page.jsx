"use client";
 
import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
 
const API_URL = "http://143.110.244.163:5000/api/interest/request";
 
const RequestListItem = ({ profile, type, onAction }) => {
    const showActions = type === "new";
 
    return (
        <div className="align-items-start py-3 border-bottom row">
            <div className="col-lg-2 col-md-2 col-6">
                <div className="interest-image w-100 d-flex align-items-center justify-content-center"
                    style={{ height: "125px", overflow: 'hidden' }}>
                    <img
                        src={profile?.profile?.photos?.[0] || "/placeholder.png"}
                        alt={profile.name}
                        className="rounded w-100 h-100"
                        style={{ objectFit: 'cover' }}
                    />
                </div>
            </div>
 
            <div className="col-lg-7 col-md-7 col-6">
                <h5 className="mb-1 fw-semibold text-dark">{profile?.profile?.name}</h5>
                <p className="text-muted small mb-1">
                    City: <strong className="text-dark me-3">{profile?.profile?.location}</strong> &bull;
                    Age: <strong className="text-dark me-3">{profile?.profile?.age} yrs</strong> &bull;
                    Job: <strong className="text-dark">{profile?.profile?.occupation}</strong>
                </p>
                <p className="text-muted small mb-2">
                    Requested On: <strong className="text-dark">{new Date(profile.createdAt).toLocaleString()}</strong>
                </p>
 
                <Link
                    href={`/profiledetail/${profile?.profile?._id}`}
                    className="btn btn-sm btn-outline-secondary rounded-3 fw-medium py-1 px-2"
                    style={{ borderColor: "#cfcfcf", color: "#000000" }}
                >
                    View full profile
                </Link>
            </div>
 
            {showActions && (
                <div className="col-lg-3 col-md-3 col-12 d-flex justify-content-between align-items-center">
                    <button
                        className="btn btn-sm btn-success rounded-pill px-4 fw-medium"
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
            const token = sessionStorage.getItem("token");
 
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
            const token = sessionStorage.getItem("token");
 
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
                        className={`btn btn-sm rounded-3 me-3 fw-medium py-1 px-2 ${mainTab === "received" ? "btn-dark" : "btn-outline-dark"}`}
                        onClick={() => setMainTab("received")}
                    >
                        Interest Received
                    </button>
 
                    <button
                        className={`btn btn-sm rounded-3 fw-medium py-1 px-2 ${mainTab === "sent" ? "btn-warning" : "btn-outline-warning"}`}
                        onClick={() => setMainTab("sent")}
                    >
                        Interest Sent
                    </button>
                </div>
 
                {/* Card container */}
                <div className="card shadow-sm p-4">
 
                    {/* Sub Tabs */}
                    {mainTab === "received" && (
                        <ul className="nav nav-tabs mb-3">
                            {["new", "accepted", "denied"].map((tab) => (
                                <li className="nav-item" key={tab}>
                                    <button
                                        className={`nav-link text-capitalize ${activeSubTab === tab ? "active" : ""}`}
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
                            currentProfiles.map((profile) => (
                                <RequestListItem
                                    key={profile._id}
                                    profile={profile}
                                    type={activeSubTab}
                                    onAction={updateRequestStatus}
                                />
                            ))
                        ) : (
                            <p className="text-center py-5 text-muted">
                                No requests found.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}