// myprofile/components/Dashboard/ProfileCompleteness.jsx
"use client";

import React from 'react';

// Define standard SVG properties for a consistent look
const radius = 50; // Radius of the circle
const circumference = 2 * Math.PI * radius; // Full circumference
const center = 60; // Center point of the SVG viewbox (120x120)

export default function ProfileCompleteness({ percentage = 60 }) {
    // Calculate the stroke-dashoffset for the progress arc
    // offset = (1 - percentage/100) * circumference
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="profile-completeness-card">
            <div className="d-flex">
                <h6>Profile completeness score  </h6>
            </div>
            <div className="completeness-gauge">
                <svg
                    viewBox="0 0 120 120" // Define the area of the SVG
                    className="progress-ring"
                >
                    {/* 1. Track Circle (the gray background) */}
                    <circle
                        className="progress-ring-track"
                        cx={center}
                        cy={center}
                        r={radius}
                    />

                    {/* 2. Progress Arc (the red filling) */}
                    <circle
                        className="progress-ring-progress"
                        cx={center}
                        cy={center}
                        r={radius}
                        strokeDasharray={circumference} // Total length of the stroke
                        strokeDashoffset={offset}       // How much of the stroke is visible
                    />
                </svg>

                {/* Percentage Text in the center */}
                <div className="percentage-text">
                    <span className="percent-number">{percentage}%</span>
                </div>
            </div>

            {/* Action buttons and text below the gauge */}
            <div className="completeness-actions d-flex justify-content-around gap-1 mt-3">
                <button className="btn border-secondary"><i class="fa-solid fa-user me-1 text-D4AF37 "></i>Add Photo</button>
                <button className="btn border-secondary"> <i class="fa-solid fa-house me-1 text-D4AF37 "></i>Family Details</button>
            </div>
        </div>
    );
}