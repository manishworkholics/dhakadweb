// myprofile/components/Shared/ViewAllButton.jsx
"use client";

import React from 'react';

// The component takes a label and an optional action target
export default function ViewAllButton({ label = "View All", href = "#", onClick }) {
    
    // We use an anchor tag <a> for easy routing (standard in Next.js or React Router)
    // We can also use a button and call onClick if needed.
    return (
        <a 
            href={href} 
            onClick={onClick}
            className="view-all-button"
        >
            {label}
        </a>
    );
}