"use client";

import React, { useRef } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

export default function SuccessStories() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const successStories = [
        { img: "/assets/success/s1.jpg" },
        { img: "/assets/success/s2.jpg" },
        { img: "/assets/success/s3.jpg" },
        { img: "/assets/success/s4.jpg" },
    ];

    return (
        <section className="py-5" style={{ background: "#fff" }}>
            <div className="container">

                {/* ---------- Title + Navigation Buttons Row ---------- */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold m-0">
                        <span style={{ color: "#ff4b4b" }}>Success</span> Story
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
                    spaceBetween={20}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }}
                    modules={[Navigation]}
                    breakpoints={{
                        576: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        992: { slidesPerView: 4 },
                    }}
                >
                    {successStories.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="text-center">
                                {/* IMAGE CARD */}
                                <div
                                    className="rounded-4 overflow-hidden mb-3"
                                    style={{ height: "260px" }}
                                >
                                    <Image
                                        src={item.img}
                                        alt="Success Story"
                                        width={400}
                                        height={260}
                                        className="w-100 h-100 object-fit-cover"
                                    />
                                </div>

                                <p className="fw-semibold" style={{ cursor: "pointer" }}>
                                    Read Full Story &gt;
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
