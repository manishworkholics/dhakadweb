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
        typeof window !== "undefined" ? sessionStorage.getItem("token") : null;


    const user =
        typeof window !== "undefined"
            ? JSON.parse(sessionStorage.getItem("user"))
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
            const token = sessionStorage.getItem("token");

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
            <div className="row">
                {/* -------- LEFT CURRENT PLAN -------- */}
                <div className="col-lg-4 col-md-4 col-12">
                    <div className="head-text mb-3">
                        <h5 className="fw-semibold">YOUR PLAN DETAILS</h5>
                    </div>

                    <div className="card">
                        <div className="card-header bg-white">
                            <h6 className="mb-0 fw-semibold">Current Plan</h6>
                        </div>

                        <div className="card-body text-center">
                            <img
                                src="/dhakadweb/assets/images/plan.png"
                                alt=""
                                className="my-4 gift"
                            />

                            {myPlan ? (
                                <>
                                    <h6>
                                        Plan Name:
                                        <span className="fw-semibold ms-2">
                                            {myPlan.plan?.name}
                                        </span>
                                    </h6>
                                    <h6>
                                        Validity:
                                        <span className="fw-semibold ms-2">
                                            {myPlan.plan?.durationMonths} Months
                                        </span>
                                    </h6>
                                </>
                            ) : (
                                <p className="text-muted small">No active plan</p>
                            )}
                        </div>

                        {myPlan && (
                            <div className="card-footer text-body-secondary bg-white">
                                <h6>
                                    ₹{myPlan.plan?.price} + {myPlan.plan?.gstPercent}% GST =
                                    ₹{myPlan.plan?.price +
                                        (myPlan.plan?.price * myPlan.plan?.gstPercent) / 100}
                                </h6>
                            </div>
                        )}
                    </div>
                </div>

                {/* -------- RIGHT – LIST ALL PLANS -------- */}
                <div className="col-lg-8 col-md-8 col-12">
                    <div className="head-text mb-3">
                        <h5 className="fw-semibold">ALL PLAN</h5>
                    </div>

                    <div className="content-table overflow-hidden border rounded-3 mb-3">
                        <table className="table table-bordered rounded-3 mb-0">
                            <tbody>
                                {allPlans.map((plan) => {
                                    const gst = (plan.price * plan.gstPercent) / 100;
                                    const total = plan.price + gst;

                                    return (
                                        <tr key={plan._id}>
                                            <td className="fw-semibold">{plan.name}</td>
                                            <td>
                                                ₹{plan.price} + {plan.gstPercent}% GST = <b>₹{total}</b>
                                            </td>
                                            <td className="d-flex justify-content-between align-items-center">
                                                {plan.durationMonths} Month
                                                <button
                                                    className="btn btn-light bg-F4F4F4 ms-2 py-1 px-2"
                                                    onClick={() => handleBuy(plan._id)}
                                                >
                                                    Buy Now
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Secure Footer */}
                    <div className="card bg-F6FBFF">
                        <div className="secure-detail row">
                            <div className="border-end text-center col-lg-3 col-md-3 col-6 py-3">
                                <i className="fa-regular fa-heart fs-2 mb-1"></i>
                                <p className="mb-0">Best Matches</p>
                            </div>
                            <div className="border-end text-center col-lg-3 col-md-3 col-6 py-3">
                                <i className="fa-solid fa-user fs-2 mb-1"></i>
                                <p className="mb-0">Verified Profile</p>
                            </div>
                            <div className="border-end text-center col-lg-3 col-md-3 col-6 py-3">
                                <i className="fa-solid fa-lock fs-2 mb-1"></i>
                                <p className="mb-0">Privacy Controls</p>
                            </div>
                            <div className="text-center col-lg-3 col-md-3 col-6 py-3">
                                <i className="fa-solid fa-shield fs-2 mb-1"></i>
                                <p className="mb-0">Fully Secure</p>
                            </div>
                        </div>
                    </div>



                    {/* PAYMENT HISTORY */}
                    <div className="card mt-4">
                        <div className="card-header bg-white">
                            <h6 className="mb-0 fw-semibold">Payment History</h6>
                        </div>

                        <div className="table-responsive">
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
        </DashboardLayout>
    );
}
