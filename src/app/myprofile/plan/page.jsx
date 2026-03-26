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

    const [selectedPlan, setSelectedPlan] = useState(null);
    const cleanFeatures = (html) => {
        return html
            .replace(/<[^>]*>?/gm, "") // remove HTML tags
            .split(/[0-9]+\./) // split by numbering
            .map(f => f.trim())
            .filter(f => f.length > 0);
    };

    const getCardClass = (name) => {
        const n = name?.toLowerCase() || "";

        if (n.includes("silver")) return "silver-card";
        if (n.includes("gold")) return "gold-plan-card";
        if (n.includes("platinum")) return "platinum-card";
        return "lifetime-card";
    };

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
                                    <div className="col-md-4 pe-0 mb-2" key={plan._id}>
                                        <div className={`simple-plan-card p-2 text-center ${cardClass}`}>

                                            <h4 className="plan-title">{plan.name}</h4>

                                            <h2 className="plan-price">₹{finalPrice}</h2>

                                            <p className="plan-duration">
                                                {plan.durationMonths} Months
                                            </p>

                                            <button
                                                className="btn btn-outline-dark w-100"
                                                data-bs-toggle="modal"
                                                data-bs-target="#planModal"
                                                onClick={() => setSelectedPlan(plan)}
                                            >
                                                View Details
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
                                    <div className="col-md-4 pe-0 mb-2" key={plan._id}>
                                        <div className={`simple-plan-card p-2 text-center ${cardClass}`}>

                                            <h4 className="plan-title">{plan.name}</h4>

                                            <h2 className="plan-price">₹{finalPrice}</h2>

                                            <p className="plan-duration">
                                                {plan.durationMonths} Months
                                            </p>

                                            <button
                                                className="btn btn-outline-dark w-100"
                                                onClick={() => {
                                                    setSelectedPlan(plan);

                                                    // 1️⃣ Close current custom modal
                                                    setUpgradeOpen(false);

                                                    // 2️⃣ Wait for DOM update
                                                    setTimeout(() => {
                                                        const modal = new bootstrap.Modal(
                                                            document.getElementById("planModal")
                                                        );
                                                        modal.show();
                                                    }, 300);
                                                }}
                                            >
                                                View Details
                                            </button>

                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}


            <div
                className="modal fade"
                id="planModal"
                tabIndex="-1"
                aria-hidden="true"
            >
                <div className="modal-dialog  modal-lg modal-dialog-centered">

                    <div
                        className={`modal-content rounded-4 ${getCardClass(selectedPlan?.name)}`}
                    >

                        {/* Header */}
                        <div className="modal-header border-0">
                            <h5 className="modal-title fw-bold">
                                {selectedPlan?.name || "Plan Details"}
                            </h5>

                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>

                        {/* Body */}
                        <div className="modal-body">

                            <h3 className="fw-bold mb-2">
                                ₹{selectedPlan
                                    ? selectedPlan.price +
                                    Math.round(
                                        (selectedPlan.price * selectedPlan.gstPercent) / 100
                                    )
                                    : 0}
                            </h3>

                            <p className="text-muted">
                                {selectedPlan?.durationMonths || 0} Months
                            </p>

                            <hr />

                            <ul className="list-unstyled">
                                {selectedPlan &&
                                    cleanFeatures(selectedPlan.features[0]).map((f, i) => (
                                        <li key={i} className="mb-2">
                                            ✔ {f}
                                        </li>
                                    ))}
                            </ul>
                        </div>

                        {/* Footer */}
                        <div className="modal-footer border-0">
                            <button
                                className="btn btn-outline-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>

                            <button
                                className="btn btn-danger"
                                onClick={() =>
                                    selectedPlan && handleBuy(selectedPlan._id)
                                }
                            >
                                Buy Now
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
