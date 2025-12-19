"use client";

import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function SuccessStories() {

    const [successStories, setsuccessStories] = useState([]);
    const [loading, setLoading] = useState(true);

    const getSuccess = async () => {
        try {
            const res = await fetch("http://143.110.244.163:5000/api/success")
            const data = await res.json();
            setsuccessStories(data?.stories || []) 
            setLoading(false);
        } catch (error) {
            console.error("Error fetching success stories:", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getSuccess();
    }, []);

    // Logic to select only the first 4 stories for display
    const displayedStories = successStories.slice(0, 4);
    const hasMoreStories = successStories.length > 4;

    // Display a loading message
    if (loading) {
        return (
            <section className="py-5 text-center" style={{ background: "#fff" }}>
                <div className="container">
                    <p>Loading success stories...</p>
                </div>
            </section>
        );
    }
    
    // Check if there are no stories to display
    if (displayedStories.length === 0) {
        return (
            <section className="py-5 text-center" style={{ background: "#fff" }}>
                <div className="container">
                    <h2 className="fw-bold m-0">
                        <span style={{ color: "#ff4b4b" }}>Success</span> Story
                    </h2>
                    <p className="mt-3">No success stories found at this time.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-5" style={{ background: "#fff" }}>
            <div className="container">

                {/* ---------- Title on Left and View All Button on Right ---------- 
                    d-flex and justify-content-between ensure the two children (title and button) 
                    are on opposite sides of the row.
                */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    
                    {/* Title on the Left */}
                    <h2 className="fw-bold m-0">
                        <span style={{ color: "#ff4b4b" }}>Success</span> Story
                    </h2>

                    {/* View All Button on the Right, only if there are more than 4 stories */}
                    {hasMoreStories && (
                            <Link href="/components/dhakad_forever_matches" 
                                className="btn btn-outline-danger px-4 py-2"
                                style={{ 
                                    backgroundColor:"#ff4b4b",
                                    color: "#ffff", 
                                    borderColor: "#ff4b4b",
                                }}
                            >
                                View All Profile
                        </Link>
                    )}
                </div>

                {/* ---------- Stories Grid Layout (Limited to 4) ---------- */}
                <div className="row g-4 justify-content-center">
                    {displayedStories.map((item, index) => (
                        <div key={index} className="col-lg-3 col-md-4 col-6">
                            <div className="text-center">
                                {/* IMAGE CARD */}
                                <div
                                    className="rounded-4 overflow-hidden mb-3"
                                    style={{ height: "260px" }}
                                >
                                    
                                        <img
                                            src={item.image}
                                            alt="Success Story"
                                            className="w-100 h-100 object-fit-cover rounded-4"
                                        />
                                </div>

                                <p className="fw-semibold" style={{ cursor: "pointer" }}>
                                    <Link 
                                        href={`/components/details_success_stories/${item._id}`} 
                                        className="text-decoration-none"
                                        style={{ color: 'inherit' }}
                                    >
                                        Read Full Story &gt;
                                    </Link>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}