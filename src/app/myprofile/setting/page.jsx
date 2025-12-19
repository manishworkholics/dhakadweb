// myprofile/pages/Setting.jsx
"use client";

import React, { useState } from 'react';
import DashboardLayout from "../components/Layout/DashboardLayout";

const tabs = [
    { id: "account", label: "Change Email & Password" },
    { id: "privacy", label: "Privacy" },
    { id: "profile", label: "Profile Settings" },
    { id: "deactivate", label: "Deactivate Profile" },
    { id: "delete", label: "Delete Profile" },
    { id: "ignored", label: "Ignored Profiles" },
    { id: "blocked", label: "Blocked Profiles" },
];

// 1. Account Management (Email, Password, Delete Account)
const AccountSettings = () => (
    <div className="settings-tab-content mt-3">
        <div className="card p-3 rounded-3">
            <div className="tab-head">
                <h5 className='fw-semibold'>Edit e-mail Address</h5>
                <p className=''>A valid e-mail id will be used to send you partner search mailers, member to member communication mailers and special offers.</p>
            <div className="btn-input d-flex align-items-center">
                <div className="input w-25">
                    <input type="email" className="form-control w-100 rounded-3 fs-6" placeholder="abc@gmail.com" aria-label="email" aria-describedby="basic-addon1" />
                </div>
                <div className="btn">
                    <button className='btn bg-D4AF37 text-white rounded-3 px-4 py-1 fs-6 me-3'>Save</button>
                    <button className='btn bg-DFDFDF text-dark rounded-3 px-4 py-1 fs-6'>Reset</button>
                </div>
            </div>
            </div>
        </div>
        <div className="card p-3 rounded-3 mt-3">
            <div className="tab-head">
                <h5 className='fw-semibold'>Change Password</h5>
                <p className=''>Your password must have a minimum of 6 characters. We recommend you choose an alphanumeric password. E.g.: Matri123</p>
            <div className="btn-input d-flex align-items-center">
                <div className="input w-50 d-flex">
                    <input type="password" className="form-control w-100 rounded-3 fs-12" placeholder="Enter Current Password" aria-label="password" aria-describedby="basic-addon1" />
                    <input type="password" className="form-control w-100 rounded-3 mx-2 fs-12" placeholder="Enter New Password" aria-label="password" aria-describedby="basic-addon1" />
                    <input type="password" className="form-control w-100 rounded-3 fs-12" placeholder="Confirm Password" aria-label="password" aria-describedby="basic-addon1" />
                </div>
                <div className="btn">
                    <button className='btn bg-D4AF37 text-white rounded-3 px-3 py-1 fs-6 me-3'>Reset Password</button>
                </div>
            </div>
            </div>
        </div>
    </div>
);

// 2. Privacy & Visibility (Who can see photos, phone number)
const PrivacySettings = () => (
    <div className="settings-tab-content mt-3">
        <div className="card p-3 rounded-3">
            <div className="tab-head">
                <h5 className='fw-semibold'>Edit e-mail Address</h5>
                <p className=''>A valid e-mail id will be used to send you partner search mailers, member to member communication mailers and special offers.</p>
            <div className="btn-input d-flex align-items-center">
                <div className="input w-25">
                    <input type="email" className="form-control w-100 rounded-3 fs-6" placeholder="abc@gmail.com" aria-label="email" aria-describedby="basic-addon1" />
                </div>
                <div className="btn">
                    <button className='btn bg-D4AF37 text-white rounded-3 px-4 py-1 fs-6 me-3'>Save</button>
                    <button className='btn bg-DFDFDF text-dark rounded-3 px-4 py-1 fs-6'>Reset</button>
                </div>
            </div>
            </div>
        </div>
        <div className="card p-3 rounded-3 mt-3">
            <div className="tab-head">
                <h5 className='fw-semibold'>Change Password</h5>
                <p className=''>Your password must have a minimum of 6 characters. We recommend you choose an alphanumeric password. E.g.: Matri123</p>
            <div className="btn-input d-flex align-items-center">
                <div className="input w-50 d-flex">
                    <input type="password" className="form-control w-100 rounded-3 fs-12" placeholder="Enter Current Password" aria-label="password" aria-describedby="basic-addon1" />
                    <input type="password" className="form-control w-100 rounded-3 mx-2 fs-12" placeholder="Enter New Password" aria-label="password" aria-describedby="basic-addon1" />
                    <input type="password" className="form-control w-100 rounded-3 fs-12" placeholder="Confirm Password" aria-label="password" aria-describedby="basic-addon1" />
                </div>
                <div className="btn">
                    <button className='btn bg-D4AF37 text-white rounded-3 px-3 py-1 fs-6 me-3'>Reset Password</button>
                </div>
            </div>
            </div>
        </div>
    </div>
);

