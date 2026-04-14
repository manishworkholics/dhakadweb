"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://143.110.244.163:5000/api";

export default function AddSuccessStoryPage() {
    const [form, setForm] = useState({
        title: "",
        name: "",
        partnerName: "",
        story: "",
        image: "",
    });
    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [previewUrl, setPreviewUrl] = useState("");

    const token =
        typeof window !== "undefined" ? localStorage.getItem("usertoken") : null;

    useEffect(() => {
        if (typeof window !== "undefined") {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user?.name) {
                setForm((prev) => ({ ...prev, name: user.name }));
            }
        }
    }, []);

    const handleInputChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
            setUploading(true);

            const res = await axios.post(`${API_URL}/upload-image`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.data.success) {
                setForm((prev) => ({ ...prev, image: res.data.url }));
                setPreviewUrl(res.data.url);
                toast.success("Image uploaded successfully");
            } else {
                throw new Error(res.data.message || "Upload failed");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Image upload failed");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async () => {
        if (!form.title || !form.name || !form.partnerName || !form.story) {
            toast.error("Please complete all fields before submitting.");
            return;
        }

        if (!form.image) {
            toast.error("Please upload a photo before submitting.");
            return;
        }

        try {
            setSubmitting(true);

            await axios.post(
                `${API_URL}/success`,
                {
                    title: form.title,
                    name: form.name,
                    partnerName: form.partnerName,
                    story: form.story,
                    image: form.image,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Success story submitted successfully!");
            setForm({ title: "", name: "", partnerName: "", story: "", image: "" });
            setPreviewUrl("");
        } catch (error) {
            toast.error(error.response?.data?.message || "Submission failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="container-fluid review-bg py-5 px-0">
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

                <div className="hero-section position-relative">
                    <div className="container mb-2">
                        <div className="row align-items-center px-2">
                            <div className="col-lg-7 text-center text-lg-start">
                                <h3 className="fw-bold display-5 review-title">
                                    Share Your Success Story
                                </h3>
                                <h5 >
                                    Your story inspires the Dhakad community.
                                </h5>
                                <p className="text-muted mt-3">
                                    Tell us how you found love and let others celebrate your journey.
                                </p>
                            </div>
                            <div className="col-lg-5 text-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/dhakadweb/assets/images/couple.png"
                                    alt="couple"
                                    className="img-fluid"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="card review-card mx-auto rounded-5 bg-FFF5F7">
                                <div className="card-body p-4 p-lg-5">
                                    <div className="row g-4">
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Story Title</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={form.title}
                                                onChange={(e) => handleInputChange("title", e.target.value)}
                                                placeholder="Our Happy Ending"
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Your Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={form.name}
                                                onChange={(e) => handleInputChange("name", e.target.value)}
                                                placeholder="Ram"
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Partner Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={form.partnerName}
                                                onChange={(e) => handleInputChange("partnerName", e.target.value)}
                                                placeholder="Sita"
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Upload Photo</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="form-control"
                                                onChange={handleImageUpload}
                                                disabled={uploading}
                                            />
                                        </div>

                                        <div className="col-12">
                                            <label className="form-label fw-semibold">Your Story</label>
                                            <textarea
                                                rows="6"
                                                className="form-control"
                                                value={form.story}
                                                onChange={(e) => handleInputChange("story", e.target.value)}
                                                placeholder="We met on the app and got married after 6 months."
                                            />
                                        </div>

                                        {previewUrl && (
                                            <div className="col-12">
                                                <div className="rounded-4 overflow-hidden border border-2" style={{ borderColor: "#f3a6b6" }}>
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        src={previewUrl}
                                                        alt="Story preview"
                                                        className="img-fluid w-100"
                                                        style={{ minHeight: 240, objectFit: "cover" }}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div className="col-12 text-center">
                                            <button
                                                onClick={handleSubmit}
                                                disabled={submitting || uploading}
                                                className="btn w-100 text-white fw-semibold py-3 review-btn rounded-pill"
                                            >
                                                {submitting ? "Submitting..." : "Submit Success Story"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
