"use client";

import React, { useState } from "react";
import Header from "../components/Header/Page";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPassword() {
    const router = useRouter();
    const email = sessionStorage.getItem("resetEmail");

    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password) return toast.error("Enter new password");

        try {
            await axios.post(
                "http://143.110.244.163:5000/api/auth/reset-password",
                { email, newPassword: password }
            );

            toast.success("Password Updated!");

            sessionStorage.removeItem("resetEmail");
            sessionStorage.removeItem("debugOtp");

            setTimeout(() => router.push("/login"), 1000);
        } catch (err) {
            toast.error(err?.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="login-page bg-FDFBF7">
            <ToastContainer />
            <Header />
            <div className="container py-5">
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-5 mx-auto">
                        <div className="card shadow border-0 rounded-4">
                            <div className="card-body p-4">
                                <h5 className="text-center mb-4 fw-medium">
                                    Create New Password
                                </h5>
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="password"
                                        className="form-control mb-3"
                                        placeholder="Enter New Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button className="btn bg-D4AF37 w-100 text-white">
                                        Save Password
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
