"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadOwnProfile } from "@/redux/slices/profileSlice";

const API_URL = "http://143.110.244.163:5000/api";

export default function Plan() {
    const [myPlan, setMyPlan] = useState(null);
    const [allPlans, setAllPlans] = useState([]);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [paying, setPaying] = useState(false);
    const [upgradeOpen, setUpgradeOpen] = useState(false);
    const dispatch = useDispatch();

    const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const user =
        typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("user"))
            : null;

    const userName = user?.name || "";
    const userEmail = user?.email || "";

    /* ================= API CALLS ================= */

    const getMyPlan = async () => {
        try {
            const res = await axios.get(`${API_URL}/plan/my-plan`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.data.success) setMyPlan(res.data.userPlan);
        } catch {
            console.log("No plan found");
        }
    };

    const getAllPlans = async () => {
        try {
            const res = await axios.get(`${API_URL}/plan`);
            if (res.data.success) setAllPlans(res.data.plans);
        } catch {
            console.log("Error fetching plans");
        }
    };

    const getPaymentHistory = async () => {
        try {
            const res = await axios.get(`${API_URL}/plan/history`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.data.success) setPaymentHistory(res.data.history);
        } catch {
            console.log("Payment history not available");
        }
    };

    useEffect(() => {
        getMyPlan();
        getAllPlans();
        getPaymentHistory();
    }, []);

    /* ================= RAZORPAY ================= */

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleBuy = async (planId) => {
        try {
            const isLoaded = await loadRazorpayScript();
            if (!isLoaded) {
                alert("Failed to load Razorpay");
                return;
            }

            const res = await axios.post(
                `${API_URL}/plan/create-order`,
                { planId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (!res.data.success) {
                alert("Order failed");
                return;
            }

            const { amount, orderId, key } = res.data;

            const options = {
                key,
                amount: Math.round(amount * 100), // Razorpay expects paise
                currency: "INR",
                name: "Dhakad Matrimony",
                description: "Plan Purchase",
                order_id: orderId,

                handler: async function (response) {
                    try {
                        const verify = await axios.post(
                            `${API_URL}/plan/verify`,
                            {
                                razorpay_order_id: orderId,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            },
                            { headers: { Authorization: `Bearer ${token}` } }
                        );

                        if (verify.data.success) {
                            alert("🎉 Payment Successful & Plan Activated!");
                            // 🔥 Refresh global profile state
                            dispatch(loadOwnProfile());
                            getMyPlan();
                            getPaymentHistory();
                        } else {
                            alert("❌ Payment verification failed");
                        }
                    } catch (err) {
                        console.error("Verify error", err);
                        alert("Verification failed");
                    }
                },

                prefill: {
                    name: userName,
                    email: userEmail,
                },

                theme: { color: "#e91e63" },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error(err);
            alert("Payment failed");
        }
    };


    return (
        <DashboardLayout>
            <div className="container-fluid">
                <div className="row g-4">
                    {/* ================= LEFT : YOUR PLAN ================= */}
                    <div className="col-lg-4">
                        <h5 className="fw-semibold mb-3">Your Plan</h5>

                        <div className="gold-card text-center rounded-3 p-3">
                            <div className="crown">👑</div>

                            <h6 className="text-white mb-1">
                                {myPlan
                                    ? myPlan.plan.name.toUpperCase() + " MEMBER"
                                    : "NO ACTIVE PLAN"}
                            </h6>

                            <h3 className="fw-bold text-white">
                                {myPlan ? myPlan.plan.name : "Free User"}
                            </h3>

                            <p className="text-white-50 mb-2">
                                {myPlan
                                    ? `Valid till: ${new Date(
                                        myPlan.endDate
                                    ).toDateString()}`
                                    : "No active subscription"}
                            </p>

                            {myPlan && (
                                <>
                                    <h2 className="text-white fw-bold mb-1">
                                        ₹{myPlan.plan.price}
                                    </h2>
                                    <p className="text-white-50 mb-2">incl. GST</p>
                                </>
                            )}

                            <button
                                className="btn gold-btn px-4 fw-semibold"
                                onClick={() => setUpgradeOpen(true)}
                            >
                                Upgrade Plan
                            </button>

                        </div>
                    </div>

                    {/* ================= RIGHT : PLANS ================= */}
                    <div className="col-lg-8 ">
                        <h5 className="fw-semibold mb-3">Choose Your Plan</h5>

                        <div className="row px-0">
                            {allPlans.map((plan) => {
                                const gstAmount = Math.round(
                                    (plan.price * plan.gstPercent) / 100
                                );
                                const finalPrice = plan.price + gstAmount;

                                const cardClass =
                                    plan.name.toLowerCase().includes("silver")
                                        ? "silver-card"
                                        : plan.name.toLowerCase().includes("gold")
                                            ? "gold-plan-card"
                                            : plan.name.toLowerCase().includes("platinum")
                                                ? "platinum-card"
                                                : "lifetime-card";

                                return (
                                    <div className="col-md-3 pe-0" key={plan._id}>
                                        <div
                                            className={`${cardClass} rounded-4 py-3 px-3 text-center plan-box`}
                                        >
                                            <h6>{plan.name}</h6>

                                            <span className="pill">
                                                {plan.durationMonths} Months
                                            </span>

                                            <h3>₹{finalPrice}</h3>
                                            <small>incl. GST</small>

                                            <ul className="list-unstyled">
                                                {plan.features.map((f, i) => (
                                                    <li key={i}>✔ {f}</li>
                                                ))}
                                            </ul>

                                            <button
                                                className="btn btn-outline-secondary w-100"
                                                disabled={paying}
                                                onClick={() => handleBuy(plan._id)}
                                            >
                                                {paying ? "Processing..." : "Choose Plan"}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= PAYMENT HISTORY ================= */}

            <div className="row g-4 mt-4">
                <div className="col-lg-12">
                    <div className="payment-history pt-3 rounded-4">
                        <div className="card-header bg-white">
                            <h6 className="mb-2 fw-semibold px-2">Payment History</h6>
                        </div>

                        <div className="table-responsive rounded-bottom-4">
                            <table className="table table-bordered table-sm mb-0">
                                <thead>
                                    <tr className="text-center">
                                        <th>#</th>
                                        <th>Plan</th>
                                        <th>Amount</th>
                                        <th>Order ID</th>
                                        <th>Payment ID</th>
                                        <th>Status</th>
                                        <th>Date</th>
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
                                                <td>{i + 1}</td>
                                                <td>{p.plan?.name || "-"}</td>
                                                <td>₹{p.amount}</td>
                                                <td>{p.razorpayOrderId || "-"}</td>
                                                <td>{p.razorpayPaymentId || "-"}</td>
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
                                                <td>{new Date(p.createdAt).toLocaleString()}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>


            {upgradeOpen && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
                    style={{ zIndex: 9999 }}
                >
                    <div className="bg-white rounded-4 p-4 shadow" style={{ width: "90%", maxWidth: "800px" }}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="mb-0">Upgrade Your Plan</h5>
                            <button
                                className="btn-close"
                                onClick={() => setUpgradeOpen(false)}
                            ></button>
                        </div>

                        <div className="row g-3">
                            {allPlans.map((plan) => {
                                const gstAmount = Math.round((plan.price * plan.gstPercent) / 100);
                                const finalPrice = plan.price + gstAmount;

                                return (
                                    <div className="col-md-4" key={plan._id}>
                                        <div className="border rounded-3 p-3 text-center h-100">
                                            <h6>{plan.name}</h6>
                                            <p className="mb-1">{plan.durationMonths} Months</p>
                                            <h5>₹{finalPrice}</h5>
                                            <small className="text-muted">incl. GST</small>

                                            <ul className="list-unstyled mt-2 small">
                                                {plan.features.map((f, i) => (
                                                    <li key={i}>✔ {f}</li>
                                                ))}
                                            </ul>

                                            <button
                                                className="btn btn-warning w-100 mt-2"
                                                onClick={() => {
                                                    setUpgradeOpen(false);
                                                    handleBuy(plan._id);
                                                }}
                                            >
                                                Upgrade
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

        </DashboardLayout>
    );
}
