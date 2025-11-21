// myprofile/components/Dashboard/PaidMembershipCard.jsx
"use client";

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
        <div className="paid-member-card">
            {/* Discount Header */}
            <div className="discount-header">
                <p className="discount-text">
                    Get up to <span className="discount-percentage">35% OFF</span> on paid membership!
                </p>
            </div>
            
            {/* List of Features */}
            <ul className="benefits-list">
                {benefits.map((benefit, index) => (
                    <li key={index} className="benefit-item">
                        {/* Using a simple checkmark emoji/icon placeholder */}
                        <span className="check-icon">✓</span> {benefit}
                    </li>
                ))}
            </ul>

            {/* Call to Action Button */}
            <div className="cta-container">
                <button className="membership-cta-btn">
                    See membership plans
                </button>
            </div>
        </div>
    );
}