// myprofile/pages/Notification.jsx
"use client";

import React from 'react';
import DashboardLayout from "../components/Layout/DashboardLayout";





export default function NotificationPage() {
    return (
        <DashboardLayout>
            <div className="notification-page-content">
                <h3 className="page-header-title">Today</h3>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className="card p-2">
                            <div className="row">
                                <div className="col-8">
                                    <div className="image-text d-flex align-items-center">
                                        <div className="image" >
                                            <img src="/dhakadweb/assets/images/muskan.png" alt=""  style={{height:"70px", width:"70px", objectFit:"cover"}} className='rounded-circle'/>
                                        </div>
                                        <div className="text">
                                            <h6 className='fw-semibold mb-0'>Muskan Dhakad</h6>
                                            <p className='mb-0'>Viewed your profile</p>
                                            <p className='mb-0'>42 min</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12"></div>

                </div>


            </div>
        </DashboardLayout>
    );
}