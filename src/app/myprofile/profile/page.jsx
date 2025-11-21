// myprofile/profile/page.jsx
"use client";

import React from 'react';
import DashboardLayout from "../components/Layout/DashboardLayout";

// Reusable component for a specific detail/field
const DetailItem = ({ label, value }) => (
    <div className="profile-detail-item">
        <span className="detail-label">{label}:</span>
        <span className="detail-value">{value}</span>
    </div>
);

// Reusable component for each major section (Basic Details, Religion, etc.)
const ProfileSection = ({ title, children }) => (
    <div className="profile-edit-section">
        <div className="section-header-row">
            <h4 className="section-title-profile">{title}</h4>
            {/* The Edit button that appears in every section */}
            <button className="edit-btn">
                <span role="img" aria-label="Edit">✏️</span> Edit
            </button>
        </div>
        <div className="section-content-grid">
            {children}
        </div>
    </div>
);


export default function ProfilePage() {
    
    // --- Mock Data matching the Figma layout ---
    const profile = {
        name: "Rohit Sharma",
        id: "DM05399",
        age: 25,
        height: "5' 10''",
        weight: "70 KG",
        religion: "Hindu",
        caste: "Dhakad",
        motherTongue: "Hindi",
        maritalStatus: "Never Married",
        education: "Bachelors in Software Professional",
        occupation: "Software Engineer",
        income: "8 - 10 Lacs/Year",
        familyType: "Nuclear",
    };

    return (
        <DashboardLayout>
            <div className="profile-page-content-custom">

                {/* 1. Header and Profile Status (Matches the top of the Figma design) */}
                <div className="profile-header-status-grid">
                    
                    {/* Left Column: Photo and Verification */}
                    <div className="profile-photo-column">
                        <img 
                            src="https://i.pinimg.com/videos/thumbnails/originals/45/09/cc/4509cc574f238e5dd9bf42ce4c8d1749.0000000.jpg" 
                            alt={profile.name} 
                            className="main-profile-photo"
                        />
                        <button className="add-photo-btn">+ Add Photo/Video</button>
                        <p className="doc-verification-text">
                            <span role="img" aria-label="Doc Check">✅</span> Doc Verified
                        </p>
                    </div>

                    {/* Center Column: Basic Info & Contact */}
                    <div className="profile-info-column">
                        <h2 className="profile-name-header">{profile.name}</h2>
                        <p className="profile-id-text">Profile ID: {profile.id}</p>
                        <div className="profile-key-details">
                            <span>{profile.age} Yrs, {profile.height}</span> | 
                            <span> {profile.religion}, {profile.caste}</span> |
                            <span> {profile.education}</span> | 
                            <span> {profile.occupation}</span>
                        </div>
                        <div className="profile-contact-info">
                            <p className="contact-phone">📞 +91-9999999999</p>
                            <p className="contact-email">✉️ rohitsharma@gmail.com</p>
                        </div>
                    </div>

                    {/* Right Column: Paid Membership CTA (Reuse component style) */}
                    <div className="profile-paid-member-column">
                        <div className="paid-member-cta-box">
                             <h4 className="cta-title">BECOME A PAID MEMBER</h4>
                             <p className="cta-discount">Get **UPTO 20% OFF** on all membership!</p>
                             <ul>
                                <li>✅ Edit WhatsApp matches</li>
                                <li>✅ Unlimited messages</li>
                                <li>✅ Show full photos</li>
                             </ul>
                             <button className="see-membership-btn">See membership plans</button>
                             <button className="show-photos-btn">Show all photos</button>
                        </div>
                    </div>
                </div>

                {/* --- 2. PERSONAL INFORMATION Section (In My Own Words) --- */}
                <ProfileSection title="PERSONAL INFORMATION">
                    <p className="in-my-own-words-text">
                        I am a software professional with a Bachelor's degree, currently working in a private sector IT firm in Indore.
                    </p>
                </ProfileSection>

                {/* --- 3. BASIC DETAILS Section --- */}
                <ProfileSection title="Basic Details">
                    <DetailItem label="Name" value={profile.name} />
                    <DetailItem label="Age" value={`${profile.age} Years`} />
                    <DetailItem label="Weight" value={profile.weight} />
                    <DetailItem label="Marital Status" value={profile.maritalStatus} />
                    
                    <DetailItem label="Height" value={profile.height} />
                    <DetailItem label="Body Type" value="Average" />
                    <DetailItem label="Complexion" value="Fair" />
                    <DetailItem label="Eating Habits" value="Non-Vegetarian" />

                    {/* Add remaining details from the Figma image... */}
                </ProfileSection>

                {/* --- 4. RELIGION INFORMATION Section --- */}
                <ProfileSection title="Religion Information">
                    <DetailItem label="Religion" value={profile.religion} />
                    <DetailItem label="Caste" value={profile.caste} />
                    <DetailItem label="Mother Tongue" value={profile.motherTongue} />
                    {/* ... other fields */}
                </ProfileSection>
                
                {/* --- 5. LOCATION, PROFESSIONAL, FAMILY, HOBBIES sections (Structure only) --- */}
                <ProfileSection title="Location Information">
                    {/* Location fields will go here */}
                    <p className="placeholder-text">City, State, Country details...</p>
                </ProfileSection>

                <ProfileSection title="Professional Information">
                    {/* Professional fields will go here */}
                    <p className="placeholder-text">Education, Occupation, Income details...</p>
                </ProfileSection>

                <ProfileSection title="Family Details">
                    {/* Family fields will go here */}
                    <p className="placeholder-text">Family Type, Father's/Mother's Status...</p>
                </ProfileSection>
                
                <ProfileSection title="Hobbies and Interests">
                    {/* Hobbies fields will go here */}
                    <p className="placeholder-text">Hobby details, etc...</p>
                </ProfileSection>

            </div>
        </DashboardLayout>
    );
}