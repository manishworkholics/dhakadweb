"use client";

import React from "react";
import { useState, useEffect } from "react";
export default function OurTeam() {

    const [successStories, setsuccessStories] = useState([]);
    const [loading, setLoading] = useState(true);

    const getSuccess = async () => {
        try {
            const res = await fetch("http://206.189.130.102:5000/api/success")
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
            <section className="py-5 text-center">
                <div className="container">
                    <h2 className="fw-bold m-0">
                        <span className="text-D4AF37 text-center"> Meet </span> Our Team
                    </h2>
                    <p className="mt-3">No success stories found at this time.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-5">
            <div className="container">
                <div className="d-flex justify-content-center align-items-center mb-4 w-100">
                    {/* Title on the Left */}
                    <h2 className="fw-bold m-0 team">
                        <span className="text-D4AF37 "> Meet </span> Our Team
                    </h2>
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

                                <div
                                    className="bg-white p-lg-2 p-md-2 p-1 text-center mx-lg-4 mx-md-4 mx-2 rounded-3"
                                    style={{
                                        bottom: "30px",
                                        position: "relative",
                                        boxShadow:
                                            "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                    }}
                                >
                                    <h5 className="fw-bold mb-1 text-danger" style={{ fontSize: "15px" }}>
                                        {item.name || `User ${index + 1}`}
                                    </h5>
                                    <p className="text-muted small m-0" style={{ fontSize: "12px" }}>
                                        Marketing Manager
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}