"use client"

import Header from "../components/Header/Page";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SuccessStories from "../components/SuccessStories/Page";
import FeaturesProfile from "../components/FeaturesProfile/page";
import Readytomeet from "../components/Readytomeet/page";
import MemberTestimonials from "../components/MemberTestimonials/page";
import Footer from "../components/Footer/page";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


const HomePage = () => {
    const [token, setToken] = useState("");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [passwordError, setPasswordError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedToken = sessionStorage.getItem("token");
            const savedUser = sessionStorage.getItem("user");

            if (savedToken) setToken(savedToken);
            if (savedUser) setUser(JSON.parse(savedUser));
            setLoading(false);
        }
    }, []);

    const router = useRouter();

    const [formData, setFormData] = useState({
        createdfor: "",
        name: "",
        email: "",
        phone: "",
        password: "",
        agree: false
    });


    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return regex.test(password);
    };



    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === "phone") {
            const numericVal = value.replace(/\D/g, ""); // Remove non-numeric
            if (numericVal.length <= 10) {
                setFormData({ ...formData, phone: numericVal });
            }
            return;
        }
        if (name === "name") {
            if (/^[A-Za-z ]*$/.test(value)) {
                setFormData({ ...formData, name: value });
            }
            return;
        }
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const validateForm = () => {
        if (!formData.createdfor)
            return "Please select profile type";

        if (!formData.name.trim())
            return "Name is required";

        if (formData.name.trim().length < 3)
            return "Name must be at least 3 characters";

        if (!formData.email)
            return "Email is required";

        // Basic Email Validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailPattern.test(formData.email))
            return "Invalid email address";

        if (!formData.phone)
            return "Mobile number is required";

        if (formData.phone.length !== 10)
            return "Mobile number must be exactly 10 digits";

        if (!formData.password)
            return "Password is required";

        if (formData.password.length < 6)
            return "Password should be minimum 6 characters";

        if (!formData.agree)
            return "Please agree to the terms and conditions";

        return null;
    };

    const handleSubmit = async () => {
        const errorMessage = validateForm();
        if (!validatePassword(formData.password)) {
            alert("Password must be strong and include at least one alphabet, one digit, and one special character.");
            return;
        }
        if (errorMessage) {
            toast.error(errorMessage);
            return;
        }
        try {
            const response = await axios.post('http://206.189.130.102:5000/api/auth/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                createdfor: formData.createdfor,
                phone: formData.phone
            });
            if (response?.data?.success) {
                alert("Registration Successful")
                toast.success("Registration Successful");
                // sessionStorage.setItem("token", response?.data?.token);
                router.push("/login");
            } else {
                toast.error(response?.data?.message || "Registration Failed");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Registration Failed!");
        }
    }

    if (loading) return null;

    return (
        <div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="main-container">
                <div className="">
                    <Header />
                </div>
                <div className="content">
                    {/* Home-Banner-Section */}
                    <div className="home-banner position-relative">
                        <div className="container position-relative">

                            <div className="position-absolute top-0 end-0 m-4 m-md-4 m-xl-5" style={{ zIndex: 11, width: "330px" }}>

                                {!token ? (<>
                                    <div className="p-4 rounded-4 shadow-lg"
                                        style={{ background: "rgba(0,0,0,0.55)" }}>
                                        {/* Profile Dropdown */}
                                        <div className="mb-lg-3 mb-md-3 mb-2">
                                            <select className="form-select bg-dark border-white shadow-none text-white py-2" name="createdfor" value={formData.createdfor} onChange={handleChange}>
                                                <option value="">Create Profile For</option>
                                                <option value="self">Self</option>
                                                <option value="son">Son</option>
                                                <option value="daughter">Daughter</option>
                                            </select>
                                        </div>

                                        {/* Name */}
                                        <div className="mb-lg-3 mb-md-3 mb-2">
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="form-control bg-dark border-white shadow-none text-white py-2"
                                                placeholder="Full Name"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div className="mb-lg-3 mb-md-3 mb-2">
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="form-control bg-dark border-white shadow-none text-white py-2"
                                                placeholder="Email Address"
                                            />
                                        </div>

                                        {/* Phone */}
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="form-control bg-dark border-white shadow-none text-white py-2 mb-lg-3 mb-md-3 mb-2"
                                            placeholder="Mobile Number"
                                        />

                                        {/* Password */}
                                        <div className="mb-lg-3 mb-md-3 mb-2 position-relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={formData.password}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setPasswordError(!validatePassword(e.target.value));
                                                }}
                                                className="form-control bg-dark text-white border-white shadow-none py-2"
                                                placeholder="Create Password"
                                            />
                                            <span
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="position-absolute end-2 top-50 translate-middle-y text-white"
                                                style={{ cursor: "pointer", right: "15px" }}
                                            >
                                                {showPassword ? (
                                                    <i className="bi bi-eye-slash"></i>
                                                ) : (
                                                    <i className="bi bi-eye"></i>
                                                )}
                                            </span>

                                        </div>

                                        {passwordError && (
                                            <p className="text-danger small mt-1">
                                                Password must contain letters, numbers & a special character.
                                            </p>
                                        )}

                                        {/* Checkbox */}
                                        <div className="form-check mb-lg-3 mb-md-3 mb-2">
                                            <input className="form-check-input" type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} id="agree" />
                                            <label className="form-check-label text-white" htmlFor="agree">
                                                I agree to the Terms and Conditions.
                                            </label>
                                        </div>

                                        {/* Button */}
                                        <button className="btn btn-warning w-100 py-2 fw-semibold" onClick={handleSubmit}>
                                            Registration
                                        </button>

                                        <p className="small text-white mt-lg-3 mt-md-3 mt-2 mb-0">
                                            By clicking Register Free, you agree to our Terms of Use and Privacy Policy.
                                        </p>
                                    </div>
                                </>) : ('')}

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
                                        src="/dhakadweb/assets/images/home-banner.png"
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
                                        src="/dhakadweb/assets/images/home-banner.png"
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
                                    <p className="mb-1 text-muted fw-semibold">Celebrating Over 10 Years of</p>
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
                                                <img
                                                    src="/dhakadweb/assets/images/user-icon.gif"
                                                    width={50}
                                                    height={50}
                                                    alt="Verified Profiles"
                                                />
                                            </div>
                                            <h5 className="fw-bold mb-2">Verified & Genuine Profiles</h5>
                                            <p className="text-dark mb-0">
                                                {/* Find Your Perfect Match With Profiles Screened By Location,
                                                Community, Profession & More — From Lakhs Of Trusted Members. */}
                                                Find Your Perfect Match With Profiles Screened By Location, Community, Profession & More — From Lakhs Of Trusted Members.
                                                Update to : Find your perfect match with profiles screened by location, community, profession, and more — from lakhs of trusted members.
                                            </p>
                                        </div>
                                    </div>

                                    {/* CARD 2 */}
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <div className="p-4 rounded-4 border h-100 shadow-sm" style={{ background: "#fdf7ee" }}>
                                            <div className="mb-3">
                                                <img
                                                    src="/dhakadweb/assets/images/magnifier-icon.gif"
                                                    width={50}
                                                    height={50}
                                                    alt="Verification Visits"
                                                />
                                            </div>
                                            <h5 className="fw-bold mb-2">Personal Verification Visits</h5>
                                            <p className="text-dark mb-0">
                                                {/* Enjoy Extra Assurance With Profiles Personally Verified By
                                                Our On-Ground Agents. */}
                                                Enjoy Extra Assurance With Profiles Personally Verified By Our On-Ground Agents.
                                                Update to : Enjoy extra assurance with profiles personally verified by our on-ground agents.                                            </p>
                                        </div>
                                    </div>

                                    {/* CARD 3 */}
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <div className="p-4 rounded-4 border h-100 shadow-sm" style={{ background: "#fdf7ee" }}>
                                            <div className="mb-3">
                                                <img
                                                    src="/dhakadweb/assets/images/privacy-policy-icon.gif"
                                                    width={50}
                                                    height={50}
                                                    alt="Your Privacy" />
                                            </div>
                                            <h5 className="fw-bold mb-2">Your Privacy, Your Control</h5>
                                            <p className="text-dark mb-0">
                                                {/* Decide Who Can Access Your Contact Details, Photos & Videos —
                                                Complete Privacy At Your Fingertips. */}
                                                Decide Who Can Access Your Contact Details, Photos & Videos — Complete Privacy At Your Fingertips.
                                                Update to : Decide who can access your contact details, photos, and videos — complete privacy at your fingertips.                                            </p>
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

                    {/* Home-Section-4 */}
                    <div className="home-section-4">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card border-0 rounded-5 bg-FFEEEE mt-5">
                                        <div className="card-body p-5 mt-4">
                                            <div className="row">
                                                <div className="col-12 col-lg-6 mb-5 mb-lg-0">
                                                    <button className="btn btn-outline-warning rounded-pill bg-FFF1C4 text-dark mb-3 px-4">Download</button>
                                                    <h3 className='fw-semibold mb-3'>Dhakar Matrimony
                                                        <span className="text-danger"> Mobile App</span>
                                                    </h3>
                                                    <p className='mb-4 text-6B6B6B'>Access quick & simple search, instant updates and a great user experience on your phone. Download our app which are the best matrimony app for dhakar samaj.</p>
                                                    <div className="row">
                                                        <div className="col-12 col-lg-9 me-auto ">
                                                            <div className="card border-0 rounded-5 bg-white shadow p-3 w-fit-content">
                                                                <div className="row">
                                                                    <p className="mb-4 text-6B6B6B text-center">Point your phone camera at the QR code or use one of the download links below</p>
                                                                    <div className="col-12 col-lg-6 mb-lg-0 mb-4">
                                                                        <div className="text-center">
                                                                            <img src="/dhakadweb/assets/images/download-barcode.png" alt="qr-code" className='w-75' />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-lg-6 d-flex flex-column justify-content-center align-items-center">
                                                                        <img src="/dhakadweb/assets/images/appstore.png" alt="app-store" className='mb-2 w-75' />
                                                                        <img src="/dhakadweb/assets/images/playstore.png" alt="google-play" className='w-75' />
                                                                    </div>
                                                                    <p className="mt-4 text-6B6B6B text-center">Or
                                                                        <span className="text-danger fw-medium"> Get Download </span>
                                                                        on yur SMS/Email
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="col-12 col-lg-6">
                                                    <div className="">
                                                        <img src="/dhakadweb/assets/images/download-app-img.png" alt="" className="w-100" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="home-section-5">
                        <FeaturesProfile />
                    </div>

                    <div className="home-section-6">
                        <MemberTestimonials />
                    </div>

                    <div className="home-section-7">
                        <Readytomeet />
                    </div>

                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default HomePage;