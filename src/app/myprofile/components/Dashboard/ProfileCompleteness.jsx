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
        <div className="profile-completeness-card">
            <div className="d-flex">
                <h6>Profile Completion Score</h6>
            </div>

            <div className="completeness-gauge">
                <svg viewBox="0 0 120 120" className="progress-ring">
                    <circle
                        className="progress-ring-track"
                        cx={center}
                        cy={center}
                        r={radius}
                    />

                    <circle
                        className="progress-ring-progress"
                        cx={center}
                        cy={center}
                        r={radius}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                    />
                </svg>

                <div className="percentage-text">
                    <span className="percent-number">{percent}%</span>
                </div>
            </div>

            <div className="completeness-actions d-flex justify-content-around gap-1">
                <Link href={'/myprofile/profile'} className="btn border-secondary py-1 px-1 ">
                    <i className="fa-solid fa-user me-1 text-D4AF37"></i> Add Photo
                </Link>
                <Link href={'/myprofile/profile'} className="btn border-secondary px-1  py-1">
                    <i className="fa-solid fa-house me-1 text-D4AF37"></i> Family Details
                </Link>
            </div>
        </div>
    );
}
