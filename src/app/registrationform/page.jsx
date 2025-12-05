"use client";

import React, { useEffect, useState } from "react";
import Header from '../components/Header/Page';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const RegistrationForm = () => {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [user, setUser] = useState(null);

    // Load storage only in browser
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedToken = sessionStorage.getItem("token");
            const savedUser = sessionStorage.getItem("user");

            if (savedToken) setToken(savedToken);
            if (savedUser) setUser(JSON.parse(savedUser));
        }
    }, []);

    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [profileExists, setProfileExists] = useState(false);



    const requiredFields = [
        "name",
        "gender",
        "dob",
        "motherTongue",
        "location",
        "height",
        "physicalStatus",
        "maritalStatus",
        "religion",
        "cast",
        "subCast",
        "gotra",
        "education",
        "employmentType",
        "occupation",
        "annualIncome",
        "familyStatus",
        "diet",
        "aboutYourself",
    ];

    const [formData, setFormData] = useState({
        // Step 1
        name: user?.name,
        dob: "",
        motherTongue: "",
        email: user?.email,
        location: "",
        password: "",
        gender: "",
        // Step 2
        height: "",
        physicalStatus: "Normal",
        maritalStatus: "Never married",
        religion: "",
        cast: "",
        subCast: "",
        gotra: "",

        // Step 3
        education: "",
        employmentType: "",
        occupation: "",
        annualIncome: "",

        // Step 4
        familyStatus: "Middle class",
        diet: "Veg",
        aboutYourself: "",

        // Step 5 handled by photo/introVideo states
    });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || "",
                email: user.email || "",
            }));
        }
    }, [user]);


    // Only one photo allowed for now
    const [photo, setPhoto] = useState(null); // stores URL after upload
    const [introVideo, setIntroVideo] = useState(null); // file object
    const [uploading, setUploading] = useState(false);

    const [profileComplete, setProfileComplete] = useState(false);




    useEffect(() => {
        if (!token) return;

        const checkProfile = async () => {
            try {
                const res = await axios.get("http://206.189.130.102:5000/api/profile/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.data?.profile) {
                    setProfileExists(true);

                    // Map backend fields to frontend fields
                    const profile = res.data.profile;

                    setFormData(prev => ({
                        ...prev,
                        name: profile.name || "",
                        dob: profile.dob || "",
                        motherTongue: profile.motherTongue || "",
                        location: profile.location || "",
                        gender: profile.gender || "",
                        height: profile.height || "",
                        physicalStatus: profile.physicalStatus || "Normal",
                        maritalStatus: profile.maritalStatus || "Never married",
                        religion: profile.religion || "",
                        cast: profile.caste || "",
                        subCast: profile.subCaste || "",
                        gotra: profile.gotra || "",
                        education: profile.educationDetails || "",
                        employmentType: profile.employmentType || "",
                        occupation: profile.occupation || "",
                        annualIncome: profile.annualIncome || "",
                        familyStatus: profile.familyStatus || "Middle class",
                        diet: profile.diet || "Veg",
                        aboutYourself: profile.aboutYourself || "",
                        photos: profile.photos || [],
                        introVideo: profile.introVideo || ""
                    }));

                    const missing = requiredFields.filter(field => {
                        const value = formData[field];
                        return value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0);
                    });


                    setProfileComplete(missing.length === 0);

                }
            } catch (err) {
                console.log("No profile found:", err?.response?.data);
            }
        };

        checkProfile();
    }, [token]);


    const nextStep = () => setStep((s) => Math.min(4, s + 1));
    const prevStep = () => setStep((s) => Math.max(1, s - 1));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
    };

    // single image upload (returns url)
    const handlePhotoUpload = async (file) => {
        if (!file) return;
        try {
            setUploading(true);
            const fd = new FormData();
            fd.append("image", file);

            const upload = await axios.post(
                "http://206.189.130.102:5000/api/upload-image",
                fd,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setPhoto(upload.data.url);
            toast.success("Photo uploaded");
        } catch (err) {
            console.log("Upload error:", err?.response?.data || err.message);
            toast.error("Photo upload failed");
        } finally {
            setUploading(false);
        }
    };

    // upload intro video (optional) — returns url or empty string
    const uploadVideo = async () => {
        if (!introVideo) return "";
        try {
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

            return upload.data.url || "";
        } catch (err) {
            console.log("Video upload error:", err?.response?.data || err.message);
            return "";
        }
    };

    const handleSubmit = async () => {
        try {
            // upload video first (if provided)
            const finalVideoLink = await uploadVideo();

            const payload = {
                ...formData,
                caste: formData.cast,
                subCaste: formData.subCast,
                educationDetails: formData.education,
                photos: photo ? [photo] : [],
                introVideo: finalVideoLink || "",
            };


            const res = await axios.post(
                "http://206.189.130.102:5000/api/profile/create",
                payload,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            toast.success("Profile updated successfully");
            setSubmitted(true);
            // optional redirect after slight delay
            setTimeout(() => router.push("/"), 1200);
        } catch (err) {
            console.log("Create profile error:", err?.response?.data || err.message);
            toast.error(err?.response?.data?.message || "Profile creation failed");
        }
    };

    const removePhoto = () => {
        setPhoto(null);
    };


    useEffect(() => {
        if (token === "") return;
        if (!token) router.replace("/login");
    }, [token]);

    const goToIncompleteStep = () => {
        if (!formData) return;

        // Show the form
        setProfileExists(false);

        if (!formData.name || !formData.gender || !formData.location || !formData.dob) {
            return setStep(1);
        }

        if (!formData.height || !formData.religion || !formData.cast || !formData.gotra) {
            return setStep(2);
        }

        if (!formData.education || !formData.occupation || !formData.annualIncome) {
            return setStep(3);
        }

        if (!formData.familyStatus || !formData.diet || !formData.aboutYourself) {
            return setStep(4);
        }

        // Default to step 1
        setStep(1);
    };





    // UI: render step forms — using your original fields exactly
    return (
        <div className="otp-page bg-FDFBF7" style={{ minHeight: "100vh" }}>
            <ToastContainer position="top-right" autoClose={4000} />
            <Header />

            <div className="otp-content py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-8 col-xl-7 col-xxl-6 mx-auto mb-4">
                            <div className="d-flex justify-content-between mb-2">
                                <h6>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="17"
                                        height="15"
                                        viewBox="0 0 17 15"
                                        fill="none"
                                        onClick={step > 1 ? prevStep : null}
                                        style={{ cursor: step > 1 ? "pointer" : "default" }}
                                    >
                                        <path d="M0.292893 6.65691C-0.0976311 7.04743 -0.0976311 7.6806 0.292893 8.07112L6.65685 14.4351C7.04738 14.8256 7.68054 14.8256 8.07107 14.4351C8.46159 14.0446 8.46159 13.4114 8.07107 13.0209L2.41421 7.36401L8.07107 1.70716C8.46159 1.31664 8.46159 0.68347 8.07107 0.292946C7.68054 -0.0975785 7.04738 -0.0975785 6.65685 0.292946L0.292893 6.65691ZM1 7.36401V8.36401H17V7.36401V6.36401H1V7.36401Z" fill="black" />
                                    </svg>
                                    <span className="ms-2">
                                        {step === 1 && "Basic Details"}
                                        {step === 2 && "Personal and Religious Details"}
                                        {step === 3 && "Professional Details"}
                                        {step === 4 && "Additional Details"}
                                    </span>
                                </h6>
                                <p>Step {step}/4</p>
                            </div>

                            <div className="card shadow border-0 rounded-4">
                                <div className="card-body p-4">

                                    {/* Skip notice when profile exists */}
                                    {profileExists && (
                                        <div className={`alert ${profileComplete ? "alert-success" : "alert-warning"} text-center`}>
                                            {profileComplete ? (
                                                <>
                                                    🎉 Your profile is complete!
                                                    <button className="btn btn-success ms-3" onClick={() => router.push("/")}>
                                                        Go to Dashboard
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    ⚠️ Your profile is incomplete. Please complete remaining fields.
                                                    <button className="btn btn-secondary ms-3" onClick={goToIncompleteStep}>
                                                        Continue Editing
                                                    </button>

                                                    <button className="btn btn-outline-primary ms-2" onClick={() => router.push("/")}>
                                                        Skip for Now
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    )}



                                    {/* SHOW FORM only when profile does NOT exist */}
                                    {!profileExists && (
                                        <>
                                            {/* STEP 1 */}
                                            {step === 1 && (
                                                <form>
                                                    <div className="mb-3">
                                                        <label className="form-label">Name</label>
                                                        <input
                                                            name="name"
                                                            type="text"
                                                            className="form-control"
                                                            value={formData.name}
                                                            readOnly
                                                        />

                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label">Gender</label>
                                                        <select
                                                            name="gender"
                                                            className="form-select"
                                                            value={formData.gender}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Select</option>
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>

                                                        </select>
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label">Location/City</label>
                                                        <input
                                                            name="location"
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter city or village name"
                                                            value={formData.location}
                                                            onChange={handleChange}
                                                        />
                                                    </div>


                                                    <div className="mb-3">
                                                        <label className="form-label">Email</label>
                                                        <input
                                                            name="email"
                                                            type="email"
                                                            className="form-control"
                                                            value={formData.email}
                                                            readOnly
                                                        />

                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label">Date of birth</label>
                                                        <input
                                                            type="date"
                                                            name="dob"
                                                            value={formData.dob}
                                                            onChange={handleChange}
                                                            className="form-control"
                                                        />
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label">Mother tongue</label>
                                                        <select
                                                            name="motherTongue"
                                                            className="form-select"
                                                            value={formData.motherTongue}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Select</option>
                                                            <option value="Hindi">Hindi</option>
                                                            <option value="English">English</option>
                                                            <option value="Gujarati">Gujarati</option>
                                                        </select>
                                                    </div>

                                                    <div className="d-grid gap-2">
                                                        <button type="button" onClick={nextStep} className="btn bg-D4AF37 w-100 text-white mb-2">
                                                            Next
                                                        </button>
                                                    </div>
                                                </form>
                                            )}

                                            {/* STEP 2 */}
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
                                                        <select
                                                            name="physicalStatus"
                                                            className="form-select mb-3"
                                                            value={formData.physicalStatus}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Select</option>
                                                            <option value="Normal">Normal</option>
                                                            <option value="Physically Challenged">Physically Challenged</option>
                                                        </select>
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label">Your marital status</label>
                                                        <select
                                                            name="maritalStatus"
                                                            className="form-select mb-3"
                                                            value={formData.maritalStatus}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Select</option>
                                                            <option value="Never married">Never Married</option>
                                                            <option value="Widower">Widower</option>
                                                            <option value="Divorced">Divorced</option>
                                                        </select>
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
                                                            value={formData.subCast}
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

                                                    <div className="d-grid gap-2">
                                                        <button onClick={nextStep} className="btn bg-D4AF37 text-white w-100">Next</button>
                                                    </div>
                                                </>
                                            )}

                                            {/* STEP 3 */}
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

                                                    <div className="d-grid gap-2">
                                                        <button onClick={nextStep} className="btn bg-D4AF37 text-white w-100">Next</button>
                                                    </div>
                                                </>
                                            )}

                                            {/* STEP 4 */}
                                            {step === 4 && (
                                                <>
                                                    <div className="mb-3">
                                                        <label className="form-label">Family Status</label>
                                                        <select
                                                            name="familyStatus"
                                                            className="form-select mb-3"
                                                            value={formData.familyStatus}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Select</option>
                                                            <option value="Middle class">Middle class</option>
                                                            <option value="Upper middle class">Upper middle class</option>
                                                            <option value="Rich / Affluent (Elite)">Rich / Affluent (Elite)</option>
                                                        </select>
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label">Diet</label>
                                                        <select
                                                            name="diet"
                                                            className="form-select mb-3"
                                                            value={formData.diet}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Select</option>
                                                            <option value="Veg">Veg</option>
                                                            <option value="Nonveg">Non Veg</option>
                                                            <option value="Vegan">Vegan</option>
                                                            <option value="Occasionally Non-Veg">Occasionally Non-Veg</option>
                                                        </select>
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label">A few words about myself</label>
                                                        <textarea
                                                            name="aboutYourself"
                                                            className="form-control mb-3"
                                                            rows="3"
                                                            value={formData.aboutYourself}
                                                            onChange={handleChange}
                                                            placeholder="Write a short intro..."
                                                        />
                                                    </div>

                                                    {/* Image upload (single) */}
                                                    <div className="mb-3">
                                                        <label className="form-label">Upload Profile Picture</label>
                                                        {!photo ? (
                                                            <input
                                                                className="form-control"
                                                                type="file"
                                                                accept="image/jpeg,image/png"
                                                                onChange={(e) => handlePhotoUpload(e.target.files[0])}
                                                            />
                                                        ) : (
                                                            <div className="text-center">
                                                                <img
                                                                    src={photo}
                                                                    alt="uploaded"
                                                                    className="img-thumbnail mb-2"
                                                                    style={{ width: 150, height: 150, objectFit: "cover" }}
                                                                />
                                                                <div>
                                                                    <button className="btn btn-danger btn-sm me-2" onClick={removePhoto}>Cancel</button>
                                                                    {/* keep for later: replace or re-upload */}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Video upload (optional) */}
                                                    <div className="mb-3">
                                                        <label className="form-label">Upload Intro Video (optional)</label>
                                                        <input
                                                            className="form-control"
                                                            type="file"
                                                            accept="video/*"
                                                            onChange={(e) => setIntroVideo(e.target.files[0])}
                                                        />
                                                    </div>

                                                    <div className="d-grid gap-2">
                                                        <button className="btn bg-D4AF37 text-white w-100" onClick={handleSubmit} disabled={uploading}>
                                                            {uploading ? "Uploading..." : "Submit"}
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    )}

                                    {/* After submit message */}
                                    {submitted && (
                                        <div className="text-center mt-3">
                                            <img src="/dhakadweb/assets/images/checkmark.png" alt="ok" width={100} />
                                            <h5 className="text-success">Congratulations</h5>
                                            <p>Your profile has been created!</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
