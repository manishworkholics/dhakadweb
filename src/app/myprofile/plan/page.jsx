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
            <div className="row">
                <div className="col-lg-4 col-md-4 col-12">
                    <div className="head-text">
                        <h5 className='fw-semibold'>YOUR PLAN DETAILS</h5>
                    </div>
                    <div className="card ">
                        <div className="card-header">
                            <h6 className='mb-0 fw-semibold'> Current Plan</h6>
                        </div>
                        <div className="card-body text-center">
                            <img src="/dhakadweb/assets/images/plan.png" alt="" className='my-4' />
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        </div>
                        <div className="card-footer text-body-secondary">
                            <h6>Rs. 848 + 18% GST = Rs. 1000.64 Rs. 1000</h6>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="head-text">
                        <h5 className='fw-semibold'>ALL PLAN</h5>
                    </div>
                    <div className="content-table rounded-3">
                        <table className="table table-bordered rounded-3">
                            <tbody className='rounded-3'>
                                <tr>
                                    <td className="fw-semibold">Event</td>
                                    <td className="">Rs. 848 + 18% GST = Rs. 1000.64 Rs. 1000</td>
                                    <td>3 Month <button type="button" className="btn btn-light bg-F4F4F4 ms-2">Buy Now</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="fw-semibold">Silver Plan</td>
                                    <td className="">Rs. 848 + 18% GST = Rs. 1000.64 Rs. 1000</td>
                                    <td>6 Month <button type="button" className="btn bg-F4F4F4 ms-2">Buy Now</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="fw-semibold">Gold Plan</td>
                                    <td className="">Rs. 848 + 18% GST = Rs. 1000.64 Rs. 1000</td>
                                    <td>9 Month <button type="button" className="btn bg-F4F4F4 ms-2">Buy Now</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="fw-semibold">Platinum Plan</td>
                                    <td className="">Rs. 848 + 18% GST = Rs. 1000.64 Rs. 1000</td>
                                    <td>12 Month <button type="button" className="btn bg-F4F4F4 ms-2">Buy Now</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="fw-semibold">Life Time Plan</td>
                                    <td className="">Rs. 848 + 18% GST = Rs. 1000.64 Rs. 1000</td>
                                    <td>36 Month <button type="button" className="btn bg-F4F4F4 ms-2">Buy Now</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}