"use client";

import React, { useState } from 'react'
import Header from '../components/Header/Page'
import Footer from '../components/Footer/page'
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Contactus = () => {
    const API_URL = "http://143.110.244.163:5000/api/contact";
    const [showModal, setShowModal] = useState(false);

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(API_URL, form);
            if (res.data.success) {
                // toast.success("Message Sent Successfully!");
                setForm({ name: "", email: "", phone: "", subject: "", message: "" });
                setShowModal(true);
            }
        } catch {
            toast.error("Failed to send message");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='login-page bg-FDFBF7'>
            <ToastContainer position='top-right' />
            <Header />

            {/* Banner */}
            <div className="sub-bg">
                <h4 className="text-white p-4 text-center font-bold mb-0 pageheading-banner">
                    Lakhs of Happy Marriages
                </h4>
            </div>

            {/* Form Section */}
            <div className="container py-5">
                <div className="mx-auto text-center mb-5" style={{ maxWidth: "900px" }}>
                    <h1 className="mb-0">Contact For Any Query</h1>
                </div>
                <div className="row g-5 align-items-center">

                    {/* Left Contact Details */}
                    <div className="col-lg-4">
                        <div className="bg-white rounded p-4">
                            <div className="text-center mb-4">
                                <i className="fa fa-map-marker-alt fa-3x mb-2 text-D4AF37"></i>
                                <p>315, Princes Business Skypark, <br /> AB Road, Vijay Nagar Indore</p>
                            </div>
                            <div className="text-center mb-4">
                                <i className="fa fa-phone-alt fa-3x mb-3 text-D4AF37"></i>
                                <h4>Mobile</h4>
                                <p>+91 8982079600</p>
                                <p>+91 8770896005-6-7</p>
                            </div>
                            <div className="text-center">
                                <i className="fa fa-envelope-open fa-3x mb-3 text-D4AF37"></i>
                                <h4>Email</h4>
                                <p>dhakadmatrimonial@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Form */}
                    <div className="col-lg-8">
                        <form onSubmit={handleSubmit}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <input id='name' value={form.name} onChange={handleChange} className='form-control' placeholder="Your Name" required />
                                </div>
                                <div className="col-md-6">
                                    <input id='email' value={form.email} onChange={handleChange} type="email" className='form-control' placeholder="Your Email" />
                                </div>
                                <div className="col-md-6">
                                    <input id='phone' value={form.phone} onChange={handleChange} type="number" className='form-control' placeholder="Mobile Number" required />
                                </div>
                                <div className="col-md-6">
                                    <input id='subject' value={form.subject} onChange={handleChange} type="text" className='form-control' placeholder="Subject" />
                                </div>
                                <div className="col-12">
                                    <textarea id='message' value={form.message} onChange={handleChange} className='form-control' placeholder="Message" style={{ height: "160px" }} required></textarea>
                                </div>

                                <div className="col-12">
                                    <button disabled={loading} className='btn w-100 py-3 bg-D4AF37 text-white fw-semibold' type="submit">
                                        {loading ? "Sending..." : "Send Message"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>


            {showModal && (
                <div
                    className="modal fade show"
                    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content rounded-4 border-0">

                            <div className="modal-header border-0">
                                <h5 className="modal-title fw-bold text-success">Thank You!</h5>
                                <button
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>

                            <div className="modal-body text-center px-4">
                                <div className="mb-3">
                                    <i className="fa fa-check-circle text-success" style={{ fontSize: 50 }}></i>
                                </div>

                                <h5 className="fw-semibold mb-2">Thanks for contacting us 💛</h5>

                                <p className="text-muted mb-0">
                                    We have received your message successfully.
                                    <br />
                                    Our support team will contact you shortly.
                                </p>
                            </div>

                            <div className="modal-footer border-0 justify-content-center">
                                <button
                                    className="btn bg-D4AF37 text-white px-4"
                                    onClick={() => setShowModal(false)}
                                >
                                    Okay
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Contactus;