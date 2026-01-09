// myprofile/pages/Plan.jsx
"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import axios from "axios";

const API_URL = "http://143.110.244.163:5000/api";

export default function Plan() {
    const [myPlan, setMyPlan] = useState(null);
    const [allPlans, setAllPlans] = useState([]);

    const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;


    const user =
        typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("user"))
            : null;

    const userName = user?.name;
    const userEmail = user?.email;
    /* -------- Fetch Current User Plan -------- */
    const getMyPlan = async () => {
        try {
            const res = await axios.get(`${API_URL}/plan/my-plan`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.data.success) setMyPlan(res.data.userPlan);
        } catch (err) {
            console.log("No plan found");
        }
    };

    /* -------- Fetch All Plans -------- */
    const getAllPlans = async () => {
        try {
            const res = await axios.get(`${API_URL}/plan`);
            if (res.data.success) setAllPlans(res.data.plans);
        } catch (err) {
            console.log("Error fetching plans");
        }
    };


    const handleBuy = async (planId) => {
        try {
            const token = localStorage.getItem("token");

            // 1️⃣ Load Razorpay Script
            const isLoaded = await loadRazorpayScript();
            if (!isLoaded) {
                alert("Failed to load Razorpay. Check connection.");
                return;
            }

            // 2️⃣ Create Order From Backend
            const res = await axios.post(
                `${API_URL}/plan/create-order`,
                { planId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (!res.data.success) return alert("Order failed!");

            const { amount, orderId, currency, plan } = res.data;

            // 3️⃣ Razorpay Options
            const options = {
                key: "rzp_live_RyxgRHl1EcCorc", // 🔴 replace with LIVE KEY later
                amount,
                currency,
                name: "Dhakad Matrimony",
                description: `Payment for ${plan.name}`,
                order_id: orderId,
                handler: async function (response) {
                    // 4️⃣ On Payment Success → Verify on backend
                    const verify = await axios.post(
                        `${API_URL}/payment/verify`,
                        {
                            orderId,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        },
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );

                    if (verify.data.success) {
                        alert("🎉 Payment Successful & Plan Activated!");
                        getMyPlan(); // refresh UI
                    } else {
                        alert("❌ Payment verification failed");
                    }
                },
                prefill: {
                    name: userName,
                    email: userEmail,
                },
                theme: { color: "#e91e63" },
            };

            // 5️⃣ Open Razorpay Popup
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (e) {
            console.log(e);
            alert("Something went wrong processing payment");
        }
    };






    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };





    const [paymentHistory, setPaymentHistory] = useState([]);

    const getPaymentHistory = async () => {
        try {
            const res = await axios.get(`${API_URL}/payment/history`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.success) setPaymentHistory(res.data.history);
        } catch (err) {
            console.log("Payment history not available");
        }
    };



    useEffect(() => {
        getMyPlan();
        getAllPlans();
        getPaymentHistory();
    }, []);


    return (
        <DashboardLayout>
            <div className="container-fluid">
                <div className="row g-4">
                    {/* ================= LEFT : YOUR PLAN ================= */}
                    <div className="col-lg-4">
                        <h5 className="fw-semibold mb-3">Your Plan</h5>
                        <div className="gold-card text-center rounded-3 p-3">
                            <div className="crown">👑</div>
                            <h6 className="text-white mb-1">GOLD MEMBER</h6>
                            <h3 className="fw-bold text-white">Gold Plans</h3>
                            <p className="text-white-50 mb-2">Valid till: 12 Oct 2026</p>
                            <h2 className="text-white fw-bold mb-1">₹1180</h2>
                            <p className="text-white-50 mb-2">incl. GST</p>
                            <button className="btn gold-btn px-4 fw-semibold">
                                Upgrade Plan
                            </button>
                        </div>
                    </div>
                    {/* ================= RIGHT : PLANS ================= */}

                    <div className="col-lg-8 ">
                        <h5 className="fw-semibold mb-3">Choose Your Plan</h5>
                        <div className="row px-0">
                            {/* Silver */}
                            <div className="col-md-3 pe-0">
                                <div className="silver-card rounded-4 py-3 px-3 text-center plan-box">
                                    <h6>Silver Plan</h6>
                                    <span className="pill">6 Months</span>
                                    <h3>₹1000</h3>
                                    <small>incl. GST</small>
                                    <ul className="list-unstyled">
                                        <li>✔ Verified Profiles</li>
                                        <li>✔ Best Matches</li>
                                    </ul>
                                    <button className="btn btn-outline-secondary w-100">
                                        Choose Plan
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-3 pe-0">
                                <div className="gold-plan-card rounded-4 py-3 px-3 text-center plan-box">
                                    <h6>Gold Plan</h6>
                                    <span className="pill">9 Months</span>
                                    <h3>₹1180</h3>
                                    <small>incl. GST</small>
                                    <ul className="list-unstyled">
                                        <li>✔ Verified Profiles</li>
                                        <li>✔ Best Matches</li>
                                    </ul>
                                    <button className="btn btn-outline-secondary w-100">
                                        Choose Plan
                                    </button>
                                </div>
                            </div>
                            {/* Platinum */}
                            <div className="col-md-3 pe-0">
                                <div className="platinum-card rounded-4 py-3 px-3 text-center plan-box">
                                    <h6>Platinum</h6>
                                    <span className="pill">24 Months</span>
                                    <h3>₹1770</h3>
                                    <small>incl. GST</small>
                                    <ul className="list-unstyled">
                                        <li>✔ Verified Profiles</li>
                                        <li>✔ Best Matches</li>
                                    </ul>
                                    <button className="btn btn-outline-secondary w-100">
                                        Choose Plan
                                    </button>
                                </div>
                            </div>

                            {/* Lifetime */}
                            <div className="col-md-3 pe-0">
                                <div className="lifetime-card rounded-4 py-3 px-3 text-center plan-box">
                                    <h6>Lifetime</h6>
                                    <span className="pill">60 Months</span>
                                    <h3>₹5900</h3>
                                    <small>incl. GST</small>
                                    <ul className="list-unstyled">
                                        <li>✔ Verified Profiles</li>
                                        <li>✔ Best Matches</li>
                                    </ul>
                                    <button className="btn btn-outline-secondary w-100">
                                        Choose Plan
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= WHY UPGRADE ================= */}
            <div className="row g-4 mt-4">
                <div className="col-lg-4">
                    <div className="why-upgrade rounded-4 p-3">
                        <h5 className="fw-semibold mb-3">Why Upgrade?</h5>
                        <div className="why-item">❤️ Better Matches</div>
                        <div className="why-item">🔒 Privacy Control</div>
                        <div className="why-item">✔ Verified Profiles</div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="lifetime-card rounded-3 px-2 py-3 text-center">
                                <div className="icons-text">
                                    <div className="icons">
                                        <i className="fa-solid fa-heart text-danger fs-1 mb-2"></i>
                                    </div>
                                    <div className="texts">
                                        <h6 className="fw-semibold">Better Matches</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="platinum-card rounded-3 px-2 py-3 text-center">
                                <div className="icons-text">
                                    <div className="icons">
                                        <i className="fa-solid fa-lock fs-1 mb-2 text-D4AF37"></i>
                                    </div>
                                    <div className="texts">
                                        <h6 className="fw-semibold">Privacy Control</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="silver-card rounded-3 px-2 py-3 text-center">
                                <div className="icons-text">
                                    <div className="icons">
                                        <i className="fa-solid fa-check fs-1 mb-2 text-success"></i>
                                    </div>
                                    <div className="texts">
                                        <h6 className="fw-semibold">Verified Profiles</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="gold-plan-card rounded-3 px-2 py-3 text-center">
                                <div className="icons-text">
                                    <div className="icons">
                                        <i className="fa-solid fa-shield fs-1 mb-2 text-success-emphasis"></i>
                                    </div>
                                    <div className="texts">
                                        <h6 className="fw-semibold">100% Secure</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ================= PAYMENT HISTORY ================= */}
                    <div className="payment-history mt-4 pt-3 rounded-4">
                        <div className="card-header bg-white">
                            <h6 className="mb-2 fw-semibold px-2">Payment History</h6>
                        </div>

                        <div className="table-responsive rounded-bottom-4">
                            <table className="table table-bordered table-sm mb-0 rounded-bottom-4">
                                <thead>
                                    <tr className="text-center">
                                        <th className="border-start-0">#</th>
                                        <th>Plan</th>
                                        <th>Amount</th>
                                        <th>Order ID</th>
                                        <th>Payment ID</th>
                                        <th>Status</th>
                                        <th className="border-end-0">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paymentHistory.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="text-center text-muted">
                                                No payment record found
                                            </td>
                                        </tr>
                                    ) : (
                                        paymentHistory.map((p, i) => (
                                            <tr key={p._id} className="text-center">
                                                <td className="border-start-0">{i + 1}</td>
                                                <td>{p.planName}</td>
                                                <td>₹{p.amount}</td>
                                                <td>{p.orderId || "-"}</td>
                                                <td>{p.paymentId || "-"}</td>
                                                <td>
                                                    <span
                                                        className={`badge ${p.status === "paid"
                                                            ? "bg-success"
                                                            : p.status === "pending"
                                                                ? "bg-warning text-dark"
                                                                : "bg-danger"
                                                            }`}
                                                    >
                                                        {p.status}
                                                    </span>
                                                </td>
                                                <td className="border-end-0">{new Date(p.createdAt).toLocaleString()}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}