"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import axios from "axios";

const API_URL = "http://143.110.244.163:5000/api";

export default function MyReviewPage() {
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const user =
        typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("user"))
            : null;

    const userName = user?.name || "";
    const userId = user?._id || "";
    const userEmail = user?.email || "";

    const targetId = userId; // change dynamically later

    const handleSubmit = async () => {
        try {
            setLoading(true);

            await axios.post(
                `${API_URL}/review`,
                {
                    targetId,
                    rating,
                    title,
                    comment,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Review submitted for admin approval ❤️");
            setRating(0);
            setTitle("");
            setComment("");
        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchMyReviews();
    }, []);

    const fetchMyReviews = async () => {
        const res = await axios.get(`${API_URL}/review/my`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setReviews(res.data.data);
    };

    const handleDelete = async (id) => {
        await axios.delete(`${API_URL}/review/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        fetchMyReviews();
    };

    const handleEdit = (review) => {
        setRating(review.rating);
        setTitle(review.title);
        setComment(review.comment);
    };

    return (
        <DashboardLayout>
            <div className="review-page">
                <div className="review-card">

                    {/* Tabs */}
                    <ul className="nav nav-pills justify-content-center mb-4" id="reviewTab">
                        <li className="nav-item">
                            <button
                                className="nav-link active"
                                data-bs-toggle="pill"
                                data-bs-target="#writeReview"
                            >
                                ⭐ Write Review
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className="nav-link"
                                data-bs-toggle="pill"
                                data-bs-target="#myReviews"
                            >
                                📋 My Reviews
                            </button>
                        </li>
                    </ul>

                    <div className="tab-content">

                        {/* ================= WRITE REVIEW TAB ================= */}
                        <div className="tab-pane fade show active" id="writeReview">

                            <h2 className="review-title">Share Your Experience</h2>
                            <p className="review-subtitle">
                                Your review strengthens the Dhakad community 💕
                            </p>

                            {/* Stars */}
                            <div className="star-container">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={`star ${star <= rating ? "active" : ""}`}
                                        onClick={() => setRating(star)}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Review Title (Optional)"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <textarea
                                rows="4"
                                className="form-control"
                                placeholder="Write your experience..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />

                            <button
                                className="review-btn"
                                onClick={handleSubmit}
                                disabled={loading || rating === 0}
                            >
                                Submit Your Review
                            </button>

                            <p className="review-note">
                                Review will be visible after admin approval.
                            </p>
                        </div>

                        {/* ================= MY REVIEWS TAB ================= */}
                        <div className="tab-pane fade" id="myReviews">

                            {reviews.length === 0 ? (
                                <p className="text-center text-muted">No reviews yet.</p>
                            ) : (
                                reviews.map((review) => (
                                    <div key={review._id} className="review-item">

                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <strong>{review.title || "No Title"}</strong>
                                            <span className={`badge ${review.isApproved ? "bg-success" : "bg-warning text-dark"}`}>
                                                {review.isApproved ? "Approved" : "Pending"}
                                            </span>
                                        </div>

                                        <div className="mb-2">
                                            {"★".repeat(review.rating)}
                                        </div>

                                        <p>{review.comment}</p>

                                        <div className="text-end">
                                            <button
                                                className="btn btn-sm btn-outline-primary me-2"
                                                onClick={() => handleEdit(review)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleDelete(review._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>

                                    </div>
                                ))
                            )}

                        </div>

                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
}