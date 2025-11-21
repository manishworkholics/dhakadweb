// myprofile/components/Layout/Sidebar.jsx
"use client";

import React from 'react';
import Link from 'next/link'; // 1. Import the Link component
// Import usePathname for checking the active route
import { usePathname } from 'next/navigation'; 

const navItems = [
    { name: "Dashboard", path: "/myprofile", icon: "🏠" },
    { name: "Profile", path: "/myprofile/profile", icon: "👤" },
    { name: "Interests", path: "/myprofile/interests", icon: "💖" },
    { name: "Chat list", path: "/myprofile/chatlist", icon: "💬" },
    { name: "Shortlist", path: "/myprofile/shortlist", icon: "🔖" },
    { name: "Plan", path: "/myprofile/plan", icon: "⭐" },
    { name: "Notification", path: "/myprofile/notification", icon: "🔔" },
    { name: "Setting", path: "/myprofile/setting", icon: "⚙️" },
];

export default function Sidebar() {
    
    // 2. Use the Next.js usePathname hook to get the current route
    const currentPath = usePathname();

    const isActive = (path) => {
        const normalizedCurrentPath = currentPath.replace(/\/$/, '');
        const normalizedLinkPath = path.replace(/\/$/, '');

        // Dashboard is active only if it matches exactly
        if (normalizedLinkPath === '/myprofile') {
            return normalizedCurrentPath === '/myprofile';
        }
        
        // For all other pages, check if the current path starts with the link's path
        return normalizedCurrentPath.startsWith(normalizedLinkPath);
    };

    const handleLogout = (e) => {
        e.preventDefault();
        console.log("User logged out.");
        // Use Next.js router or a standard redirect for hard navigation like logout
        window.location.href = "/login";
    };

    return (
        <div className="sidebar-wrapper">
            
            {/* ... Sidebar User Card content ... */}

            <nav className="sidebar-nav">
                <ul className="nav-menu">
                    {navItems.map((item) => (
                        <li key={item.name} className="nav-item">
                            
                            {/* 3. **CRITICAL CHANGE: Use <Link> instead of <a>** */}
                            <Link 
                                href={item.path} 
                                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                {item.name}
                            </Link>
                            
                        </li>
                    ))}

                    <li className="nav-item logout-item">
                         <a 
                            href="#" 
                            onClick={handleLogout} 
                            className="nav-link logout-link"
                        >
                            <span className="nav-icon">➡️</span>
                            Logout
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}