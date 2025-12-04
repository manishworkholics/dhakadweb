"use client"

import React, { useRef, useState, useEffect } from 'react'
import Header from '../components/Header/Page'
import Link from 'next/link'
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';


const enterotpmail = () => {
    const router = useRouter();
    const [otp, setOtp] = useState(["", "", "", ""]);

    const [token, setToken] = useState("");
    const [user, setUser] = useState(null);
    const [saveotp, setSaveotp] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedToken = sessionStorage.getItem("token");
            const savedUser = sessionStorage.getItem("user");
            const savedOtp = sessionStorage.getItem("otp");

            if (savedToken) setToken(savedToken);
            if (savedUser) setUser(JSON.parse(savedUser));
            if (savedOtp) setSaveotp(JSON.parse(savedOtp));
        }
    }, []);


    const inputRefs = Array(4)
        .fill(0)
        .map(() => useRef(null));

    const handleChange = (value, index) => {
        if (!/^[0-9]?$/.test(value)) return; // allow only digits

        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        // Move to next input automatically
        if (value && index < 3) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();

        const finalOtp = otp.join("");
        if (finalOtp.length !== 4) {
            toast.error("Please enter valid 4-digit OTP");
            return;
        }

        const email = sessionStorage.getItem("email");
        const tempToken = sessionStorage.getItem("tempToken");

        if (!email || !tempToken) {
            toast.error("Session expired! Please login again.");
            router.push("/login");
            return;
        }

        try {
            const response = await axios.post(
                "http://206.189.130.102:5000/api/auth/verify-email-otp",
                {
                    email,
                    otp: finalOtp,
                },
                {
                    headers: { Authorization: `Bearer ${tempToken}` },
                }
            );

            if (response?.data?.success) {
                toast.success("Email Verified Successfully");

                // Replace temp token with final verified token
                sessionStorage.setItem("token", response?.data?.token);
                sessionStorage.setItem("user", JSON.stringify(response?.data?.user));
                sessionStorage.removeItem("tempToken");

                setTimeout(() => {
                    router.push("/registrationform");
                }, 800);
            } else {
                toast.error(response?.data?.message || "Invalid OTP");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Verification Failed");
        }
    };


    return (
        <div className='otp-page bg-FDFBF7' style={{ minHeight: '100vh' }}>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="">
                <Header />
            </div>
            <div className="otp-content py-5">
                <div className="container">
                    <div className="row">
                        {/* Login-Form */}
                        <div className="col-12 col-md-8 col-lg-7 col-xl-6 col-xxl-5 mx-auto mb-4">
                            <h6 className="">Basic Details</h6>
                            <div className="card shadow border-0 rounded-4">
                                <div className="card-body p-4">
                                    <div className="login-form">
                                        <div className="text-center">
                                            <img src="/dhakadweb/assets/images/otp-icon.png" alt="" className="mb-4" />
                                            <h6 className='text-center mb-4 fw-medium'> Please enter 4-digit OTP <span className='text-danger'>{saveotp}</span>   </h6>
                                        </div>
                                        <form onSubmit={handleVerify}>
                                            <div className="mb-3">
                                                <div className="otp-inputs d-flex justify-content-center gap-3">
                                                    {otp.map((digit, index) => (
                                                        <input key={index} ref={inputRefs[index]} type="text" maxLength="1" value={digit} onChange={(e) => handleChange(e.target.value, index)} className="form-control text-center fs-4 fw-bold border-bottom border-danger border-2 rounded-0 shadow-none" style={{ width: "50px" }} />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="otp-inputs d-flex justify-content-center gap-3">
                                                <button type="submit" className="btn bg-D4AF37 w-75 text-white mb-2" > Verify OTP </button>
                                            </div>
                                            <div className="text-center">
                                                <p className='mb-1'>Didn`t receive the OTP? </p>
                                                <p className='fw-medium'>
                                                    <button
                                                        type="button"
                                                        className="btn btn-link text-danger p-0"
                                                        onClick={async () => {
                                                            try {
                                                                const res = await axios.post("http://206.189.130.102:5000/api/auth/resend-email-otp", { email: sessionStorage.getItem("email") });
                                                                setSaveotp(res?.data?.debugOtp)
                                                                toast.success("OTP resent to your email");
                                                            } catch (err) {
                                                                toast.error("Failed to resend OTP");
                                                            }
                                                        }}
                                                    >
                                                        Resend OTP
                                                    </button>
                                                </p>

                                            </div>
                                            {/* <div className="text-center">
                                                <Link
                                                    href="/registrationform"
                                                    className="btn bg-D4AF37 w-75 text-white mb-2">Submit</Link>
                                            </div> */}
                                        </form>
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

export default enterotpmail