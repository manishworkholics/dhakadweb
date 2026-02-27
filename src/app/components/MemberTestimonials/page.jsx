"use client";

import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import axios from "axios";

import "swiper/css";
import "swiper/css/navigation";

const API_URL = "http://143.110.244.163:5000/api";

export default function MemberTestimonials() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const [hasMoved, setHasMoved] = useState(false);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const res = await axios.get(
                `${API_URL}/review/testimonials?limit=8`
            );

            setTestimonials(res.data.data || []);
        } catch (error) {
            console.error("Error fetching testimonials:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            className="testimonials-section py-5"
            style={{ background: "#f8f9fa" }}
        >
            <div className="container">

                {/* ---------- Title + Navigation ---------- */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold m-0">
                        What <span style={{ color: "#ff4b4b" }}>Members Say</span>
                    </h2>

                    <div className="d-flex gap-2">
                        <button
                            ref={prevRef}
                            className={`btn shadow-sm rounded-circle ${hasMoved ? "btn-danger" : "btn-light"
                                }`}
                            style={{ width: 38, height: 38 }}
                        >
                            ←
                        </button>

                        <button
                            ref={nextRef}
                            className="btn btn-danger shadow-sm rounded-circle"
                            style={{ width: 38, height: 38 }}
                        >
                            →
                        </button>
                    </div>
                </div>

                {/* ---------- Swiper ---------- */}
                {loading ? (
                    <p className="text-center">Loading testimonials...</p>
                ) : testimonials.length === 0 ? (
                    <p className="text-center text-muted">
                        No testimonials available yet.
                    </p>
                ) : (
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                        }}
                        onInit={(swiper) => {
                            swiper.navigation.update();
                        }}
                        onSlideChange={(swiper) => {
                            setHasMoved(swiper.activeIndex > 0);
                        }}
                        modules={[Navigation]}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                    >
                        {testimonials.map((item) => (
                            <SwiperSlide key={item._id}>
                                <div
                                    className="testimonial-card p-4 rounded-3 shadow-sm bg-white"
                                    style={{ height: "240px" }}
                                >
                                    {/* Rating Stars */}
                                    <div className="mb-2 text-warning">
                                        {"★".repeat(item.rating)}
                                    </div>

                                    {/* Comment */}
                                    <p className="mb-3 fst-italic">
                                        "{item.comment}"
                                    </p>

                                    {/* User Info */}
                                    <div className="d-flex align-items-center gap-3">
                                        {item.user?.profileImage && (
                                            <img
                                                src={item.user.profileImage}
                                                alt="user"
                                                width="45"
                                                height="45"
                                                className="rounded-circle"
                                            />
                                        )}

                                        <div>
                                            <h6 className="fw-bold m-0">
                                                {item.user?.name}
                                            </h6>
                                            <small className="text-muted">
                                                {item.user?.city}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </section>
    );
}