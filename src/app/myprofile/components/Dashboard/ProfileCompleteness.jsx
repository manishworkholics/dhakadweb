"use client";

import Link from 'next/link';
import React from 'react';

const radius = 50;
const circumference = 2 * Math.PI * radius;
const center = 60;

export default function ProfileCompleteness({ percentage }) {

    const percent = Number(percentage) || 0;
    const offset = circumference - (percent / 100) * circumference;



    return (
        <div className="profile-status p-4 rounded-4 card border">

            {/* Title */}
            <div className="d-flex align-items-center mb-2">
                <h5 className="fw-medium me-2 ">Profile Completion</h5>
                <h4 className="fw-semibold text-warning">{percent}%</h4>
            </div>

            {/* Progress bar */}
            <div className="progress profile-progress mb-3 rounded-3">
                <div
                    className="progress-bar rounded-3"
                    style={{ width: `${percent}%` }}
                />
            </div>

            {/* Description */}
            <p className="text-muted small mb-3">
                Complete family details to get more matches
            </p>

            {/* Button */}
            <Link
                href="/myprofile/profile"
                className="btn premium-btn px-2 fw-medium text-black"
            >
                Complete Now
            </Link>
        </div>
    );
}
