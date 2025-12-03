"use client"

import React from 'react'
import Header from '../components/Header/Page'
import Link from 'next/link'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { useRouter } from "next/navigation";

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

            </div>
        </div>
    )
}

export default Contactus