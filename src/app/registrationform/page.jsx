"use client";

import React, { useState } from "react";
import Header from '../components/Header/Page'
import Image from "next/image";

const registrationform = () => {

    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        day: "",
        month: "",
        year: "",
        motherTongue: "",
        email: "",
        password: "",
        height: "",
        physicalStatus: "",
        maritalStatus: "",
        education: "",
        employmentType: "",
        occupation: "",
        dietType: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <div className='otp-page bg-FDFBF7' style={{ minHeight: '100vh' }}>
            <div className="">
                <Header />
            </div>
            <div className="otp-content py-5">

                <div className="container">
                    <div className="row">

                        <div className="col-12 col-lg-8 col-xl-7 col-xxl-6 mx-auto mb-4">

                            {/* ---------------- HEADER ---------------- */}
                            <div className="d-flex justify-content-between">
                                <h6 className="mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" fill="none" onClick={step > 1 ? prevStep : null} style={{ cursor: "pointer" }}>
                                        <path d="M0.292893 6.65691C-0.0976311 7.04743 -0.0976311 7.6806 0.292893 8.07112L6.65685 14.4351C7.04738 14.8256 7.68054 14.8256 8.07107 14.4351C8.46159 14.0446 8.46159 13.4114 8.07107 13.0209L2.41421 7.36401L8.07107 1.70716C8.46159 1.31664 8.46159 0.68347 8.07107 0.292946C7.68054 -0.0975785 7.04738 -0.0975785 6.65685 0.292946L0.292893 6.65691ZM1 7.36401V8.36401H17V7.36401V6.36401H1V7.36401Z" fill="black" />
                                    </svg>
                                    <span className="ms-2">
                                        {step === 1 && "Basic Details"}
                                        {step === 2 && "Personal and Religious Details"}
                                        {step === 3 && "Professional Details"}
                                        {step === 4 && "Additional Details"}
                                    </span>
                                </h6>

                                <p className="mb-2"> Step {step}/4 </p>
                            </div>

                            {/* ---------------- CARD ---------------- */}
                            <div className="card shadow border-0 rounded-4">
                                <div className="card-body p-4">

                                    {/* ---------------- STEP 1 ---------------- */}
                                    {step === 1 && (
                                        <form>
                                            <div className="mb-3">
                                                <label className="form-label">Date of birth</label>
                                                <div className="d-flex gap-3">
                                                    <select name="day" className="form-select" value={formData.day} onChange={handleChange}>
                                                        <option value="">Day</option>
                                                        {[...Array(31)].map((_, i) => (
                                                            <option key={i} value={i + 1}>{i + 1}</option>
                                                        ))}
                                                    </select>

                                                    <select name="month" className="form-select" value={formData.month} onChange={handleChange}>
                                                        <option value="">Month</option>
                                                        {[...Array(12)].map((_, i) => (
                                                            <option key={i} value={i + 1}>{i + 1}</option>
                                                        ))}
                                                    </select>

                                                    <select name="year" className="form-select" value={formData.year} onChange={handleChange}>
                                                        <option value="">Year</option>
                                                        {[...Array(60)].map((_, i) => (
                                                            <option key={i} value={2024 - i}>{2024 - i}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Mother tongue</label>
                                                <select
                                                    name="motherTongue"
                                                    className="form-select"
                                                    value={formData.motherTongue}
                                                    onChange={handleChange}
                                                >
                                                    <option value="Hindi">Hindi</option>
                                                    <option value="English">English</option>
                                                    <option value="Gujarati">Gujarati</option>
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <input
                                                    name="email"
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <input
                                                    name="password"
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Create password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                />
                                                <div className="form-text">Your password must be within 8-10 characters</div>
                                            </div>

                                            <button type="button" onClick={nextStep} className="btn bg-D4AF37 w-100 text-white mb-2">
                                                Next
                                            </button>
                                        </form>
                                    )}

                                    {/* ---------------- STEP 2 ---------------- */}
                                    {step === 2 && (
                                        <>
                                            <div className="mb-3">
                                                <label className="form-label">Height</label>
                                                <select
                                                    name="gender"
                                                    className="form-select"
                                                    value={formData.gender}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select your hight</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Your physical status</label>

                                                <div className="d-flex gap-3">
                                                    <input
                                                        type="radio"
                                                        className="btn-check"
                                                        name="physicalStatus"
                                                        id="physically-normal"
                                                        autoComplete="off"
                                                        defaultChecked
                                                    />
                                                    <label className="btn btn-outline-danger rounded-pill" htmlFor="physically-normal">
                                                        Normal
                                                    </label>

                                                    <input
                                                        type="radio"
                                                        className="btn-check"
                                                        name="physicalStatus"
                                                        id="physically-challenged"
                                                        autoComplete="off"
                                                    />
                                                    <label className="btn btn-outline-danger rounded-pill" htmlFor="physically-challenged">
                                                        Physically Challenged
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Your marital status</label>

                                                <div className="d-flex gap-3">

                                                    <input
                                                        type="radio"
                                                        className="btn-check"
                                                        name="maritalStatus"
                                                        id="never-married"
                                                        autoComplete="off"
                                                        defaultChecked
                                                    />
                                                    <label className="btn btn-outline-danger rounded-pill" htmlFor="never-married">
                                                        Never married
                                                    </label>

                                                    <input
                                                        type="radio"
                                                        className="btn-check"
                                                        name="maritalStatus"
                                                        id="widower"
                                                        autoComplete="off"
                                                    />
                                                    <label className="btn btn-outline-danger rounded-pill" htmlFor="widower">
                                                        Widower
                                                    </label>

                                                    <input
                                                        type="radio"
                                                        className="btn-check"
                                                        name="maritalStatus"
                                                        id="awaiting-divorce"
                                                        autoComplete="off"
                                                    />
                                                    <label className="btn btn-outline-danger rounded-pill" htmlFor="awaiting-divorce">
                                                        Awaiting divorce
                                                    </label>

                                                    <input
                                                        type="radio"
                                                        className="btn-check"
                                                        name="maritalStatus"
                                                        id="divorced"
                                                        autoComplete="off"
                                                    />
                                                    <label className="btn btn-outline-danger rounded-pill" htmlFor="divorced">
                                                        Divorced
                                                    </label>

                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Religion</label>
                                                <select
                                                    name="gender"
                                                    className="form-select"
                                                    value={formData.gender}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select religion</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Cast</label>
                                                <select
                                                    name="gender"
                                                    className="form-select"
                                                    value={formData.gender}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select cast</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                </select>
                                            </div>

                                            <button onClick={nextStep} className="btn bg-D4AF37 text-white w-100">Next</button>
                                        </>
                                    )}

                                    {/* ---------------- STEP 3 ---------------- */}
                                    {step === 3 && (
                                        <>
                                            <div className="mb-3">
                                                <label className="form-label">Professional Details</label>
                                                <select
                                                    name="gender"
                                                    className="form-select mb-3"
                                                    value={formData.gender}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select your education details</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                </select>
                                                <select
                                                    name="gender"
                                                    className="form-select mb-3"
                                                    value={formData.gender}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select your employment type</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                </select>
                                                <select
                                                    name="gender"
                                                    className="form-select"
                                                    value={formData.gender}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select your occupation</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Annual Income</label>
                                                <select
                                                    name="gender"
                                                    className="form-select mb-3"
                                                    value={formData.gender}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select your annual income</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                </select>
                                            </div>

                                            <button onClick={nextStep} className="btn bg-D4AF37 text-white w-100">Next</button>
                                        </>
                                    )}

                                    {/* ---------------- STEP 4 ---------------- */}
                                    {step === 4 && (
                                        <>
                                            <div className="mb-3">
                                                <label className="form-label">Select family status</label>

                                                <div className="d-flex gap-3">

                                                    <input
                                                        type="radio"
                                                        className="btn-check"
                                                        name="maritalStatus"
                                                        id="never-married"
                                                        autoComplete="off"
                                                        defaultChecked
                                                    />
                                                    <label className="btn btn-outline-danger rounded-pill" htmlFor="never-married">
                                                        Middle class
                                                    </label>

                                                    <input
                                                        type="radio"
                                                        className="btn-check"
                                                        name="maritalStatus"
                                                        id="widower"
                                                        autoComplete="off"
                                                    />
                                                    <label className="btn btn-outline-danger rounded-pill" htmlFor="widower">
                                                        Upper middle class
                                                    </label>

                                                    <input
                                                        type="radio"
                                                        className="btn-check"
                                                        name="maritalStatus"
                                                        id="awaiting-divorce"
                                                        autoComplete="off"
                                                    />
                                                    <label className="btn btn-outline-danger rounded-pill" htmlFor="awaiting-divorce">
                                                        Rich / Affluent (Elite)
                                                    </label>

                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Diet</label>

                                                <div className="d-flex gap-3">

                                                    <div
                                                        className="form-check btn btn-outline-secondary rounded-pill"
                                                        style={{ paddingLeft: "35px" }}
                                                    >
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="dietType"
                                                            id="diet-veg"
                                                        />
                                                        <label className="form-check-label" htmlFor="diet-veg">
                                                            Veg
                                                        </label>
                                                    </div>

                                                    <div
                                                        className="form-check btn btn-outline-secondary rounded-pill"
                                                        style={{ paddingLeft: "35px" }}
                                                    >
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="dietType"
                                                            id="diet-nonveg"
                                                            defaultChecked
                                                        />
                                                        <label className="form-check-label" htmlFor="diet-nonveg">
                                                            Nonveg
                                                        </label>
                                                    </div>

                                                    <div
                                                        className="form-check btn btn-outline-secondary rounded-pill"
                                                        style={{ paddingLeft: "35px" }}
                                                    >
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="dietType"
                                                            id="diet-occasionally"
                                                        />
                                                        <label className="form-check-label" htmlFor="diet-occasionally">
                                                            Occasionally Non - Veg
                                                        </label>
                                                    </div>

                                                    <div
                                                        className="form-check btn btn-outline-secondary rounded-pill"
                                                        style={{ paddingLeft: "35px" }}
                                                    >
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="dietType"
                                                            id="diet-vegan"
                                                        />
                                                        <label className="form-check-label" htmlFor="diet-vegan">
                                                            Vegan
                                                        </label>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="exampleFormControlTextarea1" className="form-label">A few words about myself</label>
                                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="I have a Bachelor's degree and I am employed in private Sector as a teaching / academician currently based in Amadalavalasa."></textarea>
                                            </div>

                                            <button
                                                className="btn bg-D4AF37 text-white w-100"
                                                onClick={() => setSubmitted(true)}
                                            >
                                                Submit
                                            </button>
                                        </>
                                    )}

                                    {submitted && (
                                        <div className="text-center">
                                            <Image src="/assets/images/checkmark.png" alt="success" width={100} height={100} className="mb-4" />
                                            <h5 className="text-success">Congratulation</h5>
                                            <h6 className="">Your profile has been crated!</h6>
                                            <p className="">You're almost there! Add the remaining details to enhance your profile and connect with your perfect match sooner</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default registrationform