// 3. Partner Preferences (Age, Location, Education filters)
const PreferenceSettings = () => (
    <div className="settings-tab-content mt-3">
        <div className="card p-3 rounded-3">
            <div className="tab-head">
                <h5 className='fw-semibold'>Edit e-mail Address</h5>
                <p className=''>A valid e-mail id will be used to send you partner search mailers, member to member communication mailers and special offers.</p>
            <div className="btn-input d-flex align-items-center">
                <div className="input w-25">
                    <input type="email" className="form-control w-100 rounded-3 fs-6" placeholder="abc@gmail.com" aria-label="email" aria-describedby="basic-addon1" />
                </div>
                <div className="btn">
                    <button className='btn bg-D4AF37 text-white rounded-3 px-4 py-1 fs-6 me-3'>Save</button>
                    <button className='btn bg-DFDFDF text-dark rounded-3 px-4 py-1 fs-6'>Reset</button>
                </div>
            </div>
            </div>
        </div>
        <div className="card p-3 rounded-3 mt-3">
            <div className="tab-head">
                <h5 className='fw-semibold'>Change Password</h5>
                <p className=''>Your password must have a minimum of 6 characters. We recommend you choose an alphanumeric password. E.g.: Matri123</p>
            <div className="btn-input d-flex align-items-center">
                <div className="input w-50 d-flex">
                    <input type="password" className="form-control w-100 rounded-3 fs-12" placeholder="Enter Current Password" aria-label="password" aria-describedby="basic-addon1" />
                    <input type="password" className="form-control w-100 rounded-3 mx-2 fs-12" placeholder="Enter New Password" aria-label="password" aria-describedby="basic-addon1" />
                    <input type="password" className="form-control w-100 rounded-3 fs-12" placeholder="Confirm Password" aria-label="password" aria-describedby="basic-addon1" />
                </div>
                <div className="btn">
                    <button className='btn bg-D4AF37 text-white rounded-3 px-3 py-1 fs-6 me-3'>Reset Password</button>
                </div>
            </div>
            </div>
        </div>
    </div>
);

const DeactivateProfile = () =>(
    <div className="settings-tab-content mt-3">
        <div className="card p-3 rounded-3">
            <div className="tab-head">
                <h5 className='fw-semibold'>Edit e-mail Address</h5>
                <p className=''>A valid e-mail id will be used to send you partner search mailers, member to member communication mailers and special offers.</p>
            <div className="btn-input d-flex align-items-center">
                <div className="input w-25">
                    <input type="email" className="form-control w-100 rounded-3 fs-6" placeholder="abc@gmail.com" aria-label="email" aria-describedby="basic-addon1" />
                </div>
                <div className="btn">
                    <button className='btn bg-D4AF37 text-white rounded-3 px-4 py-1 fs-6 me-3'>Save</button>
                    <button className='btn bg-DFDFDF text-dark rounded-3 px-4 py-1 fs-6'>Reset</button>
                </div>
            </div>
            </div>
        </div>
        <div className="card p-3 rounded-3 mt-3">
            <div className="tab-head">
                <h5 className='fw-semibold'>Change Password</h5>
                <p className=''>Your password must have a minimum of 6 characters. We recommend you choose an alphanumeric password. E.g.: Matri123</p>
            <div className="btn-input d-flex align-items-center">
                <div className="input w-50 d-flex">
                    <input type="password" className="form-control w-100 rounded-3 fs-12" placeholder="Enter Current Password" aria-label="password" aria-describedby="basic-addon1" />
                    <input type="password" className="form-control w-100 rounded-3 mx-2 fs-12" placeholder="Enter New Password" aria-label="password" aria-describedby="basic-addon1" />
                    <input type="password" className="form-control w-100 rounded-3 fs-12" placeholder="Confirm Password" aria-label="password" aria-describedby="basic-addon1" />
                </div>
                <div className="btn">
                    <button className='btn bg-D4AF37 text-white rounded-3 px-3 py-1 fs-6 me-3'>Reset Password</button>
                </div>
            </div>
            </div>
        </div>
    </div>
)

