"use client";

import React, { useState, useEffect } from "react";
import { buildApiUrl } from "@/lib/api";

export default function OurTeam() {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);

    const getTeam = async () => {
        try {
            const res = await fetch(buildApiUrl("/api/team"));
            const data = await res.json();

            if (data.success) {
                // ✅ Sort by order
                const sorted = data.members.sort((a, b) => a.order - b.order);

                // ✅ Only active members
                const active = sorted.filter((item) => item.isActive);

                setTeam(active);
            }

            setLoading(false);
        } catch (error) {
            console.error("Error fetching team:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getTeam();
    }, []);

    // ✅ only first 4 members (same logic as before)
    const displayedTeam = team.slice(0, 4);

    // 🔄 Loading State
    if (loading) {
        return (
            <section className="py-5 text-center" style={{ background: "#fff" }}>
                <div className="container">
                    <p>Loading team...</p>
                </div>
            </section>
        );
    }

    // ❌ No Data
    if (displayedTeam.length === 0) {
        return (
            <section className="py-5 text-center">
                <div className="container">
                    <h2 className="fw-bold m-0">
                        <span className="text-D4AF37 text-center"> Meet </span> Our Team
                    </h2>
                    <p className="mt-3">No team members found.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-lg-5 py-4">
            <div className="container">
                <div className="d-flex justify-content-center align-items-center mb-4 w-100">
                    <h2 className="fw-bold m-0 team">
                        <span className="text-D4AF37 "> Meet </span> Our Team
                    </h2>
                </div>

                {/* 🔥 TEAM GRID */}
                <div className="row g-4 justify-content-center">
                    {displayedTeam.map((item, index) => (
                        <div key={item._id} className="col-lg-3 col-md-4 col-6">
                            <div className="text-center">

                                {/* IMAGE */}
                                <div
                                    className="rounded-4 overflow-hidden mb-3"
                                    style={{ height: "260px" }}
                                >
                                    <img
                                        src={item.photo || "/assets/images/sidebar.png"}
                                        alt={item.name}
                                        className="w-100 h-100 object-fit-cover rounded-4"
                                    />
                                </div>

                                {/* INFO CARD */}
                                <div
                                    className="bg-white p-lg-2 p-md-2 p-1 text-center mx-lg-4 mx-md-4 mx-2 rounded-3"
                                    style={{
                                        bottom: "50px",
                                        position: "relative",
                                        boxShadow:
                                            "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                    }}
                                >
                                    {/* NAME */}
                                    <h5
                                        className="fw-bold mb-1 text-danger"
                                        style={{ fontSize: "15px" }}
                                    >
                                        {item.name}
                                    </h5>

                                    {/* POST */}
                                    <p
                                        className="text-muted small m-0"
                                        style={{ fontSize: "12px" }}
                                    >
                                        {item.post}
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
