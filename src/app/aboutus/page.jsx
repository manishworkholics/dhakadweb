"use client"

import React from 'react'
import Header from '../components/Header/Page'
import Link from 'next/link'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { useRouter } from "next/navigation";
import SuccessStories from '../components/SuccessStories/Page';
import Footer from '../components/Footer/page';
import OurTeam from '../components/OurTeam/Page';

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
            <div className="container py-4">
                <div className="row my-5">
                    <div className="col-lg-6">
                        <div className="about-right position-relative">
                            <img src="/dhakadweb/assets/images/about.png" alt="" className='rounded-circle position-relative' />
                            <img src="/dhakadweb/assets/images/about.png" alt="" className='rounded-circle position-absolute img2' style={{ right: "60px", bottom: "-50px" }} />
                        </div>

                    </div>
                    <div className="col-lg-6">
                        <h1 className='fw-semibold'>Welcome To <br /><span className='text-D4AF37'>Dhakad Metrimony</span></h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste officia vel error ut est quas mollitia explicabo? Quisquam asperiores nisi perspiciatis! Ex odio consectetur earum debitis consequatur unde velit error!
                            Repudiandae minus maxime sed neque distinctio, atque consectetur dolores a ducimus commodi molestias incidunt. Assumenda vitae dolores debitis a quas quae praesentium dicta ipsa earum, animi eligendi, nisi excepturi veniam!
                            Porro eligendi perferendis eum nesciunt amet ea, tempora voluptas deserunt. Repellat facere eum est eius, architecto officia repudiandae quam sit illum sapiente hic, iste id accusantium temporibus, ab consequatur enim.</p>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="vision col-lg-6 col-md-6 col-12 mb-lg-0 mb-md-0 mb-3">
                        <div className="card rounded-4 p-4 bg-fdf7ee">
                            <h2 className='fw-bold mb-2'>Our <span className='text-D4AF37'>Vision </span></h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste officia vel error ut est quas mollitia explicabo? Quisquam asperiores nisi perspiciatis! Ex odio consectetur earum debitis consequatur unde velit error!
                                Repudiandae minus maxime sed neque distinctio, atque consectetur dolores a ducimus commodi molestias incidunt. Assumenda vitae dolores debitis a quas quae praesentium dicta ipsa earum, animi eligendi, nisi excepturi veniam!
                                Porro eligendi perferendis eum nesciunt amet ea, tempora voluptas deserunt. Repellat facere eum est eius, architecto officia repudiandae quam sit illum sapiente hic, iste id accusantium temporibus, ab consequatur enim.</p>
                        </div>

                    </div>
                    <div className="mission col-lg-6 col-md-6 col-12">
                        <div className="card rounded-4 p-4 bg-fdf7ee">
                            <h2 className='fw-bold mb-2'>Our <span className='text-D4AF37'>Mission</span> </h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste officia vel error ut est quas mollitia explicabo? Quisquam asperiores nisi perspiciatis! Ex odio consectetur earum debitis consequatur unde velit error!
                                Repudiandae minus maxime sed neque distinctio, atque consectetur dolores a ducimus commodi molestias incidunt. Assumenda vitae dolores debitis a quas quae praesentium dicta ipsa earum, animi eligendi, nisi excepturi veniam!
                                Porro eligendi perferendis eum nesciunt amet ea, tempora voluptas deserunt. Repellat facere eum est eius, architecto officia repudiandae quam sit illum sapiente hic, iste id accusantium temporibus, ab consequatur enim.</p>
                        </div>
                    </div>
                </div>
                <div className="about-sec">
                    <OurTeam />
                </div>
                <div className="queans">
                    <div className='queans-head d-flex justify-content-center mb-3'>
                        <h2 className='fw-semibold team'>Why Choose <span className='text-D4AF37'>Dhakad Matrimony?</span></h2>
                    </div>
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item mb-2 border rounded-3">
                            <h2 className="accordion-header border rounded-3">
                                <button className="accordion-button border rounded-3 " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Who can register?
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show border rounded-3 rounded-top-0" data-bs-parent="#accordionExample">
                                <div className="accordion-body rounded-bottom-3 rounded-top-0 border">
                                    <p>Anyone belonging to the Dhakad community who is looking for marriage can register. Both self-registered profiles and profiles created by family members are welcome on our platform.</p>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item mb-2 border rounded-3">
                            <h2 className="accordion-header border rounded-3">
                                <button className="accordion-button collapsed border rounded-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Is it safe and secure?
                                </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse border rounded-3 rounded-top-0" data-bs-parent="#accordionExample">
                                <div className="accordion-body rounded-bottom-3 rounded-top-0 border">
                                    <strong>This is the second item’s accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It’s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item mb-2 border rounded-3">
                            <h2 className="accordion-header border rounded-3">
                                <button className="accordion-button collapsed border rounded-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    How is it different?
                                </button>
                            </h2>
                            <div id="collapseThree" className="accordion-collapse collapse border rounded-3 rounded-top-0" data-bs-parent="#accordionExample">
                                <div className="accordion-body rounded-bottom-3 rounded-top-0 border">
                                    <strong>This is the third item’s accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It’s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item mb-2 border rounded-3">
                            <h2 className="accordion-header border rounded-3">
                                <button className="accordion-button collapsed border rounded-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                    Is registration free?
                                </button>
                            </h2>
                            <div id="collapseFour" className="accordion-collapse collapse border rounded-3 rounded-top-0" data-bs-parent="#accordionExample">
                                <div className="accordion-body rounded-bottom-3 rounded-top-0 border">
                                    <strong>This is the third item’s accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It’s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item border rounded-3">
                            <h2 className="accordion-header border rounded-3">
                                <button className="accordion-button collapsed border rounded-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                    How can I find matches?
                                </button>
                            </h2>
                            <div id="collapseFive" className="accordion-collapse collapse border rounded-3 rounded-top-0" data-bs-parent="#accordionExample">
                                <div className="accordion-body rounded-bottom-3 rounded-top-0 border">
                                    <strong>This is the third item’s accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It’s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Aboutus