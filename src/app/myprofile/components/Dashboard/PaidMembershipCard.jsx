// myprofile/components/Dashboard/PaidMembershipCard.jsx
"use client";

import Link from 'next/link';
import React from 'react';

export default function PaidMembershipCard() {
    // List of key benefits to highlight
    const benefits = [
        "Call/WhatsApp with matches",
        "Unlimited messages",
        "Higher chances of response",
        "Show all photos",
    ];

    return (
        <div className="premium-box rounded-4 p-3 mb-4">

            {/* Top Title */}
            <div className="premium-header">
                ✨ Premium Member
            </div>

            {/* Inner Card */}
            <div className="premium-inner card rounded-4 p-3">
                <h6 className="mb-3 fw-semibold">Premium Member</h6>

                <ul className="list-unstyled premium-list mb-4">
                    <li>Call & WhatsApp</li>
                    <li>Unlimited messages</li>
                    <li>View all photos</li>
                </ul>
                <Link href="/myprofile/plan">
                    <button className="btn premium-btn rounded-3 w-100 text-black">
                        Upgrade Now
                    </button>
                </Link>
            </div>

        </div>
    );
}