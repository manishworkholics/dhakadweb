"use client"

import React from 'react'
import Header from '../components/Header/Page'
import Link from 'next/link'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { useRouter } from "next/navigation";

const sendotp = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        phone: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        if (!formData.phone) return "Phone number is required";
        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(formData.phone))
            return "Phone number must be 10 digits";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorMessage = validateForm();
        if (errorMessage) {
            toast.error(errorMessage);
            return;
        }
        try {
            const response = await axios.post('http://143.110.244.163:5000/api/auth/send-otp', {
                phone: formData.phone,
            });
            if (response?.data?.success) {
                toast.success("OTP sent successfully!");
                localStorage.setItem("phone", formData.phone);
                router.push("/enterotp");
            } else {
                toast.error(response?.data?.message || "Failed to send OTP");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Server Error");
        }
    }

    return (
        <div className='login-page bg-FDFBF7'>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="">
                <Header />
            </div>
            <div className="login-content py-5">
                <div className="container">
                    <div className="row">
                        {/* sendotp-Form */}
                        <div className="col-12 col-md-7 col-lg-6 col-xl-5 col-xxl-4 mx-auto mb-4">
                            <div className="card shadow border-0 rounded-4">
                                <div className="card-body p-4">
                                    <div className="login-form">
                                        <div className="text-center">
                                            {/* <img src="/dhakadweb/assets/images/dhakad-logo.png" alt="" className="mb-4" /> */}
                                            <h5 className='text-center mb-4 fw-medium'> Please Login</h5>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label text-6B6B6B">Phone Number</label>
                                                <input type="text" name='phone' value={formData.phone} onChange={handleChange} className="form-control" placeholder='Enter your phone number' />
                                            </div>
                                            <div className="d-flex justify-content-between">
                                            </div>
                                            <button
                                                type="submit"
                                                className="btn bg-D4AF37 w-100 text-white mb-2">Send OTP</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Download-App */}
                        <div className="col-12">
                            <div className="card border-0 rounded-5 bg-FFEEEE mt-5">
                                <div className="card-body p-5 mt-4">
                                    <div className="row">
                                        <div className="col-12 col-lg-6 mb-5 mb-lg-0">
                                            <button className="btn btn-outline-warning rounded-pill bg-FFF1C4 text-dark mb-3 px-4">Download</button>
                                            <h3 className='fw-semibold mb-3'>Dhakar Matrimony
                                                <span className="text-danger"> Mobile App</span>
                                            </h3>
                                            <p className='mb-4 text-6B6B6B'>Access quick & simple search, instant updates and a great user experience on your phone. Download our app which are the best matrimony app for dhakar samaj.</p>
                                            <div className="row">
                                                <div className="col-12 col-lg-9 me-auto ">
                                                    <div className="card border-0 rounded-5 bg-white shadow p-3 w-fit-content">
                                                        <div className="row">
                                                            <p className="mb-4 text-6B6B6B text-center">Point your phone camera at the QR code or use one of the download links below</p>
                                                            <div className="col-12 col-lg-6 mb-lg-0 mb-4">
                                                                <div className="text-center">
                                                                    <img src="/dhakadweb/assets/images/download-barcode.png" alt="qr-code" className='w-75' />
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-lg-6 d-flex flex-column justify-content-center align-items-center">
                                                                <img src="/dhakadweb/assets/images/appstore.png" alt="app-store" className='mb-2 w-75' />
                                                                <img src="/dhakadweb/assets/images/playstore.png" alt="google-play" className='w-75' />
                                                            </div>
                                                            <p className="mt-4 text-6B6B6B text-center">Or
                                                                <span className="text-danger fw-medium"> Get Download </span>
                                                                on yur SMS/Email
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className="">
                                                <img src="/dhakadweb/assets/images/download-app-img.png" alt="" className="w-100" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default sendotp