// myprofile/pages/Profile.jsx
"use client";

import React, { useState } from 'react';
import DashboardLayout from "../components/Layout/DashboardLayout";

// A reusable section component for organization
const ProfileSection = ({ title, children }) => (
    <div className="profile-section">
        <h4 className="section-title-profile">{title}</h4>
        <div className="section-content-grid">
            {children}
        </div>
        <hr className="section-divider" />
    </div>
);

// A simple reusable input field
const FormInput = ({ label, type = "text", value, onChange, name }) => (
    <div className="form-group">
        <label className="form-label">{label}</label>
        <input 
            type={type} 
            name={name}
            value={value}
            onChange={onChange}
            className="form-input"
        />
    </div>
);

export default function Plan() {
    const [profileData, setProfileData] = useState({
        fullName: "John Doe",
        age: 30,
        height: "5'10\"",
        religion: "Hindu",
        caste: "Dhakad",
        education: "B.Tech",
        occupation: "Software Engineer",
        income: "8-10 Lacs/Year",
        fatherName: "Mr. Ramesh Doe",
        motherName: "Mrs. Sita Doe",
        familyType: "Nuclear",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Saving Profile Data:", profileData);
        // Add API call logic here to save data
    };

    return (
        <DashboardLayout>
            <div className="profile-page-content">
                <h2 className="page-header-title">My Profile Details</h2>

                <form onSubmit={handleSubmit}>

                    {/* Basic Details Section */}
                    <ProfileSection title="Basic & Contact Details">
                        <FormInput 
                            label="Full Name" 
                            name="fullName"
                            value={profileData.fullName} 
                            onChange={handleChange} 
                        />
                        <FormInput 
                            label="Age" 
                            type="number" 
                            name="age"
                            value={profileData.age} 
                            onChange={handleChange} 
                        />
                         <FormInput 
                            label="Height" 
                            name="height"
                            value={profileData.height} 
                            onChange={handleChange} 
                        />
                        <FormInput 
                            label="Religion" 
                            name="religion"
                            value={profileData.religion} 
                            onChange={handleChange} 
                        />
                        <FormInput 
                            label="Caste/Sub-Caste" 
                            name="caste"
                            value={profileData.caste} 
                            onChange={handleChange} 
                        />
                        {/* More fields like Phone, Email, Location... */}
                    </ProfileSection>
                    
                    {/* Education & Career Section */}
                    <ProfileSection title="Education & Career">
                        <FormInput 
                            label="Highest Education" 
                            name="education"
                            value={profileData.education} 
                            onChange={handleChange} 
                        />
                        <FormInput 
                            label="Occupation" 
                            name="occupation"
                            value={profileData.occupation} 
                            onChange={handleChange} 
                        />
                        <FormInput 
                            label="Annual Income" 
                            name="income"
                            value={profileData.income} 
                            onChange={handleChange} 
                        />
                        {/* More fields like workplace details... */}
                    </ProfileSection>

                    {/* Family Details Section */}
                    <ProfileSection title="Family Background">
                        <FormInput 
                            label="Father's Name" 
                            name="fatherName"
                            value={profileData.fatherName} 
                            onChange={handleChange} 
                        />
                        <FormInput 
                            label="Mother's Name" 
                            name="motherName"
                            value={profileData.motherName} 
                            onChange={handleChange} 
                        />
                        <FormInput 
                            label="Family Type (Nuclear/Joint)" 
                            name="familyType"
                            value={profileData.familyType} 
                            onChange={handleChange} 
                        />
                        {/* More fields like siblings, family values... */}
                    </ProfileSection>


                    {/* Submit Button */}
                    <div className="save-button-container">
                        <button type="submit" className="save-profile-btn">
                            Save Profile Changes
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}