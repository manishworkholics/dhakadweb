"use client";

import React, { useRef, useState, useEffect } from "react";
import Header from "../components/Header/Page";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const EnterOtp = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30); // ⏳ Countdown timer

  const inputRefs = Array(4)
    .fill(0)
    .map(() => useRef(null));

  // ⏳ Timer logic
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // --- Updated State & Refs (keep same above) ---
  const handleChange = (value, index) => {
    if (/^\d+$/.test(value) && value.length === 4) {
      // IF user pastes full OTP
      const digits = value.split("");
      setOtp(digits);
      inputRefs[3].current.focus();
      return;
    }

    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value !== "" && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  // --- NEW: Handle Backspace to go previous box ---
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  // --- NEW: Paste OTP handler ---
  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").trim();
    if (/^\d{4}$/.test(pasted)) {
      setOtp(pasted.split(""));
      inputRefs[3].current.focus();
    }
  };


  const verifyOtp = async (finalOtp) => {
    if (finalOtp.length !== 4) {
      toast.error("Please enter a valid 4-digit OTP");
      return;
    }

    const phone = sessionStorage.getItem("phone");
    if (!phone) {
      toast.error("Phone number missing!");
      router.push("/login");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://143.110.244.163:5000/api/auth/verify-otp",
        { phone, otp: finalOtp }
      );

      if (response?.data?.success) {
        toast.success("OTP Verified Successfully");
        sessionStorage.setItem("token", response?.data?.token);
        sessionStorage.setItem("user", JSON.stringify(response?.data?.user));

        setTimeout(() => router.push("/registrationform"), 700);
      } else {
        handleInvalidOtp(); // 👈 NEW
      }

    } catch (error) {
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


  const handleVerifyClick = (e) => {
    e.preventDefault();
    verifyOtp(otp.join(""));
  };

  // 🔁 Resend OTP function
  const handleResend = async () => {
    const phone = sessionStorage.getItem("phone");

    if (!phone) {
      toast.error("No phone number found!");
      return;
    }

    try {
      toast.info("Sending new OTP...");
      await axios.post("http://143.110.244.163:5000/api/auth/send-otp", { phone });

      setTimer(30);
      setOtp(["", "", "", ""]);
      inputRefs[0].current.focus();
      toast.success("OTP resent successfully!");
    } catch {
      toast.error("Failed to resend OTP. Try again.");
    }
  };

  // ⬅ Back to edit mobile number
  const handleBack = () => {
    sessionStorage.removeItem("phone");
    router.push("/login");
  };

  return (
    <div className="otp-page bg-FDFBF7" style={{ minHeight: "100vh" }}>
      <ToastContainer />

      <Header />

      <div className="otp-content py-5">
        <div className="container">
          <div className="col-md-6 mx-auto">

            {/* 🔙 Back */}
            <div className="mb-3 d-flex align-items-center" style={{ cursor: "pointer" }} onClick={handleBack}>
              ⬅
              <span className="fw-medium text-primary">Edit Number</span>
            </div>

            <div className="card shadow border-0 rounded-4">
              <div className="card-body p-4 text-center">
                <img src="/dhakadweb/assets/images/otp-icon.png" className="mb-3" />

                <h6>Please enter the 4-digit OTP</h6>

                {/* OTP Inputs */}
                <div className="d-flex justify-content-center gap-3 my-4"
                  onPaste={handlePaste}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={inputRefs[index]}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="form-control text-center fs-4 fw-bold border-bottom border-danger rounded-0"
                      style={{ width: "55px" }}
                    />
                  ))}
                </div>

                {/* Verify Button */}
                <button
                  className="btn bg-D4AF37 w-75 text-white"
                  disabled={loading}
                  onClick={handleVerifyClick}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>

                {/* Resend Section */}
                <p className="mt-3">
                  Didn't receive OTP?{" "}
                  {timer > 0 ? (
                    <span className="text-secondary">Resend in {timer}s</span>
                  ) : (
                    <span className="text-danger fw-bold" style={{ cursor: "pointer" }} onClick={handleResend}>
                      Resend OTP
                    </span>
                  )}
                </p>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterOtp;
