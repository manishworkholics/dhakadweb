"use client"

import Header from "../components/Header/Page";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import SuccessStories from "../components/SuccessStories/Page";

const HomePage = () => {
    return (
        <div>
            <div className="main-container">
                <div className="">
                    <Header />
                </div>
                <div className="content">
                    {/* Home-Banner-Section */}
                    <div className="home-banner position-relative">
                        <div className="container position-relative">
                            <div className="position-absolute top-0 end-0 m-4 m-md-4 m-xl-5" style={{ zIndex: 11, width: "330px" }}>
                                <div className="p-4 rounded-4 shadow-lg"
                                    style={{ background: "rgba(0,0,0,0.55)" }}>
                                    {/* Profile Dropdown */}
                                    <div className="mb-3">
                                        <select className="form-select bg-dark border-white shadow-none text-white py-2">
                                            <option>Create Profile For</option>
                                            <option>Self</option>
                                            <option>Son</option>
                                            <option>Daughter</option>
                                        </select>
                                    </div>

                                    {/* Email */}
                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            className="form-control bg-dark text-white border-white shadow-none py-2"
                                            placeholder="Email Address"
                                        />
                                    </div>

                                    {/* Mobile */}
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control bg-dark text-white border-white shadow-none py-2"
                                            placeholder="Mobile No."
                                        />
                                    </div>

                                    {/* Password */}
                                    <div className="mb-3 position-relative">
                                        <input
                                            type="password"
                                            className="form-control bg-dark text-white border-white shadow-none py-2"
                                            placeholder="Create Password"
                                        />
                                    </div>

                                    {/* Checkbox */}
                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" id="agree" />
                                        <label className="form-check-label text-white" htmlFor="agree">
                                            Agree terms and conditions
                                        </label>
                                    </div>

                                    {/* Button */}
                                    <button className="btn btn-warning w-100 py-2 fw-semibold">
                                        Registration
                                    </button>

                                    <p className="small text-white mt-3">
                                        By clicking register free, you confirm that you accept the terms use and Privacy Policy
                                    </p>
                                </div>

                            </div>
                        </div>
                        <Swiper
                            className="mySwiper"
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            loop={true}>
                            <SwiperSlide>
                                <div className="banner-content position-relative" style={{ height: "85vh" }}>
                                    <img
                                        src="/assets/images/home-banner.png"
                                        alt="Home Banner"
                                        className="w-100 h-100 object-fit-cover"
                                    />

                                    <div
                                        className="position-absolute top-0 start-0 w-100 h-100"
                                        style={{
                                            background: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7))"
                                        }}
                                    ></div>

                                    {/* Content Layer */}
                                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-end">

                                        {/* MAIN CONTAINER */}
                                        <div className="container pb-5">
                                            <div className="row align-items-center">

                                                {/* LEFT TEXT SECTION */}
                                                <div className="col-md-6 text-center text-white mb-5 mb-md-0 mx-auto">

                                                    <div className="d-flex justify-content-center mb-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="44" viewBox="0 0 45 44" fill="none">
                                                            <path d="M22.229 13.2059L22.3185 11.054L22.229 13.2059ZM22.2952 11.6142C22.5511 5.46001 27.7456 0.680333 33.8998 0.936243C40.054 1.19215 44.8309 6.45449 44.575 12.6087C44.4373 15.9193 42.8475 19.0313 40.2269 21.063L27.8004 30.6992C25.7612 32.2807 24.0918 34.2881 22.9085 36.5814C21.7252 38.8747 21.0567 41.3987 20.9495 43.977C21.0568 41.3987 20.6 38.828 19.6113 36.4443C18.6225 34.0607 17.1254 31.9216 15.2246 30.1762L3.64103 19.5416C2.43461 18.4283 1.48491 17.0657 0.857871 15.5485C0.230829 14.0313 -0.0585421 12.3958 0.00984304 10.7556C0.265753 4.60134 5.463 -0.246238 11.6172 0.00967206C17.7715 0.265582 22.5511 5.46001 22.2952 11.6142Z" fill="#FF4B4B" />
                                                        </svg>
                                                    </div>
                                                    <h1 className="fw-bold display-5">Beyond Matrimony</h1>
                                                    <p className="fs-5">Discover A Bond That Lasts Forever</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div className="banner-content position-relative" style={{ height: "85vh" }}>
                                    <img
                                        src="/assets/images/home-banner.png"
                                        alt="Home Banner"
                                        className="w-100 h-100 object-fit-cover"
                                    />

                                    <div
                                        className="position-absolute top-0 start-0 w-100 h-100"
                                        style={{
                                            background: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7))"
                                        }}
                                    ></div>

                                    {/* Content Layer */}
                                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-end">

                                        {/* MAIN CONTAINER */}
                                        <div className="container pb-5">
                                            <div className="row align-items-center">

                                                {/* LEFT TEXT SECTION */}
                                                <div className="col-md-6 text-center text-white mb-5 mb-md-0 mx-auto">

                                                    <div className="d-flex justify-content-center mb-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="44" viewBox="0 0 45 44" fill="none">
                                                            <path d="M22.229 13.2059L22.3185 11.054L22.229 13.2059ZM22.2952 11.6142C22.5511 5.46001 27.7456 0.680333 33.8998 0.936243C40.054 1.19215 44.8309 6.45449 44.575 12.6087C44.4373 15.9193 42.8475 19.0313 40.2269 21.063L27.8004 30.6992C25.7612 32.2807 24.0918 34.2881 22.9085 36.5814C21.7252 38.8747 21.0567 41.3987 20.9495 43.977C21.0568 41.3987 20.6 38.828 19.6113 36.4443C18.6225 34.0607 17.1254 31.9216 15.2246 30.1762L3.64103 19.5416C2.43461 18.4283 1.48491 17.0657 0.857871 15.5485C0.230829 14.0313 -0.0585421 12.3958 0.00984304 10.7556C0.265753 4.60134 5.463 -0.246238 11.6172 0.00967206C17.7715 0.265582 22.5511 5.46001 22.2952 11.6142Z" fill="#FF4B4B" />
                                                        </svg>
                                                    </div>

                                                    <h1 className="fw-bold display-5">Beyond Matrimony</h1>
                                                    <p className="fs-5">Discover A Bond That Lasts Forever</p>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>

                    {/* Home-Section-2 */}
                    <div className="home-section-2">
                        <section className="py-5" style={{ background: "#fdf7ee" }}>
                            <div className="container">

                                {/* Section Heading */}
                                <div className="text-left mb-5">
                                    <p className="mb-1 text-muted fw-semibold">Celebrating Over 10 Years Of</p>
                                    <h2 className="fw-semibold">
                                        Bringing <span style={{ color: "#ff4b4b" }}>Hearts Together</span>
                                    </h2>
                                </div>

                                {/* Cards Row */}
                                <div className="row g-4">

                                    {/* CARD 1 */}
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <div className="p-4 rounded-4 border h-100 shadow-sm" style={{ background: "#fdf7ee" }}>
                                            <div className="mb-3">
                                                <Image
                                                    src="/assets/images/user-icon.png"
                                                    width={50}
                                                    height={50}
                                                    alt="Verified Profiles"
                                                />
                                            </div>
                                            <h5 className="fw-bold mb-2">Verified & Genuine Profiles</h5>
                                            <p className="text-dark mb-0">
                                                Find Your Perfect Match With Profiles Screened By Location,
                                                Community, Profession & More — From Lakhs Of Trusted Members.
                                            </p>
                                        </div>
                                    </div>

                                    {/* CARD 2 */}
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <div className="p-4 rounded-4 border h-100 shadow-sm" style={{ background: "#fdf7ee" }}>
                                            <div className="mb-3">
                                                <Image
                                                    src="/assets/images/magnifier-icon.png"
                                                    width={50}
                                                    height={50}
                                                    alt="Verification Visits"
                                                />
                                            </div>
                                            <h5 className="fw-bold mb-2">Personal Verification Visits</h5>
                                            <p className="text-dark mb-0">
                                                Enjoy Extra Assurance With Profiles Personally Verified By
                                                Our On-Ground Agents.
                                            </p>
                                        </div>
                                    </div>

                                    {/* CARD 3 */}
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <div className="p-4 rounded-4 border h-100 shadow-sm" style={{ background: "#fdf7ee" }}>
                                            <div className="mb-3">
                                                <Image
                                                    src="/assets/images/privacy-policy-icon.png"
                                                    width={50}
                                                    height={50}
                                                    alt="Your Privacy" />
                                            </div>
                                            <h5 className="fw-bold mb-2">Your Privacy, Your Control</h5>
                                            <p className="text-dark mb-0">
                                                Decide Who Can Access Your Contact Details, Photos & Videos —
                                                Complete Privacy At Your Fingertips.
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Home-Section-3 */}
                    <div className="home-section-3">
                        <SuccessStories />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;