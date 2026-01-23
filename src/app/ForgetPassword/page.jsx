"use client";

import React, { useState } from "react";
import Header from "../components/Header/Page";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function ForgetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Enter Email First");
    if (loading) return;
    try {
      setLoading(true);
      const res = await axios.post(
        "http://143.110.244.163:5000/api/auth/forgot-password",
        { email }
      );

      toast.success("OTP Sent to Email");
      localStorage.setItem("resetEmail", email);
      localStorage.setItem("debugOtp", res?.data?.debugOtp);

      setTimeout(() => router.push("/VerifyForgotOtp"), 1000);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
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
                  Reset Your Password
                </h5>
                <form onSubmit={handleSubmit}>
                  <label className="form-label text-6B6B6B">
                    Enter Registered Email
                  </label>
                  <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <button
                    className="btn bg-D4AF37 w-100 text-white"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </button>

                </form>
                <p className="mt-3 text-center">
                  <a href="/dhakadweb/login" className="text-decoration-none text-D4AF37">
                    Back to Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
