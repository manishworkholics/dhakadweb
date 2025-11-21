// myprofile/pages/Setting.jsx
"use client";

import React, { useState } from 'react';
import DashboardLayout from "../components/Layout/DashboardLayout";

// --- Sub-Components for Tabs ---

// 1. Account Management (Email, Password, Delete Account)
const AccountSettings = () => (
    <div className="settings-tab-content">
        <h4 className="setting-sub-title">Password & Email</h4>
        <div className="settings-form-section">
            <div className="form-group-setting">
                <label className="form-label">Change Password</label>
                <input type="password" placeholder="Current Password" className="form-input" />
                <input type="password" placeholder="New Password" className="form-input" />
                <button className="setting-action-btn primary-btn">Update Password</button>
            </div>
            
            <h4 className="setting-sub-title danger-zone-title">Danger Zone</h4>
            <p className="danger-zone-text">Permanently delete your account and profile data.</p>
            <button className="setting-action-btn delete-btn">Delete Account</button>
        </div>
    </div>
);

// 2. Privacy & Visibility (Who can see photos, phone number)
const PrivacySettings = () => (
    <div className="settings-tab-content">
        <h4 className="setting-sub-title">Profile Visibility</h4>
        <div className="settings-form-section">
            <div className="setting-toggle-group">
                <label className="setting-toggle-label">Show my profile to non-paid members:</label>
                <input type="checkbox" defaultChecked className="toggle-switch" />
            </div>
            <div className="setting-toggle-group">
                <label className="setting-toggle-label">Hide my full photos:</label>
                <input type="checkbox" className="toggle-switch" />
            </div>
            <div className="setting-toggle-group">
                <label className="setting-toggle-label">Hide my phone number:</label>
                <input type="checkbox" defaultChecked className="toggle-switch" />
            </div>
            <button className="setting-action-btn primary-btn">Save Privacy Settings</button>
        </div>
    </div>
);

// 3. Partner Preferences (Age, Location, Education filters)
const PreferenceSettings = () => (
    <div className="settings-tab-content">
        <h4 className="setting-sub-title">Desired Partner Criteria</h4>
        <div className="settings-form-section grid-2-col">
            <div className="form-group-setting">
                <label className="form-label">Age Range (Min)</label>
                <input type="number" defaultValue={25} className="form-input" />
            </div>
            <div className="form-group-setting">
                <label className="form-label">Age Range (Max)</label>
                <input type="number" defaultValue={32} className="form-input" />
            </div>
            <div className="form-group-setting">
                <label className="form-label">Preferred Location</label>
                <select className="form-input">
                    <option>Indore</option>
                    <option>Bhopal</option>
                    <option>Mumbai</option>
                </select>
            </div>
            <div className="form-group-setting">
                <label className="form-label">Minimum Education</label>
                <select className="form-input">
                    <option>B.Tech</option>
                    <option>M.Tech</option>
                    <option>Graduate</option>
                </select>
            </div>
            
        </div>
        <button className="setting-action-btn primary-btn">Update Preferences</button>
    </div>
);

// --- Main Setting Page Component ---

export default function SettingPage() {
    const [activeTab, setActiveTab] = useState('account'); // 'account', 'privacy', 'preferences'

    return (
        <DashboardLayout>
            <div className="setting-page-content">
                <h2 className="page-header-title">Account Settings</h2>

                {/* Tab Navigation */}
                <div className="settings-tabs">
                    <button 
                        className={`tab-button ${activeTab === 'account' ? 'active' : ''}`}
                        onClick={() => setActiveTab('account')}
                    >
                        Account
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'privacy' ? 'active' : ''}`}
                        onClick={() => setActiveTab('privacy')}
                    >
                        Privacy & Visibility
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'preferences' ? 'active' : ''}`}
                        onClick={() => setActiveTab('preferences')}
                    >
                        Partner Preferences
                    </button>
                </div>

                {/* Tab Content */}
                <div className="tab-content-area-setting">
                    {activeTab === 'account' && <AccountSettings />}
                    {activeTab === 'privacy' && <PrivacySettings />}
                    {activeTab === 'preferences' && <PreferenceSettings />}
                </div>
            </div>
        </DashboardLayout>
    );
}