// "use client";

// import React, { useState, useEffect } from "react";
// import Header from "../components/Header/Page";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import { useRouter } from "next/navigation";
// import "react-toastify/dist/ReactToastify.css";

// export default function VerifyForgotOtp() {
//   const router = useRouter();
//   const [email, setEmail] = useState(null);
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const storedEmail = localStorage.getItem("resetEmail");
//     if (!storedEmail) {
//       toast.error("Email missing");
//       return router.push("/ForgotPassword");
//     }
//     setEmail(storedEmail);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!otp) return toast.error("Enter OTP");
//     if (loading) return;
//     try {
//       setLoading(true);
//       await axios.post(
//         "http://143.110.244.163:5000/api/auth/verify-forgot-otp",
//         { email, otp }
//       );

//       toast.success("OTP Verified!");
//       setTimeout(() => router.push("/ResetPassword"), 800);

//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-page bg-FDFBF7">
//       <ToastContainer />
//       <Header />
//       <div className="container py-5">
//         <div className="row">
//           <div className="col-12 col-md-6 col-lg-5 mx-auto">
//             <div className="card shadow border-0 rounded-4">
//               <div className="card-body p-4">
//                 <h5 className="text-center mb-4 fw-medium">Enter OTP</h5>

//                 <form onSubmit={handleSubmit}>
//                   <input
//                     type="Number"
//                     className="form-control mb-3"
//                     placeholder="Enter OTP"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                   />

//                   <button disabled={loading} className="btn bg-D4AF37 w-100 text-white">
//                     {loading ? "Sending..." : "Verify OTP"}
//                   </button>
//                 </form>

//                 <p className="mt-3 text-center text-6B6B6B">
//                   OTP sent to <b>{email}</b>
//                 </p>

//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header/Page";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

export default function VerifyForgotOtp() {
  const router = useRouter();

  const [email, setEmail] = useState(null);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const inputsRef = useRef([]);

  /* ---------------- INIT ---------------- */
  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    if (!storedEmail) {
      toast.error("Email missing");
      router.push("/ForgotPassword");
      return;
    }
    setEmail(storedEmail);
  }, []);

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  /* ---------------- OTP INPUT LOGIC ---------------- */

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }

    // Auto submit when full
    if (newOtp.join("").length === 4) {
      submitOtp(newOtp.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, 4);
    if (!/^\d{4}$/.test(paste)) return;

    const arr = paste.split("");
    setOtp(arr);

    arr.forEach((num, i) => {
      if (inputsRef.current[i]) inputsRef.current[i].value = num;
    });

    submitOtp(paste);
  };

  /* ---------------- SUBMIT OTP ---------------- */

  const submitOtp = async (finalOtp) => {
    if (loading) return;

    try {
      setLoading(true);

      await axios.post(
        "http://143.110.244.163:5000/api/auth/verify-forgot-otp",
        { email, otp: finalOtp }
      );

      toast.success("OTP Verified!");
      setTimeout(() => router.push("/ResetPassword"), 800);

    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid OTP");

      // shake animation
      setShake(true);
      setTimeout(() => setShake(false), 500);

      // reset inputs
      setOtp(["", "", "", ""]);
      inputsRef.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    if (finalOtp.length !== 4) return toast.error("Enter 4 digit OTP");
    submitOtp(finalOtp);
  };

  /* ---------------- RESEND OTP ---------------- */

  const resendOtp = async () => {
    if (!canResend) return;

    try {
      await axios.post(
        "http://143.110.244.163:5000/api/auth/forgot-password",
        { email }
      );

      toast.success("OTP Resent");

      setTimer(30);
      setCanResend(false);
      setOtp(["", "", "", ""]);
      inputsRef.current[0]?.focus();

    } catch {
      toast.error("Failed to resend OTP");
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="login-page bg-FDFBF7">
      <ToastContainer />
      <Header />

      <style>{`
        .shake {
          animation: shake 0.4s;
        }

        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          50% { transform: translateX(6px); }
          75% { transform: translateX(-6px); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <div className="container py-5">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-5 mx-auto">
            <div className="card shadow border-0 rounded-4">
              <div className={`card-body p-4 ${shake ? "shake" : ""}`}>
                <h5 className="text-center mb-4 fw-medium">Enter OTP</h5>

                <form onSubmit={handleSubmit}>
                  <div
                    className="d-flex justify-content-between mb-3"
                    onPaste={handlePaste}
                  >
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputsRef.current[index] = el)}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="form-control text-center fw-bold"
                        style={{
                          width: "55px",
                          height: "55px",
                          fontSize: "22px",
                          borderRadius: "10px",
                          border: digit ? "2px solid #D4AF37" : "1px solid #ccc",
                          backgroundColor: digit ? "#FFF7E6" : "#fff",
                          transition: "0.2s",
                        }}
                      />
                    ))}
                  </div>

                  <button
                    disabled={loading}
                    className="btn bg-D4AF37 w-100 text-white"
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                </form>

                <p className="mt-3 text-center text-6B6B6B">
                  OTP sent to <b>{email}</b>
                </p>

                <p className="text-center mt-2">
                  {canResend ? (
                    <button
                      onClick={resendOtp}
                      className="btn btn-link text-D4AF37 p-0"
                    >
                      Resend OTP
                    </button>
                  ) : (
                    <span className="text-muted">
                      Resend in {timer}s
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
}
