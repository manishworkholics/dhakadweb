"use client"

import React from 'react'
import Header from '../components/Header/Page'
import Link from 'next/link'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { useRouter } from "next/navigation";

const Aboutus = () => {
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
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-4">
                        <img src="/dhakadweb/assets/images/about.png" alt=""  className='w-100 rounded-2'/>
                    </div>
                    <div className="col-lg-8">
                        <h2 className='fw-semibold'>About Us</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste officia vel error ut est quas mollitia explicabo? Quisquam asperiores nisi perspiciatis! Ex odio consectetur earum debitis consequatur unde velit error!
                        Repudiandae minus maxime sed neque distinctio, atque consectetur dolores a ducimus commodi molestias incidunt. Assumenda vitae dolores debitis a quas quae praesentium dicta ipsa earum, animi eligendi, nisi excepturi veniam!
                        Porro eligendi perferendis eum nesciunt amet ea, tempora voluptas deserunt. Repellat facere eum est eius, architecto officia repudiandae quam sit illum sapiente hic, iste id accusantium temporibus, ab consequatur enim.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Aboutus