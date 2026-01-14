"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function SuccessStories() {

    const [successStories, setsuccessStories] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ NEW: detect mobile
    const [isMobile, setIsMobile] = useState(false);

    const getSuccess = async () => {
        try {
            const res = await fetch("http://143.110.244.163:5000/api/success");
            const data = await res.json();
            setsuccessStories(data?.stories || []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching success stories:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getSuccess();
    }, []);

    // ✅ NEW: screen size checker
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 576);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // ✅ UPDATED LOGIC
    const displayedStories = isMobile
        ? successStories.slice(0, 1) // 📱 mobile → 4 cards
        : successStories.slice(0, 5); // 💻 desktop → 5 cards

    const hasMoreStories = successStories.length > (isMobile ? 1 : 5);

    // Loading state
    if (loading) {
        return (
            <section className="py-5 text-center" style={{ background: "#fff" }}>
                <div className="container">
                    <p>Loading success stories...</p>
                </div>
            </section>
        );
    }

    // Empty state
    if (displayedStories.length === 0) {
        return (
            <section className="pb-5 text-center" style={{ background: "#fff" }}>
                <div className="container">
                    <h2 className="fw-bold m-0 text-D4AF37">
                        <span className="text-D4AF37">Success</span> Story
                    </h2>
                    <p className="mt-3">No success stories found at this time.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-5" style={{ background: "#fff" }}>
            <div className="container">

                {/* HEADER */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold m-0">
                        <span className="text-D4AF37">Success</span> Stories
                    </h2>

                    {hasMoreStories && (
                        <Link
                            href="/components/dhakad_forever_matches"
                            className="btn px-4 py-2 fw-medium short-btn"
                        >
                            View All Profile
                        </Link>
                    )}
                </div>

                {/* STORIES GRID */}
                <div className="story-grid-wrapper">
                    <div className="story-grid">
                        {displayedStories.map((item, index) => (
                            <div key={index} className="story-card">
                                <Link
                                    href={`/components/details_success_stories/${item._id}`}
                                    className="story-img-wrapper"
                                >
                                    <img
                                        src={item.image}
                                        alt="Success Story"
                                        className="story-img"
                                    />

                                    <div className="story-overlay">
                                        <span className="story-cta rounded-pill p-2 w-75 text-center">
                                            Read Full Story
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
