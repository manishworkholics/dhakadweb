"use client";

import React, { useRef, useState, useEffect } from "react";
import Header from "../components/Header/Page";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

const EnterOtpMail = () => {
    const router = useRouter();
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [Loading, setLoading] = useState(false)
    const inputRefs = Array(4)
        .fill(0)
        .map(() => useRef(null));

    const [timer, setTimer] = useState(300); // 5 minutes
    const [expired, setExpired] = useState(false);
    const [saveotp, setSaveotp] = useState(null);

    // Restore saved OTP
    useEffect(() => {
        const savedOtp = sessionStorage.getItem("otp");
        if (savedOtp) setSaveotp(JSON.parse(savedOtp));
    }, []);

    // Countdown Logic
    useEffect(() => {
        if (timer <= 0) {
            setExpired(true);
            setOtp(["", "", "", ""]);
            return;
        }

        const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);

        return () => clearInterval(countdown);
    }, [timer]);

    // Format Time (mm:ss)
    const formatTime = () => {
        const min = Math.floor(timer / 60);
        const sec = timer % 60;
        return `${min}:${sec < 10 ? `0${sec}` : sec}`;
    };

    // OTP Handle Input + Paste support
    const handleChange = (value, index) => {
        if (!/^[0-9]?$/.test(value)) return;

        const updated = [...otp];

        // 🟢 Auto-fill When Pasting
        if (value.length === 4) {
            updated[0] = value[0] || "";
            updated[1] = value[1] || "";
            updated[2] = value[2] || "";
            updated[3] = value[3] || "";
            setOtp(updated);
            inputRefs[3].current.focus();
            return;
        }

        updated[index] = value;
        setOtp(updated);

        if (value && index < 3) inputRefs[index + 1].current.focus();
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        if (expired) return toast.error("OTP expired. Please resend.");

        const finalOtp = otp.join("");
        if (finalOtp.length !== 4) return toast.error("Please enter valid 4-digit OTP");

        try {
            const response = await axios.post(
                "http://143.110.244.163:5000/api/auth/verify-email-otp",
                {
                    email: sessionStorage.getItem("email"),
                    otp: finalOtp,
                },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("tempToken")}`,
                    },
                }
            );

            if (response?.data?.success) {
                toast.success("Email Verified Successfully");

                sessionStorage.setItem("token", response?.data?.token);
                sessionStorage.setItem("user", JSON.stringify(response?.data?.user));
                sessionStorage.removeItem("tempToken");

                setTimeout(() => router.push("/registrationform"), 700);
            }
            else {
                handleInvalidOtp(); // 👈 NEW
            }
        }
        catch (error) {
            handleInvalidOtp(); // 👈 NEW
        } finally {
            setLoading(false);
        }
    };

    const handleInvalidOtp = () => {
        toast.error("Invalid OTP. Please try again.");

        setOtp(["", "", "", ""]); // Clear input
        setTimeout(() => {
            inputRefs[0].current.focus(); // Cursor moves to first input
        }, 200);
    };

    const resendOtp = async () => {
        try {
            const res = await axios.post("http://143.110.244.163:5000/api/auth/resend-email-otp", {
                email: sessionStorage.getItem("email"),
            });

            setSaveotp(res?.data?.debugOtp);
            setTimer(300);
            setExpired(false);
            setOtp(["", "", "", ""]);
            toast.success("OTP resent successfully");
        } catch {
            toast.error("Failed to resend OTP");
        }
    };

    return (
        <div className="otp-page bg-FDFBF7" style={{ minHeight: "100vh" }}>
            <ToastContainer />
            <Header />

            <div className="container py-5">
                <button className="btn btn-outline-secondary mb-3" onClick={() => router.back()}>
                    ⬅ Back
                </button>

                <div className="card shadow rounded-4 p-4 mx-auto" style={{ maxWidth: "460px" }}>
                    <div className="text-center">
                        <img src="/dhakadweb/assets/images/otp-icon.png" className="mb-3" />
                        <h6>
                            Enter the 4-digit OTP
                            {/* <span className="text-danger">{saveotp}</span> */}
                        </h6>
                        <p className="fw-bold text-primary">⏳ {formatTime()}</p>
                    </div>

                    <form onSubmit={handleVerify}>
                        <div className="d-flex justify-content-center gap-3 my-3">
                            <div className="d-flex justify-content-center gap-3 my-3">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={inputRefs[index]}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleChange(e.target.value, index)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Backspace") {
                                                if (otp[index] === "") {
                                                    if (index > 0) inputRefs[index - 1].current.focus();
                                                } else {
                                                    const updatedOtp = [...otp];
                                                    updatedOtp[index] = "";
                                                    setOtp(updatedOtp);
                                                }
                                            }
                                        }}
                                        onPaste={(e) => {
                                            e.preventDefault();
                                            const pasted = e.clipboardData.getData("text").trim();
                                            if (pasted.length === 4 && /^[0-9]+$/.test(pasted)) {
                                                setOtp(pasted.split(""));
                                                inputRefs[3].current.focus();
                                            }
                                        }}
                                        className="form-control text-center fs-4 fw-bold border-bottom border-danger border-2 rounded-0"
                                        style={{ width: "50px" }}
                                    />
                                ))}
                            </div>

                        </div>

                        <button type="submit" className="btn bg-D4AF37 text-white w-100" disabled={expired}>
                            Verify OTP
                        </button>
                    </form>

                    <div className="text-center mt-3">
                        {!expired ? (
                            <p className="text-muted">Waiting for OTP...</p>
                        ) : (
                            <button className="btn btn-link text-danger" onClick={resendOtp}>
                                Resend OTP
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnterOtpMail;
