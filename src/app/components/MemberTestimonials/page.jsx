// MemberTestimonials.jsx
"use client";

import React, { useRef } from "react";
// Import Swiper React components and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Define the testimonial data
const testimonialsData = [
    {
        quote: "I found my life partner here! The verified profiles and simple interface made everything so easy. Truly grateful to this platform for bringing us together.",
        name: "Rohit Dhakad",
        location: "Indore",
    },
    {
        quote: "We both loved music and travel — that’s how our story began. The match suggestions were so accurate! Thank you for making our dream come true.",
        name: "Nikhil Dhakad",
        location: "Indore",
    },
    {
        quote: "The process was seamless and incredibly fast. I appreciated the attention to detail and the excellent support team. Highly recommend this service!",
        name: "Muskan Dhakad",
        location: "Indore",
        // Note: You can add an image property here if you want to include a profile image later
        // img: "/path/to/muskan-image.jpg"
    },
    {
        quote: "Finding someone who shares my values seemed impossible until I joined. Now, we're planning our wedding! Thank you for this amazing platform.",
        name: "Priya Sharma",
        location: "Mumbai",
    },
    {
        quote: "A truly modern and efficient way to find a meaningful connection. The best decision I made this year was signing up.",
        name: "Amit Patel",
        location: "Pune",
    },
];

export default function MemberTestimonials() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <section className="testimonials-section py-5" style={{ background: "#f8f9fa" }}>
            <div className="container">
                {/* ---------- Title + Navigation Buttons Row ---------- */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold m-0">
                        What <span style={{ color: "#ff4b4b" }}>Members Say</span>
                    </h2>

                    {/* Navigation Buttons */}
                    <div className="d-flex gap-2">
                        <button
                            ref={prevRef}
                            className="btn btn-light shadow-sm rounded-circle"
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

                {/* ---------- Swiper Slider ---------- */}
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30} // Space between slides
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                        // Dynamically set navigation elements on init
                        if (swiper.params.navigation) {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                        }
                    }}
                    onInit={(swiper) => {
                         // Must update Swiper for refs to work properly
                        swiper.navigation.update();
                    }}
                    modules={[Navigation]}
                    // Responsive breakpoints for different screen sizes
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3, // Display 3 cards on large screens
                            spaceBetween: 30,
                        },
                    }}
                    className="testimonials-swiper"
                >
                    {testimonialsData.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="testimonial-card p-4 rounded-3 shadow-sm bg-white" style={{ height: '220px' }}>
                                <p className="testimonial-quote mb-4" style={{ fontStyle: 'italic' }}>
                                    "{item.quote}"
                                </p>
                                <div className="testimonial-author d-flex align-items-center">
                                    {/* Placeholder for optional author image
                                    {item.img && (
                                        <Image src={item.img} alt={item.name} width={50} height={50} className="rounded-circle me-3" />
                                    )} */}
                                    <div className="author-info">
                                        <h5 className="author-name fw-bold m-0">{item.name}</h5>
                                        <p className="author-location text-muted m-0">{item.location}</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}