const DeleteProfile = () =>(
    <div className="settings-tab-content mt-3">
        <div className="card p-3 rounded-3">
            <div className="tab-head">
                <h5 className='fw-semibold'>Edit e-mail Address</h5>
                <p className=''>A valid e-mail id will be used to send you partner search mailers, member to member communication mailers and special offers.</p>
            <div className="btn-input d-flex align-items-center">
                <div className="input w-25">
                    <input type="email" className="form-control w-100 rounded-3 fs-6" placeholder="abc@gmail.com" aria-label="email" aria-describedby="basic-addon1" />
                </div>
                <div className="btn">
                    <button className='btn bg-D4AF37 text-white rounded-3 px-4 py-1 fs-6 me-3'>Save</button>
                    <button className='btn bg-DFDFDF text-dark rounded-3 px-4 py-1 fs-6'>Reset</button>
                </div>
            </div>
            </div>
        </div>
        <div className="card p-3 rounded-3 mt-3">
            <div className="tab-head">
                <h5 className='fw-semibold'>Change Password</h5>
                <p className=''>Your password must have a minimum of 6 characters. We recommend you choose an alphanumeric password. E.g.: Matri123</p>
            <div className="btn-input d-flex align-items-center">
                <div className="input w-50 d-flex">
                    <input type="password" className="form-control w-100 rounded-3 fs-12" placeholder="Enter Current Password" aria-label="password" aria-describedby="basic-addon1" />
                    <input type="password" className="form-control w-100 rounded-3 mx-2 fs-12" placeholder="Enter New Password" aria-label="password" aria-describedby="basic-addon1" />
                    <input type="password" className="form-control w-100 rounded-3 fs-12" placeholder="Confirm Password" aria-label="password" aria-describedby="basic-addon1" />
                </div>
                <div className="btn">
                    <button className='btn bg-D4AF37 text-white rounded-3 px-3 py-1 fs-6 me-3'>Reset Password</button>
                </div>
            </div>
            </div>
        </div>
    </div>
)
const IgnoredProfiles = () =>(
    <div className="settings-tab-content mt-3">
        <div className="card p-3 rounded-3">
            <div className="tab-head">
                <h5 className='fw-semibold'>Edit e-mail Address</h5>
                <p className=''>A valid e-mail id will be used to send you partner search mailers, member to member communication mailers and special offers.</p>
            <div className="btn-input d-flex align-items-center">
                <div className="input w-25">
                    <input type="email" className="form-control w-100 rounded-3 fs-6" placeholder="abc@gmail.com" aria-label="email" aria-describedby="basic-addon1" />
                </div>
                <div className="btn">
                    <button className='btn bg-D4AF37 text-white rounded-3 px-4 py-1 fs-6 me-3'>Save</button>
                    <button className='btn bg-DFDFDF text-dark rounded-3 px-4 py-1 fs-6'>Reset</button>
                </div>
            </div>
            </div>
        </div>
        <div className="card p-3 rounded-3 mt-3">
            <div className="tab-head">
                <h5 className='fw-semibold'>Change Password</h5>
                <p className=''>Your password must have a minimum of 6 characters. We recommend you choose an alphanumeric password. E.g.: Matri123</p>
            <div className="btn-input d-flex align-items-center">
                <div className="input w-50 d-flex">
                    <input type="password" className="form-control w-100 rounded-3 fs-12" placeholder="Enter Current Password" aria-label="password" aria-describedby="basic-addon1" />
                    <input type="password" className="form-control w-100 rounded-3 mx-2 fs-12" placeholder="Enter New Password" aria-label="password" aria-describedby="basic-addon1" />
                    <input type="password" className="form-control w-100 rounded-3 fs-12" placeholder="Confirm Password" aria-label="password" aria-describedby="basic-addon1" />
                </div>
                <div className="btn">
                    <button className='btn bg-D4AF37 text-white rounded-3 px-3 py-1 fs-6 me-3'>Reset Password</button>
                </div>
            </div>
            </div>
        </div>
    </div>
)
const BlockedProfiles = () =>(
    <div className="settings-tab-content mt-3">
        <div className="card p-3 rounded-3">
            <div className="tab-head">
                <h5 className='fw-semibold'>Edit e-mail Address</h5>
                <p className=''>A valid e-mail id will be used to send you partner search mailers, member to member communication mailers and special offers.</p>
            <div className="btn-input d-flex align-items-center">
                <div className="input w-25">
                    <input type="email" className="form-control w-100 rounded-3 fs-6" placeholder="abc@gmail.com" aria-label="email" aria-describedby="basic-addon1" />
                </div>
                <div className="btn">
                    <button className='btn bg-D4AF37 text-white rounded-3 px-4 py-1 fs-6 me-3'>Save</button>
                    <button className='btn bg-DFDFDF text-dark rounded-3 px-4 py-1 fs-6'>Reset</button>
                </div>
            </div>
            </div>
        </div>
        <div className="card p-3 rounded-3 mt-3">
            <div className="tab-head">
                <h5 className='fw-semibold'>Change Password</h5>
                <p className=''>Your password must have a minimum of 6 characters. We recommend you choose an alphanumeric password. E.g.: Matri123</p>
            <div className="btn-input d-flex align-items-center">
                <div className="input w-50 d-flex">
                    <input type="password" className="form-control w-100 rounded-3 fs-12" placeholder="Enter Current Password" aria-label="password" aria-describedby="basic-addon1" />
                    <input type="password" className="form-control w-100 rounded-3 mx-2 fs-12" placeholder="Enter New Password" aria-label="password" aria-describedby="basic-addon1" />
                    <input type="password" className="form-control w-100 rounded-3 fs-12" placeholder="Confirm Password" aria-label="password" aria-describedby="basic-addon1" />
                </div>
                <div className="btn">
                    <button className='btn bg-D4AF37 text-white rounded-3 px-3 py-1 fs-6 me-3'>Reset Password</button>
                </div>
            </div>
            </div>
        </div>
    </div>
)
// --- Main Setting Page Component ---

export default function SettingPage() {
    const [activeTab, setActiveTab] = useState('account'); // 'account', 'privacy', 'preferences'

    return (
        <DashboardLayout>
        <div className="setting-page-content">
    {/* Tabs */}
    <div className="settings-tabs d-flex flex-wrap gap-2">
        {tabs.map((tab) => (
            <button
                key={tab.id}
                className={`tab-button rounded-3 px-2 py-2 ${
                    activeTab === tab.id ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
            >
                {tab.label}
            </button>
        ))}
    </div>

    {/* Tab Content */}
    <div className="tab-content-area-setting">
        {activeTab === "account" && <AccountSettings />}
        {activeTab === "privacy" && <PrivacySettings />}
        {activeTab === "profile" && <PreferenceSettings />}
        {activeTab === "deactivate" && <DeactivateProfile />}
        {activeTab === "delete" && <DeleteProfile />}
        {activeTab === "ignored" && <IgnoredProfiles />}
        {activeTab === "blocked" && <BlockedProfiles />}
    </div>
</div>


        </DashboardLayout>
    );
}