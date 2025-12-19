"use client"

import React from 'react'
import Header from '../components/Header/Page'
import Link from 'next/link'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from '../components/Footer/page';

const Contactus = () => {
    const router = useRouter();

    return (
        <div className='login-page bg-FDFBF7'>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="">
                <Header />
                <div className="sub-bg">
                    <h4 className="text-white p-4 text-center font-bold mb-0 pageheading-banner">
                        Lakhs of Happy Marriages
                    </h4>
                </div>
            </div>
            <div className=" py-5">
                <div className="container py-5">
                    <div className="mx-auto text-center mb-5" style={{ maxWidth: "900px;" }}>
                        <h1 className="mb-0">Contact For Any Query</h1>
                    </div>
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-4">
                            <div className="bg-white rounded p-4">
                                <div className="text-center mb-4">
                                    <i className="fa fa-map-marker-alt fa-3x mb-2 text-D4AF37"></i>
                                    <p className="mb-">315, Princes Business Skypark, <br/>AB Road, Vijay Nagar Indore, M.P. 452010</p>
                                </div>
                                <div className="text-center mb-4">
                                    <i className="fa fa-phone-alt fa-3x mb-3 text-D4AF37"></i>
                                    <h4 className="">Mobile</h4>
                                    <p className="mb-0">+91 8982079600</p>
                                    <p className="mb-0">+91 8770896005-6-7</p>
                                </div>

                                <div className="text-center">
                                    <i className="fa fa-envelope-open fa-3x  mb-3 text-D4AF37"></i>
                                    <h4 className="">Email</h4>
                                    <p className="mb-0">dhakadmatrimonial@gmail.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <form>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="name"
                                                placeholder="Your Name" />
                                            <label for="name">Your Name</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="email" className="form-control" id="email"
                                                placeholder="Your Email" />
                                            <label for="email">Your Email</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="number" className="form-control" id="number"
                                                placeholder="Mobile Number" />
                                            <label htmlFor="number">Mobile Number</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="subject"
                                                placeholder="Subject" />
                                            <label htmlFor="subject">Subject</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea className="form-control" placeholder="Leave a message here"
                                                id="message" style={{ height: "160px" }}></textarea>
                                            <label htmlFor="message" className="fm-karla">Message</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn w-100 py-3 bg-D4AF37 contact-btn text-white" type="submit">Send
                                            Message</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contactus