// MemberTestimonials.jsx
"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Testimonials Data
const testimonialsData = [
    {
        quote: "I found my life partner here! The verified profiles and simple interface made everything so easy.",
        name: "Rohit Dhakad",
        location: "Indore",
    },
    {
        quote: "We both loved music and travel — that’s how our story began. The match suggestions were so accurate!",
        name: "Nikhil Dhakad",
        location: "Indore",
    },
    {
        quote: "The process was seamless and incredibly fast. Highly recommend this service!",
        name: "Muskan Dhakad",
        location: "Indore",
    },
    {
        quote: "Finding someone who shares my values seemed impossible until I joined.",
        name: "Priya Sharma",
        location: "Mumbai",
    },
    {
        quote: "A truly modern and efficient way to find a meaningful connection.",
        name: "Amit Patel",
        location: "Pune",
    },
];

export default function MemberTestimonials() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    // 🔥 State to control left button color
    const [hasMoved, setHasMoved] = useState(false);

    return (
        <section className="testimonials-section py-5" style={{ background: "#f8f9fa" }}>
            <div className="container">

                {/* ---------- Title + Navigation ---------- */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold m-0">
                        What <span style={{ color: "#ff4b4b" }}>Members Say</span>
                    </h2>

                    <div className="d-flex gap-2">
                        {/* LEFT BUTTON */}
                        <button
                            ref={prevRef}
                            className={`btn shadow-sm rounded-circle ${
                                hasMoved ? "btn-danger" : "btn-light"
                            }`}
                            style={{ width: 38, height: 38 }}
                        >
                            ←
                        </button>

                        {/* RIGHT BUTTON */}
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
                        // 🔥 Toggle left button color
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
                    className="testimonials-swiper"
                >
                    {testimonialsData.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="testimonial-card p-4 rounded-3 shadow-sm bg-white"
                                style={{ height: "220px" }}
                            >
                                <p className="mb-4 fst-italic">"{item.quote}"</p>
                                <div>
                                    <h5 className="fw-bold m-0">{item.name}</h5>
                                    <p className="text-muted m-0">{item.location}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
