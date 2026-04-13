"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import axios from "axios";

const API_URL = "http://143.110.244.163:5000/api";

export default function MyReviewPage() {
    const [activeTab, setActiveTab] = useState("add"); // NEW

    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [editId, setEditId] = useState(null); // NEW

    const [reviews, setReviews] = useState([]);

    const token =
        typeof window !== "undefined" ? localStorage.getItem("usertoken") : null;

    const user =
        typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("user"))
            : null;

    const userName = user?.name || "";
    const userId = user?._id || "";
    const userEmail = user?.email || "";

    const targetId = userId;

    useEffect(() => {
        if (activeTab === "my") {
            fetchMyReviews();
        }
    }, [activeTab]);

    const fetchMyReviews = async () => {
        const res = await axios.get(`${API_URL}/review/my`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setReviews(res.data.data);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (editId) {
                await axios.put(
                    `${API_URL}/review/${editId}`,
                    { rating, title, comment },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                alert("Review updated successfully ❤️");
            } else {
                await axios.post(
                    `${API_URL}/review`,
                    { targetId, rating, title, comment },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                alert("Review submitted for admin approval ❤️");
            }

            setRating(0);
            setTitle("");
            setComment("");
            setEditId(null);
            setActiveTab("my");
            fetchMyReviews();
        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        await axios.delete(`${API_URL}/review/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchMyReviews();
    };

    const handleEdit = (review) => {
        setActiveTab("add");
        setEditId(review._id);
        setRating(review.rating);
        setTitle(review.title);
        setComment(review.comment);
    };

    return (
        <DashboardLayout>
            <div className="container-fluid review-bg py-5 px-0">

                {/* HERO SECTION SAME AS YOUR CODE */}
                <div className="hero-section position-relative">
                    <div className="container mb-2">
                        <div className="row align-items-center px-2">
                            <div className="col-lg-7 text-center">
                                <h3 className="fw-bold display-5 review-title">
                                    Share Your Experience
                                </h3>
                                <h5 className="fw-semibold review-subtitle">★</h5>
                                <h5 className="text-muted mb-3">
                                    Your review strengthens the Dhakad community.
                                </h5>
                            </div>
                            <div className="col-lg-5 text-center">
                                <img
                                    src="/dhakadweb/assets/images/couple.png"
                                    alt="couple"
                                    className="img-fluid"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* TABS */}
                <div className="container mt-4 text-center">
                    <div className="d-inline-flex border rounded-pill overflow-hidden">
                        <button
                            className={`px-4 py-2 border-0 ${activeTab === "add" ? "review-btn text-white" : "bg-white"
                                }`}
                            onClick={() => setActiveTab("add")}
                        >
                            Add Review
                        </button>
                        <button
                            className={`px-4 py-2 border-0 ${activeTab === "my" ? "review-btn text-white" : "bg-white"
                                }`}
                            onClick={() => setActiveTab("my")}
                        >
                            My Reviews
                        </button>
                    </div>
                </div>

                {/* ADD REVIEW TAB */}
                {activeTab === "add" && (
                    <div className="container mt-4">
                        <div className="row justify-content-center">
                            <div className="col-md-10">

                                {/* STARS */}
                                <div className="mx-auto text-center">
                                    <div className="fs-1 mb-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span
                                                key={star}
                                                role="button"
                                                onClick={() => setRating(star)}
                                                className={`review-star ${star <= rating ? "active" : ""
                                                    }`}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="card review-card mx-auto rounded-5 bg-FFF5F7">
                                    <div className="card-body p-4">
                                        <input
                                            className="form-control mb-3"
                                            value={userName}
                                            readOnly
                                        />
                                        <input
                                            className="form-control mb-3"
                                            value={userEmail}
                                            readOnly
                                        />

                                        <textarea
                                            rows="4"
                                            className="form-control mb-3"
                                            placeholder="Write about your experience..."
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        />

                                        <div className="text-center">
                                            <button
                                                onClick={handleSubmit}
                                                disabled={loading || rating === 0}
                                                className="btn w-50 text-white fw-semibold py-3 review-btn rounded-pill"
                                            >
                                                {editId ? "Update Review" : "Submit Your Review"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* MY REVIEWS TAB */}
                {activeTab === "my" && (
                    <div className="container mt-4">
                        {reviews.length === 0 ? (
                            <p className="text-center text-muted">
                                You have not added any reviews yet.
                            </p>
                        ) : (
                            reviews.map((review) => (
                                <div
                                    key={review._id}
                                    className="card mb-3 shadow-sm rounded-4"
                                >
                                    <div className="card-body">
                                        <div className="mb-2 text-warning">
                                            {"★".repeat(review.rating)}
                                        </div>
                                        <p>{review.comment}</p>

                                        <div className="d-flex gap-3">
                                            <button
                                                className="btn review-btn text-white"
                                                onClick={() => handleEdit(review)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn review-btn text-white"
                                                onClick={() =>
                                                    handleDelete(review._id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}