"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/Header/Page";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

export default function VerifyForgotOtp() {
  const router = useRouter();
  const [email, setEmail] = useState(null);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("resetEmail");
    if (!storedEmail) {
      toast.error("Email missing");
      return router.push("/ForgotPassword");
    }
    setEmail(storedEmail);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) return toast.error("Enter OTP");

    try {
      await axios.post(
        "http://143.110.244.163:5000/api/auth/verify-forgot-otp",
        { email, otp }
      );

      toast.success("OTP Verified!");
      setTimeout(() => router.push("/ResetPassword"), 800);

    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid OTP");
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
                <h5 className="text-center mb-4 fw-medium">Enter OTP</h5>

                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />

                  <button className="btn bg-D4AF37 w-100 text-white">
                    Verify OTP
                  </button>
                </form>

                <p className="mt-3 text-center text-6B6B6B">
                  OTP sent to <b>{email}</b>
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
