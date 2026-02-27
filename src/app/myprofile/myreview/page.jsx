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
            <div className="container-fluid review-bg py-5 px-0">
                {/* HERO SECTION */}
                <div className="hero-section position-relative">
                    <div className="container mb-2">
                        <div className="row align-items-center px-2">

                            {/* LEFT TEXT */}
                            <div className="col-lg-7 text-center">

                                <h3 className="fw-bold display-5 review-title">
                                    Share Your Experience
                                </h3>
                                <h5 className="fw-semibold review-subtitle">
                                    ★
                                </h5>
                                <h5 className="text-muted mb-3">
                                    Your review strengthens the Dhakad community.
                                </h5>
                            </div>

                            {/* RIGHT IMAGE */}
                            <div className="col-lg-5 text-center">
                                <img
                                    src="/dhakadweb/assets/images/couple.png"
                                    alt="couple"
                                    className="img-fluid"
                                />
                            </div>
                        </div>
                        <div className="yellow-curve">
                            <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
                                <path
                                    d="M0,80 C200,130 420,20 720,60 C1020,100 1240,40 1440,75"
                                    className="yellow-line"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
                {/* FORM CARD */}
                <div className="container mt-3">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            {/* STARS */}
                            <div className="mx-auto text-center">
                                <div className="fs-1 mb-2">
                                    {[1, 2, 3, 4, 5].map(star => (
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

                                <p className="text-muted small">
                                    Tap to rate your journey with us
                                </p>
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
                                    <label className="review-title fs-4 fw-semibold">Your Review</label>
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
                                            Submit Your Review
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TESTIMONIALS */}
                {/* <div className="container mt-5 text-center">
                    <h5 className="fw-semibold review-subtitle mb-4">
                        What Our Happy Couples Say
                    </h5>
                    <div className="row g-4">

                        {[1, 2, 3].map(i => (
                            <div className="col-md-4" key={i}>
                                <div className="card border-0 shadow-sm rounded-4 h-100 bg-FFF5F7">
                                    <div className="row p-2">
                                        <div className="col-md-6 p-0">
                                            <img
                                                src="/dhakadweb/assets/images/testimonial-1.png"
                                                className="rounded mb-2"
                                                style={{ width: "180px", height: "150px" }}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <div className="text-warning fs-5">★★★★★</div>
                                            <small className="text-muted">
                                                Amazing experience with Dhakad Matrimony
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>

                </div> */}

            </div>
        </DashboardLayout>
    );
}