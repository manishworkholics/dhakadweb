"use client";

import React, { useState } from "react";
import Header from '../components/Header/Page'
import Image from "next/image";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

const registrationform = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        // name: "",
        // number: "",
        dob: "",
        motherTongue: "",
        email: "",
        password: "",
        height: "",
        physicalStatus: "",
        maritalStatus: "",
        religion: "",
        cast: "",
        gotra: "",
        education: "",
        employmentType: "",
        occupation: "",
        annualIncome: "",
        familyStatus: "",
        dietType: "",
        about: "",
        annualIncome: "",
        familyStatus: "",
        // photos: [],
        // introVideo: ""
    });
    const [photos, setPhotos] = useState([]);
    const [introVideo, setIntroVideo] = useState(null);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handlePhotoUpload = async (file) => {
        try {
            const fd = new FormData();
            fd.append("photo", file);

            const upload = await axios.post(
                "http://206.189.130.102:5000/api/upload/photo",
                fd,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setPhotos((prev) => [...prev, upload.data.url]);
            toast.success("Photo Uploaded Successfully");
        } catch (err) {
            toast.error("Photo Upload Failed");
            console.log(err);
        }
    };

    // =============================
    // 🎥 Upload Video (If given)
    // =============================
    const handleVideoUpload = async () => {
        try {
            // user did not upload a video → send dummy
            if (!introVideo) {
                return "https://res.cloudinary.com/sample/video.mp4";
            }

            const fd = new FormData();
            fd.append("video", introVideo);

            const upload = await axios.post(
                "http://206.189.130.102:5000/api/upload/video",
                fd,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return upload.data.url;
        } catch (err) {
            console.log(err);
            return "https://res.cloudinary.com/sample/video.mp4"; // fallback
        }
    };


    const handleSubmit = async () => {
        try {
            // Build DOB from separate fields
            // const dob = `${formData.year}-${formData.month}-${formData.day}`;

            // const payload = {
            //     dob: formData.dob,
            //     motherTongue: formData.motherTongue,
            //     email: formData.email,
            //     height: formData.height,
            //     physicalStatus: formData.physicalStatus,
            //     maritalStatus: formData.maritalStatus,
            //     education: formData.educationDetails,
            //     employmentType: formData.employmentType,
            //     occupation: formData.occupation,
            //     diet: formData.diet,
            //     password: formData.password,
            //     name: formData.name,
            //     about: formData.aboutYourself,
            //     religion: formData.religion,
            //     cast: formData.cast,
            //     subCaste: formData.subCaste,
            //     gotra: formData.gotra,
            //     annualIncome: formData.annualIncome,
            //     familyStatus: formData.familyStatus,
            //     photos: formData.photos,
            //     introVideo: formData.introVideo || "https://res.cloudinary.com/sample/video.mp4"
            // };

            const response = await axios.post(
                "http://206.189.130.102:5000/api/profile/create",
                {
                    ...formData,
                    photos,
                    introVideo: finalVideoLink,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success("Profile Created Successfully");
            console.log("Success:", response.data);
            router.push("/profile");
            setSubmitted(true);

        } catch (error) {
            toast.error("API Error:", error?.response?.data || error.message);
            console.log(error?.response?.data?.message || "Something went wrong");
        }
    };


    return (
        <div className='otp-page bg-FDFBF7' style={{ minHeight: '100vh' }}>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
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
                                            {/* <label className="form-label">Full Name</label>
                                            <div className="mb-3">
                                                <input
                                                    name="name"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Full Name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                />
                                            </div> */}
                                            {/* <label className="form-label">Contact No.</label>
                                            <div className="mb-3">
                                                <input
                                                    name="contact"
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Contact No."
                                                    value={formData.number}
                                                    onChange={handleChange}
                                                />
                                            </div> */}
                                            <div className="mb-3">
                                                <label className="form-label">Email</label>
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
                                                <label className="form-label">Date of birth</label>
                                                <div className="d-flex gap-3">
                                                    <input
                                                        type="date"
                                                        name="dob"
                                                        value={formData.dob}
                                                        onChange={handleChange}
                                                        className="form-control"
                                                        placeholder="yyyy-mm-day"
                                                    />

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
                                                <input
                                                    name="height"
                                                    type="text"
                                                    placeholder="5ft 6in"
                                                    className="form-control mb-3"
                                                    value={formData.height}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Your physical status</label>
                                                <div className="d-flex gap-3">
                                                    <select
                                                        name="physicalStatus"
                                                        className="form-select mb-3"
                                                        value={formData.physicalStatus}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="Normal">Normal</option>
                                                        <option value="Physically Challenged">
                                                            Physically Challenged
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Your marital status</label>
                                                <div className="d-flex gap-3">
                                                    <select
                                                        name="maritalStatus"
                                                        className="form-select mb-3"
                                                        value={formData.maritalStatus}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="Never Married">Never Married</option>
                                                        <option value="Widower">Widower</option>
                                                        <option value="Divorced">Divorced</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Religion</label>
                                                <select
                                                    name="religion"
                                                    className="form-select"
                                                    value={formData.religion}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select religion</option>
                                                    <option value="Hindu">Hindu</option>
                                                    <option value="Muslim">Muslim</option>
                                                    <option value="Sikh">Sikh</option>
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Cast</label>
                                                <input
                                                    name="cast"
                                                    type="text"
                                                    className="form-control mb-3"
                                                    value={formData.cast}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Sub Cast</label>
                                                <input
                                                    name="subCast"
                                                    type="text"
                                                    className="form-control mb-3"
                                                    value={formData.subCaste}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Gotra</label>
                                                <input
                                                    name="gotra"
                                                    type="text"
                                                    className="form-control mb-3"
                                                    value={formData.gotra}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <button onClick={nextStep} className="btn bg-D4AF37 text-white w-100">Next</button>
                                        </>
                                    )}

                                    {/* ---------------- STEP 3 ---------------- */}
                                    {step === 3 && (
                                        <>
                                            <div className="mb-3">
                                                <label className="form-label">Professional Details (Education)</label>
                                                <input
                                                    name="education"
                                                    type="text"
                                                    className="form-control mb-3"
                                                    value={formData.education}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Employment Type</label>
                                                <input
                                                    name="employmentType"
                                                    type="text"
                                                    className="form-control mb-3"
                                                    value={formData.employmentType}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Occupation</label>
                                                <input
                                                    name="occupation"
                                                    type="text"
                                                    className="form-control mb-3"
                                                    value={formData.occupation}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Annual Income</label>
                                                <input
                                                    name="annualIncome"
                                                    type="text"
                                                    className="form-control mb-3"
                                                    value={formData.annualIncome}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Family Status</label>
                                                <input
                                                    name="familyStatus"
                                                    type="text"
                                                    className="form-control mb-3"
                                                    value={formData.familyStatus}
                                                    onChange={handleChange}
                                                    placeholder="ex: Middle class"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Diet</label>
                                                <div className="d-flex gap-3">
                                                    <select
                                                        name="dietType"
                                                        className="form-select mb-3"
                                                        value={formData.diet}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="Veg">Veg</option>
                                                        <option value="Nonveg">Non Veg</option>
                                                        <option value="Vegan">Vegan</option>
                                                    </select>

                                                </div>
                                            </div>

                                            <button onClick={nextStep} className="btn bg-D4AF37 text-white w-100">Next</button>
                                        </>
                                    )}

                                    {/* ---------------- STEP 4 ---------------- */}
                                    {step === 4 && (
                                        <>

                                            <div className="mb-3">
                                                <label htmlFor="exampleFormControlTextarea1" className="form-label">A few words about myself</label>
                                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="I have a Bachelor's degree and I am employed in private Sector as a teaching / academician currently based in Amadalavalasa." name="about" value={formData.about} onChange={handleChange}></textarea>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="imageFile" className="form-label">
                                                    Image File:
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="file"
                                                    id="imageFile"
                                                    accept="image/jpeg,image/png" // Restrict file types
                                                    onChange={(e) => handlePhotoUpload(e.target.files[0])}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="videoFile" className="form-label">
                                                    Video File:
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="file"
                                                    id="imageFile"
                                                    accept="video/*" // Restrict file types
                                                    onChange={(e) => setIntroVideo(e.target.files[0])}
                                                />
                                            </div>

                                            <button
                                                className="btn bg-D4AF37 text-white w-100"
                                                onClick={handleSubmit}
                                            >
                                                Submit
                                            </button>
                                        </>
                                    )}

                                    {submitted && (
                                        <div className="text-center">
                                            <img src="/dhakadweb/assets/images/checkmark.png" alt="success" width={100} height={100} className="mb-4" />
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

// "use client";

// import React, { useState } from "react";
// import Header from '../components/Header/Page'
// import Image from "next/image";

// const registrationform = () => {

//     const [step, setStep] = useState(1);
//     const [submitted, setSubmitted] = useState(false);

//     const [formData, setFormData] = useState({
//         name: "",
//         number: "",
//         day: "",
//         month: "",
//         year: "",
//         motherTongue: "",
//         email: "",
//         password: "",
//         height: "",
//         physicalStatus: "",
//         maritalStatus: "",
//         education: "",
//         employmentType: "",
//         occupation: "",
//         dietType: "",
//     });

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const nextStep = () => setStep(step + 1);
//     const prevStep = () => setStep(step - 1);

//     return (
//         <div className='otp-page bg-FDFBF7' style={{ minHeight: '100vh' }}>
//             <div className="">
//                 <Header />
//             </div>
//             <div className="otp-content py-5">

//                 <div className="container">
//                     <div className="row">

//                         <div className="col-12 col-lg-8 col-xl-7 col-xxl-6 mx-auto mb-4">

//                             {/* ---------------- HEADER ---------------- */}
//                             <div className="d-flex justify-content-between">
//                                 <h6 className="mb-2">
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" fill="none" onClick={step > 1 ? prevStep : null} style={{ cursor: "pointer" }}>
//                                         <path d="M0.292893 6.65691C-0.0976311 7.04743 -0.0976311 7.6806 0.292893 8.07112L6.65685 14.4351C7.04738 14.8256 7.68054 14.8256 8.07107 14.4351C8.46159 14.0446 8.46159 13.4114 8.07107 13.0209L2.41421 7.36401L8.07107 1.70716C8.46159 1.31664 8.46159 0.68347 8.07107 0.292946C7.68054 -0.0975785 7.04738 -0.0975785 6.65685 0.292946L0.292893 6.65691ZM1 7.36401V8.36401H17V7.36401V6.36401H1V7.36401Z" fill="black" />
//                                     </svg>
//                                     <span className="ms-2">
//                                         {step === 1 && "Basic Details"}
//                                         {step === 2 && "Personal and Religious Details"}
//                                         {step === 3 && "Professional Details"}
//                                         {step === 4 && "Additional Details"}
//                                     </span>
//                                 </h6>

//                                 <p className="mb-2"> Step {step}/4 </p>
//                             </div>

//                             {/* ---------------- CARD ---------------- */}
//                             <div className="card shadow border-0 rounded-4">
//                                 <div className="card-body p-4">

//                                     {/* ---------------- STEP 1 ---------------- */}
//                                     {step === 1 && (
//                                         <form>
//                                             <label className="form-label">Full Name</label>
//                                             <div className="mb-3">
//                                                 <input
//                                                     name="name"
//                                                     type="text"
//                                                     className="form-control"
//                                                     placeholder="Full Name"
//                                                     value={formData.name}
//                                                     onChange={handleChange}
//                                                 />
//                                             </div>
//                                             <label className="form-label">Contact No.</label>
//                                             <div className="mb-3">
//                                                 <input
//                                                     name="contact"
//                                                     type="number"
//                                                     className="form-control"
//                                                     placeholder="Contact No."
//                                                     value={formData.number}
//                                                     onChange={handleChange}
//                                                 />
//                                             </div>
//                                             <div className="mb-3">
//                                                 <label className="form-label">Email</label>
//                                                 <input
//                                                     name="email"
//                                                     type="email"
//                                                     className="form-control"
//                                                     placeholder="Email"
//                                                     value={formData.email}
//                                                     onChange={handleChange}
//                                                 />
//                                             </div>
//                                             <div className="mb-3">
//                                                 <label className="form-label">Date of birth</label>
//                                                 <div className="d-flex gap-3">
//                                                     <select name="day" className="form-select" value={formData.day} onChange={handleChange}>
//                                                         <option value="">Day</option>
//                                                         {[...Array(31)].map((_, i) => (
//                                                             <option key={i} value={i + 1}>{i + 1}</option>
//                                                         ))}
//                                                     </select>

//                                                     <select name="month" className="form-select" value={formData.month} onChange={handleChange}>
//                                                         <option value="">Month</option>
//                                                         {[...Array(12)].map((_, i) => (
//                                                             <option key={i} value={i + 1}>{i + 1}</option>
//                                                         ))}
//                                                     </select>

//                                                     <select name="year" className="form-select" value={formData.year} onChange={handleChange}>
//                                                         <option value="">Year</option>
//                                                         {[...Array(60)].map((_, i) => (
//                                                             <option key={i} value={2024 - i}>{2024 - i}</option>
//                                                         ))}
//                                                     </select>
//                                                 </div>
//                                             </div>

//                                             <div className="mb-3">
//                                                 <label className="form-label">Mother tongue</label>
//                                                 <select
//                                                     name="motherTongue"
//                                                     className="form-select"
//                                                     value={formData.motherTongue}
//                                                     onChange={handleChange}
//                                                 >
//                                                     <option value="Hindi">Hindi</option>
//                                                     <option value="English">English</option>
//                                                     <option value="Gujarati">Gujarati</option>
//                                                 </select>
//                                             </div>

//                                             <button type="button" onClick={nextStep} className="btn bg-D4AF37 w-100 text-white mb-2">
//                                                 Next
//                                             </button>
//                                         </form>
//                                     )}

//                                     {/* ---------------- STEP 2 ---------------- */}
//                                     {step === 2 && (
//                                         <>
//                                             <div className="mb-3">
//                                                 <label className="form-label">Height</label>
//                                                 <select
//                                                     name="gender"
//                                                     className="form-select"
//                                                     value={formData.gender}
//                                                     onChange={handleChange}
//                                                 >
//                                                     <option value="">Select your hight</option>
//                                                     <option value="5">5</option>
//                                                     <option value="6">6</option>
//                                                 </select>
//                                             </div>
//                                             <div className="mb-3">
//                                                 <label className="form-label">Your physical status</label>

//                                                 <div className="d-flex gap-3">
//                                                     <input
//                                                         type="radio"
//                                                         className="btn-check"
//                                                         name="physicalStatus"
//                                                         id="physically-normal"
//                                                         autoComplete="off"
//                                                         defaultChecked
//                                                     />
//                                                     <label className="btn btn-outline-danger rounded-pill" htmlFor="physically-normal">
//                                                         Normal
//                                                     </label>

//                                                     <input
//                                                         type="radio"
//                                                         className="btn-check"
//                                                         name="physicalStatus"
//                                                         id="physically-challenged"
//                                                         autoComplete="off"
//                                                     />
//                                                     <label className="btn btn-outline-danger rounded-pill" htmlFor="physically-challenged">
//                                                         Physically Challenged
//                                                     </label>
//                                                 </div>
//                                             </div>

//                                             <div className="mb-3">
//                                                 <label className="form-label">Your marital status</label>

//                                                 <div className="d-flex gap-3">

//                                                     <input
//                                                         type="radio"
//                                                         className="btn-check"
//                                                         name="maritalStatus"
//                                                         id="never-married"
//                                                         autoComplete="off"
//                                                         defaultChecked
//                                                     />
//                                                     <label className="btn btn-outline-danger rounded-pill" htmlFor="never-married">
//                                                         Never married
//                                                     </label>

//                                                     <input
//                                                         type="radio"
//                                                         className="btn-check"
//                                                         name="maritalStatus"
//                                                         id="widower"
//                                                         autoComplete="off"
//                                                     />
//                                                     <label className="btn btn-outline-danger rounded-pill" htmlFor="widower">
//                                                         Widower
//                                                     </label>

//                                                     <input
//                                                         type="radio"
//                                                         className="btn-check"
//                                                         name="maritalStatus"
//                                                         id="awaiting-divorce"
//                                                         autoComplete="off"
//                                                     />
//                                                     <label className="btn btn-outline-danger rounded-pill" htmlFor="awaiting-divorce">
//                                                         Awaiting divorce
//                                                     </label>

//                                                     <input
//                                                         type="radio"
//                                                         className="btn-check"
//                                                         name="maritalStatus"
//                                                         id="divorced"
//                                                         autoComplete="off"
//                                                     />
//                                                     <label className="btn btn-outline-danger rounded-pill" htmlFor="divorced">
//                                                         Divorced
//                                                     </label>

//                                                 </div>
//                                             </div>

//                                             <div className="mb-3">
//                                                 <label className="form-label">Religion</label>
//                                                 <select
//                                                     name="gender"
//                                                     className="form-select"
//                                                     value={formData.gender}
//                                                     onChange={handleChange}
//                                                 >
//                                                     <option value="">Select religion</option>
//                                                     <option value="5">5</option>
//                                                     <option value="6">6</option>
//                                                 </select>
//                                             </div>

//                                             <div className="mb-3">
//                                                 <label className="form-label">Cast</label>
//                                                 <select
//                                                     name="gender"
//                                                     className="form-select"
//                                                     value={formData.gender}
//                                                     onChange={handleChange}
//                                                 >
//                                                     <option value="">Select cast</option>
//                                                     <option value="5">5</option>
//                                                     <option value="6">6</option>
//                                                 </select>
//                                             </div>

//                                             <button onClick={nextStep} className="btn bg-D4AF37 text-white w-100">Next</button>
//                                         </>
//                                     )}

//                                     {/* ---------------- STEP 3 ---------------- */}
//                                     {step === 3 && (
//                                         <>
//                                             <div className="mb-3">
//                                                 <label className="form-label">Professional Details</label>
//                                                 <select
//                                                     name="gender"
//                                                     className="form-select mb-3"
//                                                     value={formData.gender}
//                                                     onChange={handleChange}
//                                                 >
//                                                     <option value="">Select your education details</option>
//                                                     <option value="5">5</option>
//                                                     <option value="6">6</option>
//                                                 </select>
//                                                 <select
//                                                     name="gender"
//                                                     className="form-select mb-3"
//                                                     value={formData.gender}
//                                                     onChange={handleChange}
//                                                 >
//                                                     <option value="">Select your employment type</option>
//                                                     <option value="5">5</option>
//                                                     <option value="6">6</option>
//                                                 </select>
//                                                 <select
//                                                     name="gender"
//                                                     className="form-select"
//                                                     value={formData.gender}
//                                                     onChange={handleChange}
//                                                 >
//                                                     <option value="">Select your occupation</option>
//                                                     <option value="5">5</option>
//                                                     <option value="6">6</option>
//                                                 </select>
//                                             </div>

//                                             <div className="mb-3">
//                                                 <label className="form-label">Annual Income</label>
//                                                 <select
//                                                     name="gender"
//                                                     className="form-select mb-3"
//                                                     value={formData.gender}
//                                                     onChange={handleChange}
//                                                 >
//                                                     <option value="">Select your annual income</option>
//                                                     <option value="5">5</option>
//                                                     <option value="6">6</option>
//                                                 </select>
//                                             </div>
//                                             <div className="mb-3">
//                                                 <label className="form-label">Select family status</label>

//                                                 <div className="d-flex gap-3">

//                                                     <input
//                                                         type="radio"
//                                                         className="btn-check"
//                                                         name="maritalStatus"
//                                                         id="never-married"
//                                                         autoComplete="off"
//                                                         defaultChecked
//                                                     />
//                                                     <label className="btn btn-outline-danger rounded-pill" htmlFor="never-married">
//                                                         Middle class
//                                                     </label>

//                                                     <input
//                                                         type="radio"
//                                                         className="btn-check"
//                                                         name="maritalStatus"
//                                                         id="widower"
//                                                         autoComplete="off"
//                                                     />
//                                                     <label className="btn btn-outline-danger rounded-pill" htmlFor="widower">
//                                                         Upper middle class
//                                                     </label>

//                                                     <input
//                                                         type="radio"
//                                                         className="btn-check"
//                                                         name="maritalStatus"
//                                                         id="awaiting-divorce"
//                                                         autoComplete="off"
//                                                     />
//                                                     <label className="btn btn-outline-danger rounded-pill" htmlFor="awaiting-divorce">
//                                                         Rich / Affluent (Elite)
//                                                     </label>

//                                                 </div>
//                                             </div>
//                                             <div className="mb-3">
//                                                 <label className="form-label">Diet</label>

//                                                 <div className="d-flex gap-3">

//                                                     <div
//                                                         className="form-check btn btn-outline-secondary rounded-pill"
//                                                         style={{ paddingLeft: "35px" }}
//                                                     >
//                                                         <input
//                                                             className="form-check-input"
//                                                             type="radio"
//                                                             name="dietType"
//                                                             id="diet-veg"
//                                                         />
//                                                         <label className="form-check-label" htmlFor="diet-veg">
//                                                             Veg
//                                                         </label>
//                                                     </div>

//                                                     <div
//                                                         className="form-check btn btn-outline-secondary rounded-pill"
//                                                         style={{ paddingLeft: "35px" }}
//                                                     >
//                                                         <input
//                                                             className="form-check-input"
//                                                             type="radio"
//                                                             name="dietType"
//                                                             id="diet-nonveg"
//                                                             defaultChecked
//                                                         />
//                                                         <label className="form-check-label" htmlFor="diet-nonveg">
//                                                             Nonveg
//                                                         </label>
//                                                     </div>

//                                                     <div
//                                                         className="form-check btn btn-outline-secondary rounded-pill"
//                                                         style={{ paddingLeft: "35px" }}
//                                                     >
//                                                         <input
//                                                             className="form-check-input"
//                                                             type="radio"
//                                                             name="dietType"
//                                                             id="diet-occasionally"
//                                                         />
//                                                         <label className="form-check-label" htmlFor="diet-occasionally">
//                                                             Occasionally Non - Veg
//                                                         </label>
//                                                     </div>

//                                                     <div
//                                                         className="form-check btn btn-outline-secondary rounded-pill"
//                                                         style={{ paddingLeft: "35px" }}
//                                                     >
//                                                         <input
//                                                             className="form-check-input"
//                                                             type="radio"
//                                                             name="dietType"
//                                                             id="diet-vegan"
//                                                         />
//                                                         <label className="form-check-label" htmlFor="diet-vegan">
//                                                             Vegan
//                                                         </label>
//                                                     </div>

//                                                 </div>
//                                             </div>

//                                             <button onClick={nextStep} className="btn bg-D4AF37 text-white w-100">Next</button>
//                                         </>
//                                     )}

//                                     {/* ---------------- STEP 4 ---------------- */}
//                                     {step === 4 && (
//                                         <>

//                                             <div className="mb-3">
//                                                 <label htmlFor="exampleFormControlTextarea1" className="form-label">A few words about myself</label>
//                                                 <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="I have a Bachelor's degree and I am employed in private Sector as a teaching / academician currently based in Amadalavalasa."></textarea>
//                                             </div>
//                                             <div className="mb-3">
//                                                 <label htmlFor="imageFile" className="form-label">
//                                                     Image File:
//                                                 </label>
//                                                 <input
//                                                     className="form-control"
//                                                     type="file"
//                                                     id="imageFile"
//                                                     accept="image/jpeg,image/png" // Restrict file types
//                                                 />
//                                             </div>
//                                             <div className="mb-3">
//                                                 <label className="form-label">Create Password</label>
//                                                 <input
//                                                     name="password"
//                                                     type="password"
//                                                     className="form-control"
//                                                     placeholder="Create password"
//                                                     value={formData.password}
//                                                     onChange={handleChange}
//                                                 />
//                                                 <div className="form-text">Your password must be within 8-10 characters</div>
//                                             </div>
//                                             <div className="mb-3">
//                                                 <label className="form-label">Confirm Password</label>
//                                                 <input
//                                                     name="password"
//                                                     type="password"
//                                                     className="form-control"
//                                                     placeholder="Confirm password"
//                                                     value={formData.password}
//                                                     onChange={handleChange}
//                                                 />
//                                             </div>
//                                             <button
//                                                 className="btn bg-D4AF37 text-white w-100"
//                                                 onClick={() => setSubmitted(true)}
//                                             >
//                                                 Submit
//                                             </button>
//                                         </>
//                                     )}

//                                     {submitted && (
//                                         <div className="text-center">
//                                             <img src="/dhakadweb/assets/images/checkmark.png" alt="success" width={100} height={100} className="mb-4" />
//                                             <h5 className="text-success">Congratulation</h5>
//                                             <h6 className="">Your profile has been crated!</h6>
//                                             <p className="">You're almost there! Add the remaining details to enhance your profile and connect with your perfect match sooner</p>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default registrationform