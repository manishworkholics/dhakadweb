"use client";

import React from "react";
import Link from "next/link";
export default function Footer() {
    return (
        <>
            <footer className="bg-white text-dark pt-5 pb-1">
                <div className="container">
                    <div className="row pb-4">
                        <div className="col-12 col-md-6 col-lg-2 d-flex align-items-center">
                            <div className="">
                                <img src="/assets/images/dhakad-logo.png" alt="" className="w-100" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <h6 className="fs-6 fw-semibold text-dark mb-2 text-uppercase">Address</h6>
                            <address className="text-sm text-secondary">
                                <p className="mb-0 text-5A5A5A">315, Princes Business Skypark, AB Road, Vijay Nagar Indore, M.P. 452010</p>
                            </address>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <h6 className="fs-6 fw-semibold text-dark mb-2 text-uppercase">Contact</h6>
                            <div className="text-icon d-flex">
                                <div className="icon me-2">
                                    <i className="fa-solid fa-phone text-danger"></i>
                                </div>
                                <div className="text">
                                    <p className="mb-1 text-5A5A5A fw-medium">0731-4979600</p>
                                </div>
                            </div>
                            <div className="text-icon d-flex">
                                <div className="icon me-2">
                                    <i className="fa-solid fa-phone text-danger"></i>
                                </div>
                                <div className="text">
                                    <p className="mb-1 text-5A5A5A fw-medium">8982079600, 8770896005-6-7</p>
                                </div>
                            </div>
                            <div className="text-icon d-flex">
                                <div className="icon me-2">
                                    <i className="fa-regular fa-envelope text-danger"></i>
                                </div>
                                <div className="text">
                                    <p className="mb-1 text-5A5A5A fw-medium">dhakadmatrimonial@gmail.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-2 d-flex align-items-center">
                            <img src="/assets/images/sure 1.png" alt="" className="w-100" />
                        </div>
                        <div className="col-12 col-md-6 col-lg-2 d-flex align-items-center">
                            <div className="social d-flex justify-content-between w-100">
                                <div className="icon border border-1 rounded-circle px-2 py-1">
                                    <Link href="">
                                        <i className="fa-brands fa-facebook text-secondary"></i></Link>
                                </div>
                                <div className="icon border border-1 rounded-circle px-2 py-1">
                                    <Link href=""> <i className="fa-brands fa-x-twitter text-secondary"></i></Link>
                                </div>
                                <div className="icon border border-1 rounded-circle px-2 py-1">
                                    <Link href=""><i className="fa-brands fa-instagram text-secondary"></i></Link>
                                </div>
                                <div className="icon border border-1 rounded-circle px-2 py-1">
                                    <Link href=""><i className="fa-brands fa-linkedin text-secondary"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="container-fluid bg-EBEBEB py-2">
                <div className="container d-flex justify-content-between align-items-center">
                    <p className="mb-0 fw-normal text-787878" style={{ fontSize: "14px" }}>Copyright 2020. All Rights Reserved</p>
                    <p className="mb-0 fw-normal text-787878" style={{ fontSize: "14px" }}>Term & conditions     |    Privacy Policy</p>
                </div>
            </div>
        </>
    );
}
