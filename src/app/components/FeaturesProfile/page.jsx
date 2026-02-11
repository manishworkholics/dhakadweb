"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Link from "next/link";

export default function FeaturesProfile() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const [profiles, setProfiles] = useState([]);
    const [token, setToken] = useState("");
    const [user, setUser] = useState(null);

    // 🔴 NEW STATE (ONLY ADDITION)
    const [hasMoved, setHasMoved] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedToken = localStorage.getItem("token");
            const savedUser = localStorage.getItem("user");

            if (savedToken) setToken(savedToken);
            if (savedUser) setUser(JSON.parse(savedUser));
        }
    }, []);

    // ---- FETCH FEATURED PROFILES ----
    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                 const savedToken = localStorage.getItem("token");
                const res = await fetch("http://143.110.244.163:5000/api/featured?limit=10", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${savedToken}`,
                    },
                });
                const data = await res.json();
                if (data.success) {
                    setProfiles(data.profiles);
                }
            } catch (error) {
                console.log("Error fetching featured profiles:", error);
            }
        };

        fetchProfiles();
    }, []);

    // ---- CALCULATE AGE ----
    const calculateAge = (dob) => {
        if (!dob) return "-";
        const birthDate = new Date(dob);
        const today = new Date();
        return today.getFullYear() - birthDate.getFullYear();
    };

    return (
        <section className="py-5" style={{ background: "#fff" }}>
            <div className="container">

                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold m-0">
                        <span style={{ color: "#ff4b4b" }}>Featured</span> Profiles
                    </h2>

                    {/* Swiper Navigation */}
                    <div className="d-flex gap-2">
                        {/* LEFT BUTTON (DYNAMIC COLOR) */}
                        <button
                            ref={prevRef}
                            className={`btn shadow-sm rounded-circle ${hasMoved ? "btn-danger" : "btn-light"
                                }`}
                            style={{ width: 38, height: 38 }}
                        >
                            ←
                        </button>

                        {/* RIGHT BUTTON (ALWAYS RED) */}
                        <button
                            ref={nextRef}
                            className="btn btn-danger shadow-sm rounded-circle"
                            style={{ width: 38, height: 38 }}
                        >
                            →
                        </button>
                    </div>
                </div>

                {/* Swiper Slider */}
                <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }}
                    // 🔴 NEW EVENT (ONLY ADDITION)
                    onSlideChange={(swiper) => {
                        setHasMoved(swiper.activeIndex > 0);
                    }}
                    modules={[Navigation]}
                    breakpoints={{
                        481: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        992: { slidesPerView: 4 },
                        1200: { slidesPerView: 5 }
                    }}
                >
                    {profiles.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="card rounded-5 p-2 featured-card">

                                {/* PROFILE IMAGE */}
                                <div
                                    className="rounded-4 overflow-hidden position-relative featured-card"
                                    style={{ height: "100%" }}
                                >
                                    <img
                                        src={item.photos?.[0] || "/dhakadweb/assets/images/dummy.png"}
                                        alt={item.name}
                                        width={300}
                                        height={260}
                                        className="w-100 object-fit-cover position-relative rounded-4 feat-img"
                                    />
                                </div>
                                {/* USER DETAILS */}
                                <div className="feature-details position-absolute w-100 py-2 pe-4 ps-3">
                                    <h5 className="fw-bold text-dark mb-0">{item.name}</h5>
                                    <div className="text-btn d-flex justify-content-between align-items-center">
                                        <div className="text-fea">
                                            <p className="mb-0 text-dark">
                                                Age: {calculateAge(item.dob)}
                                            </p>
                                            <p className="text-dark mb-1">City: {item.location}</p>
                                        </div>
                                        <div className="fea-btn">
                                            {/* VIEW PROFILE BUTTON */}
                                            {!token ? (
                                                <Link
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setShowLoginModal(true);
                                                    }}

                                                    className="btn btn-outline-danger btn-sm rounded-4"
                                                >
                                                    View Profile
                                                </Link>
                                            ) : (
                                                <Link
                                                    href={`/profiledetail/${item._id}`}
                                                    className="btn btn-outline-danger btn-sm rounded-4"
                                                >
                                                    View Profile
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {showLoginModal && (
                <div
                    className="modal fade show"
                    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content rounded-4 border-0">

                            <div className="modal-header border-0">
                                <h5 className="modal-title fw-bold text-danger">Login Required</h5>
                                <button
                                    className="btn-close"
                                    onClick={() => setShowLoginModal(false)}
                                ></button>
                            </div>

                            <div className="modal-body text-center">
                                <p className="mb-3">
                                    You need to login to view this profile.
                                </p>

                                {/* <img
                                    src="/dhakadweb/assets/images/login-lock.png"
                                    alt="login"
                                    style={{ width: 80, opacity: 0.8 }}
                                    className="mb-3"
                                /> */}
                            </div>

                            <div className="modal-footer border-0 justify-content-center gap-2">
                                <button
                                    className="btn btn-light"
                                    onClick={() => setShowLoginModal(false)}
                                >
                                    Cancel
                                </button>

                                <Link
                                    href="/login"
                                    className="btn btn-danger"
                                    onClick={() => setShowLoginModal(false)}
                                >
                                    Login Now
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </section>
    );
}
