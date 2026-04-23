"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/Header/Page";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { buildApiUrl } from "@/lib/api";

const educationOptionValues = [
    "10th",
    "12th",
    "diploma",
    "bachelors",
    "masters",
    "phd",
    "ca",
    "cs",
    "icwa",
    "mbbs",
    "md",
    "law",
    "Other",
];

const employmentOptionValues = [
    "government",
    "private",
    "business",
    "self_employed",
    "freelancer",
    "defense",
    "psu",
    "startup",
    "ngo",
    "student",
    "not_working",
    "homemaker",
    "retired",
    "Other",
];

const occupationOptionValues = [
    "software_engineer",
    "web_developer",
    "mobile_developer",
    "data_analyst",
    "it_support",
    "manager",
    "hr",
    "accountant",
    "marketing",
    "sales",
    "doctor",
    "nurse",
    "pharmacist",
    "teacher",
    "professor",
    "govt_officer",
    "defence",
    "police",
    "business_owner",
    "shop_owner",
    "entrepreneur",
    "mechanic",
    "electrician",
    "plumber",
    "technician",
    "farmer",
    "driver",
    "clerk",
    "security_guard",
    "homemaker",
    "student",
    "not_working",
    "Other",
];

const normalizeSelectValue = (value, options) => {
    if (!value) return "";
    if (options.includes(value)) return value;
    if (value === "others") return "Other";
    return "Other";
};

const RegistrationForm = () => {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [user, setUser] = useState(null);
    const [existingPhotos, setExistingPhotos] = useState([]);
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [profileExists, setProfileExists] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [profileComplete, setProfileComplete] = useState(false);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [customCity, setCustomCity] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.name || "",
        dob: "",
        motherTongue: "",
        email: user?.email || "",
        location: "",
        password: "",
        gender: "",
        state: "",
        city: "",
        height: "",
        physicalStatus: "Normal",
        maritalStatus: "Never married",
        religion: "Hinduism",
        cast: "Dhakad",
        subCast: "",
        gotra: "",
        skinTone: "",
        birthPlace: "",
        birthTime: "",
        bodyType: "",
        smoke: "",
        drink: "",
        physicalChallenge: "",
        physicalChallengeDescription: "",
        education: "",
        educationOther: "",
        employment: "",
        employmentOther: "",
        occupation: "",
        occupationOther: "",
        annualIncome: "",
        familyStatus: "Middle class",
        diet: "Veg",
        aboutYourself: "",
        hobbies: "",
        mamaGotra: "",
        fatherName: "",
        motherName: "",
        fatherContactNo: "",
        fatherStatus: "",
        fatherOccupation: "",
        motherStatus: "",
        motherOccupation: "",
        noOfBrothers: "",
        noOfSisters: "",
        rashiNakshatra: "",
        mangalik: "",
    });

    useEffect(() => {
        const localToken = localStorage.getItem("usertoken");
        if (!localToken) {
            router.replace("/login");
        }
    }, [router]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedToken = localStorage.getItem("usertoken");
            const savedUser = localStorage.getItem("user");

            if (savedToken) setToken(savedToken);
            if (savedUser) setUser(JSON.parse(savedUser));
        }
    }, []);

    useEffect(() => {
        if (user) {
            setFormData((prev) => ({
                ...prev,
                name: user.name || "",
                email: user.email || "",
            }));
        }
    }, [user]);

    useEffect(() => {
        if (!token) return;

        const checkProfile = async () => {
            try {
                const res = await axios.get(buildApiUrl("/api/profile/me"), {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.data?.profile) {
                    setProfileExists(true);
                    const profile = res.data.profile;
                    const profileCity = profile.city || profile.location || "";
                    const normalizedEducation = normalizeSelectValue(
                        profile.educationDetails || profile.education,
                        educationOptionValues
                    );
                    const normalizedEmployment = normalizeSelectValue(
                        profile.employmentType || profile.employment,
                        employmentOptionValues
                    );
                    const normalizedOccupation = normalizeSelectValue(
                        profile.occupation,
                        occupationOptionValues
                    );

                    setFormData((prev) => ({
                        ...prev,
                        name: profile.name || "",
                        dob: profile.dob ? profile.dob.split("T")[0] : "",
                        motherTongue: profile.motherTongue || "",
                        email: profile.email || prev.email,
                        gender: profile.gender || "",
                        state: profile.state || "",
                        city: profileCity,
                        location: profileCity,
                        height: profile.height || "",
                        physicalStatus: profile.physicalStatus || "Normal",
                        maritalStatus: profile.maritalStatus || "Never married",
                        religion: profile.religion || "Hinduism",
                        cast: profile.caste || prev.cast,
                        subCast: profile.subCaste || "",
                        gotra: profile.gotra || "",
                        skinTone: profile.skinTone || "",
                        birthPlace: profile.birthPlace || "",
                        birthTime: profile.birthTime || "",
                        bodyType: profile.bodyType || "",
                        smoke: profile.smoke || "",
                        drink: profile.drink || "",
                        physicalChallenge: profile.physicalChallenge || "",
                        physicalChallengeDescription: profile.physicalChallengeDescription || "",
                        education: normalizedEducation,
                        educationOther:
                            normalizedEducation === "Other"
                                ? profile.educationOther || profile.educationDetails || profile.education || ""
                                : "",
                        employment: normalizedEmployment,
                        employmentOther:
                            normalizedEmployment === "Other"
                                ? profile.employmentOther || profile.employmentType || profile.employment || ""
                                : "",
                        occupation: normalizedOccupation,
                        occupationOther:
                            normalizedOccupation === "Other"
                                ? profile.occupationOther || profile.occupation || ""
                                : "",
                        annualIncome: profile.annualIncome || "",
                        familyStatus: profile.familyStatus || "Middle class",
                        diet: profile.diet || "Veg",
                        aboutYourself: profile.aboutYourself || "",
                        hobbies: profile.hobbies || "",
                        mamaGotra: profile.mamaGotra || "",
                        fatherName: profile.fatherName || "",
                        motherName: profile.motherName || "",
                        fatherContactNo: profile.fatherContactNo || "",
                        fatherStatus: profile.fatherStatus || "",
                        fatherOccupation: profile.fatherOccupation || "",
                        motherStatus: profile.motherStatus || "",
                        motherOccupation: profile.motherOccupation || "",
                        noOfBrothers: profile.noOfBrothers ?? "",
                        noOfSisters: profile.noOfSisters ?? "",
                        rashiNakshatra: profile.rashiNakshatra || "",
                        mangalik: profile.mangalik || "",
                    }));

                    if (profile.photos?.length > 0) {
                        setPhoto(profile.photos[0]);
                        setExistingPhotos(profile.photos);
                    }

                    const profileFieldMap = {
                        name: profile.name,
                        gender: profile.gender,
                        dob: profile.dob,
                        motherTongue: profile.motherTongue,
                        location: profile.location || profile.city,
                        height: profile.height,
                        physicalStatus: profile.physicalStatus,
                        maritalStatus: profile.maritalStatus,
                        religion: profile.religion,
                        cast: profile.caste,
                        subCast: profile.subCaste,
                        gotra: profile.gotra,
                        education: profile.educationDetails || profile.education,
                        employment: profile.employmentType || profile.employment,
                        occupation: profile.occupation,
                        annualIncome: profile.annualIncome,
                        familyStatus: profile.familyStatus,
                        diet: profile.diet,
                        aboutYourself: profile.aboutYourself,
                    };

                    const missing = Object.entries(profileFieldMap)
                        .filter(([_, value]) => !value || value === "")
                        .map(([key]) => key);

                    console.log("Missing fields:", missing);
                    setProfileComplete(missing.length === 0);
                }
            } catch (err) {
                console.log("No profile found:", err?.response?.data);
            }
        };

        checkProfile();
    }, [token]);

    useEffect(() => {
        fetch(buildApiUrl("/api/location/states"))
            .then((res) => res.json())
            .then((data) => setStates(data))
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        if (!formData.state) return;

        fetch(buildApiUrl(`/api/location/cities/${formData.state}`))
            .then((res) => res.json())
            .then((data) => {
                setCities(data.cities || []);
                if (formData.location && !data.cities?.includes(formData.location)) {
                    setCustomCity(true);
                }
            })
            .catch((err) => console.error(err));
    }, [formData.state, formData.location]);

    useEffect(() => {
        if (token === "") return;
        if (!token) router.replace("/login");
    }, [token, router]);

    const nextStep = () => setStep((currentStep) => Math.min(4, currentStep + 1));
    const prevStep = () => setStep((currentStep) => Math.max(1, currentStep - 1));

    const handleChange = async (e) => {
        const { name, value } = e.target;

        if (name === "state") {
            setFormData((prev) => ({
                ...prev,
                state: value,
                city: "",
                location: "",
            }));

            if (!value) {
                setCities([]);
                setCustomCity(false);
                return;
            }

            try {
                const res = await fetch(buildApiUrl(`/api/location/cities/${value}`));
                const data = await res.json();
                setCities(data.cities || []);
                setCustomCity(false);
            } catch (err) {
                console.error(err);
            }

            return;
        }

        if (name === "location" && value === "__custom") {
            setCustomCity(true);
            setFormData((prev) => ({
                ...prev,
                location: "",
                city: "",
            }));
            return;
        }

        setFormData((prev) => {
            const updatedData = {
                ...prev,
                [name]: value,
            };

            if (name === "education" && value !== "Other") {
                updatedData.educationOther = "";
            }

            if (name === "employment" && value !== "Other") {
                updatedData.employmentOther = "";
            }

            if (name === "occupation" && value !== "Other") {
                updatedData.occupationOther = "";
            }

            if (name === "physicalChallenge" && value !== "Yes") {
                updatedData.physicalChallengeDescription = "";
            }

            if (name === "location") {
                updatedData.city = value;
                setCustomCity(false);
            }

            if (name === "city") {
                updatedData.location = value;
            }

            return updatedData;
        });
    };

    const handlePhotoUpload = async (file) => {
        if (!file) return;

        try {
            setUploading(true);
            const fd = new FormData();
            fd.append("image", file);

            const upload = await axios.post(buildApiUrl("/api/upload-image"), fd, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            const newUrl = upload.data.url;
            setPhoto(newUrl);
            setExistingPhotos((prev) => [...prev, newUrl]);
            toast.success("Photo uploaded");
        } catch (err) {
            console.log("Upload error:", err?.response?.data || err.message);
            toast.error("Photo upload failed");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async () => {
        try {
            const orderedPhotos = photo
                ? [photo, ...existingPhotos.filter((existingPhoto) => existingPhoto !== photo)]
                : existingPhotos;

            const payload = {
                ...formData,
                city: formData.city || formData.location || "",
                location: formData.location || formData.city || "",
                caste: formData.cast,
                subCaste: formData.subCast,
                educationDetails:
                    formData.education === "Other" ? formData.educationOther : formData.education,
                employment: formData.employment === "Other" ? formData.employmentOther : formData.employment,
                employmentType:
                    formData.employment === "Other" ? formData.employmentOther : formData.employment,
                occupation:
                    formData.occupation === "Other" ? formData.occupationOther : formData.occupation,
                photos: orderedPhotos,
            };

            await axios.post(buildApiUrl("/api/profile/create"), payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success("Profile updated successfully");
            setSubmitted(true);
            setTimeout(() => router.push("/"), 1200);
        } catch (err) {
            toast.error(err?.response?.data?.message || "Profile creation failed");
        }
    };

    const removePhoto = () => {
        setPhoto(null);
    };

    const goToIncompleteStep = () => {
        if (!formData) return;

        setProfileExists(false);

        if (!formData.name || !formData.gender || !(formData.location || formData.city) || !formData.dob) {
            setStep(1);
            return;
        }

        if (!formData.height || !formData.religion || !formData.cast || !formData.gotra) {
            setStep(2);
            return;
        }

        if (
            !formData.education ||
            (formData.education === "Other" && !formData.educationOther) ||
            !formData.occupation ||
            (formData.occupation === "Other" && !formData.occupationOther) ||
            !formData.annualIncome
        ) {
            setStep(3);
            return;
        }

        if (!formData.familyStatus || !formData.diet || !formData.aboutYourself) {
            setStep(4);
            return;
        }

        setStep(1);
    };

    const sectionTitle = (title, subtitle) => (
        <div className="mb-3">
            <h6 className="mb-1">{title}</h6>
            {subtitle ? <p className="text-muted small mb-0">{subtitle}</p> : null}
        </div>
    );

    const stepTitle = {
        1: "Basic Details",
        2: "Personal, Physical and Horoscope Details",
        3: "Professional Details",
        4: "Family and Additional Details",
    };

    return (
        <div className="otp-page bg-FDFBF7" style={{ minHeight: "100vh" }}>
            <ToastContainer position="top-right" autoClose={4000} />
            <Header />

            <div className="otp-content py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-10 col-xl-9 mx-auto mb-4">
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
                                        <path
                                            d="M0.292893 6.65691C-0.0976311 7.04743 -0.0976311 7.6806 0.292893 8.07112L6.65685 14.4351C7.04738 14.8256 7.68054 14.8256 8.07107 14.4351C8.46159 14.0446 8.46159 13.4114 8.07107 13.0209L2.41421 7.36401L8.07107 1.70716C8.46159 1.31664 8.46159 0.68347 8.07107 0.292946C7.68054 -0.0975785 7.04738 -0.0975785 6.65685 0.292946L0.292893 6.65691ZM1 7.36401V8.36401H17V7.36401V6.36401H1V7.36401Z"
                                            fill="black"
                                        />
                                    </svg>
                                    <span className="ms-2">{stepTitle[step]}</span>
                                </h6>
                                <p>Step {step}/4</p>
                            </div>

                            <div className="card shadow border-0 rounded-4">
                                <div className="card-body p-4 p-md-5">
                                    {profileExists && (
                                        <div
                                            className={`alert ${
                                                profileComplete ? "alert-success" : "alert-warning"
                                            } text-center`}
                                        >
                                            {profileComplete ? (
                                                <>
                                                    Your profile is complete!
                                                    <button
                                                        type="button"
                                                        className="btn btn-success ms-3"
                                                        onClick={() => router.push("/")}
                                                    >
                                                        Go to Dashboard
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-primary ms-2"
                                                        onClick={goToIncompleteStep}
                                                    >
                                                        Want to edit
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    Your profile is incomplete. Please complete remaining fields.
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary ms-3"
                                                        onClick={goToIncompleteStep}
                                                    >
                                                        Continue Editing
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-primary ms-2"
                                                        onClick={() => router.push("/")}
                                                    >
                                                        Skip for Now
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    )}

                                    {!profileExists && !submitted && (
                                        <>
                                            {step === 1 && (
                                                <form onSubmit={(e) => e.preventDefault()}>
                                                    {sectionTitle(
                                                        "Personal Details",
                                                        "Share your basic profile information."
                                                    )}

                                                    <div className="row g-3">
                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Name</label>
                                                            <input
                                                                name="name"
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.name}
                                                                readOnly
                                                            />
                                                        </div>

                                                        <div className="col-12 col-md-6">
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

                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">State</label>
                                                            <select
                                                                name="state"
                                                                className="form-select"
                                                                value={formData.state}
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">Select state</option>
                                                                {states
                                                                    .slice()
                                                                    .sort((a, b) => a.state.localeCompare(b.state))
                                                                    .map((stateItem) => (
                                                                        <option
                                                                            key={stateItem._id}
                                                                            value={stateItem.state}
                                                                        >
                                                                            {stateItem.state}
                                                                        </option>
                                                                    ))}
                                                            </select>
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">City</label>
                                                            {!customCity ? (
                                                                <select
                                                                    name="location"
                                                                    className="form-select"
                                                                    value={formData.location}
                                                                    onChange={handleChange}
                                                                >
                                                                    <option value="">Select city</option>
                                                                    {cities
                                                                        .slice()
                                                                        .sort((a, b) => a.localeCompare(b))
                                                                        .map((city, idx) => (
                                                                            <option key={idx} value={city}>
                                                                                {city}
                                                                            </option>
                                                                        ))}
                                                                    {cities.length > 0 && (
                                                                        <option value="__custom">
                                                                            Other (Type manually)
                                                                        </option>
                                                                    )}
                                                                </select>
                                                            ) : (
                                                                <input
                                                                    type="text"
                                                                    name="city"
                                                                    className="form-control"
                                                                    placeholder="Enter city manually"
                                                                    value={formData.city}
                                                                    onChange={handleChange}
                                                                />
                                                            )}
                                                        </div>

                                                        <div className="col-12">
                                                            <div className="p-2 rounded bg-light border">
                                                                <p className="mb-0">
                                                                    <strong>Selected City:</strong>{" "}
                                                                    {formData.city || formData.location || "Not selected"}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Email</label>
                                                            <input
                                                                name="email"
                                                                type="email"
                                                                className="form-control"
                                                                value={formData.email}
                                                                readOnly
                                                            />
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Date of Birth</label>
                                                            <input
                                                                type="date"
                                                                name="dob"
                                                                value={formData.dob}
                                                                onChange={handleChange}
                                                                className="form-control"
                                                                min="1942-01-01"
                                                                max={new Date(
                                                                    new Date().setFullYear(
                                                                        new Date().getFullYear() - 18
                                                                    )
                                                                )
                                                                    .toISOString()
                                                                    .split("T")[0]}
                                                            />
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Mother Tongue</label>
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
                                                    </div>

                                                    <div className="d-grid gap-2 mt-4">
                                                        <button
                                                            type="button"
                                                            onClick={nextStep}
                                                            className="btn bg-D4AF37 w-100 text-white"
                                                        >
                                                            Next
                                                        </button>
                                                    </div>
                                                </form>
                                            )}

                                            {step === 2 && (
                                                <>
                                                    {sectionTitle(
                                                        "Personal Details",
                                                        "Complete your personal, cultural and birth details."
                                                    )}

                                                    <div className="row g-3 mb-4">
                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Height</label>
                                                            <input
                                                                name="height"
                                                                type="text"
                                                                placeholder="5ft 6in"
                                                                className="form-control"
                                                                value={formData.height}
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Physical Status</label>
                                                            <select
                                                                name="physicalStatus"
                                                                className="form-select"
                                                                value={formData.physicalStatus}
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="Normal">Normal</option>
                                                                <option value="Physically challenged">
                                                                    Physically Challenged
                                                                </option>
                                                            </select>
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Marital Status</label>
                                                            <select
                                                                name="maritalStatus"
                                                                className="form-select"
                                                                value={formData.maritalStatus}
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="Married">Married</option>
                                                                <option value="Never married">Never Married</option>
                                                                <option value="Divorced">
                                                                    Previously Married (Divorced)
                                                                </option>
                                                                <option value="Widower">
                                                                    Previously Married (Widowed)
                                                                </option>
                                                                <option value="Awaiting divorce">
                                                                    Legally Separated / Awaiting Divorce
                                                                </option>
                                                            </select>
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Religion</label>
                                                            <input
                                                                name="religion"
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.religion}
                                                                onChange={handleChange}
                                                                readOnly
                                                            />
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Cast</label>
                                                            <input
                                                                name="cast"
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.cast}
                                                                onChange={handleChange}
                                                                readOnly
                                                            />
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Sub Cast</label>
                                                            <select
                                                                name="subCast"
                                                                className="form-select"
                                                                value={formData.subCast}
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">Select Sub Cast</option>
                                                                <option value="Dhakad">Dhakad</option>
                                                                <option value="Dhakar">Dhakar</option>
                                                                <option value="Dhaker">Dhaker</option>
                                                                <option value="Nagar">Nagar</option>
                                                                <option value="Malav">Malav</option>
                                                                <option value="Kirar">Kirar</option>
                                                            </select>
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Gotra</label>
                                                            <input
                                                                name="gotra"
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.gotra}
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Skin Tone</label>
                                                            <select
                                                                name="skinTone"
                                                                className="form-select"
                                                                value={formData.skinTone}
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">Select skin tone</option>
                                                                <option value="Fair">Fair</option>
                                                                <option value="Wheatish">Wheatish</option>
                                                                <option value="Medium">Medium</option>
                                                                <option value="Dark">Dark</option>
                                                                <option value="Very Dark">Very Dark</option>
                                                            </select>
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Birth Place</label>
                                                            <input
                                                                name="birthPlace"
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.birthPlace}
                                                                onChange={handleChange}
                                                                placeholder="Enter birth place"
                                                            />
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Birth Time</label>
                                                            <input
                                                                name="birthTime"
                                                                type="time"
                                                                className="form-control"
                                                                value={formData.birthTime}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <hr className="my-4" />
                                                    {sectionTitle(
                                                        "Physical Details",
                                                        "These fields are optional and shown as part of your profile."
                                                    )}

                                                    <div className="row g-3 mb-4">
                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Body Type</label>
                                                            <select
                                                                name="bodyType"
                                                                className="form-select"
                                                                value={formData.bodyType}
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">Select body type</option>
                                                                <option value="Slim">Slim</option>
                                                                <option value="Athletic">Athletic</option>
                                                                <option value="Average">Average</option>
                                                                <option value="Heavy">Heavy</option>
                                                            </select>
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Do you smoke?</label>
                                                            <select
                                                                name="smoke"
                                                                className="form-select"
                                                                value={formData.smoke}
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="Yes">Yes</option>
                                                                <option value="No">No</option>
                                                            </select>
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Do you drink?</label>
                                                            <select
                                                                name="drink"
                                                                className="form-select"
                                                                value={formData.drink}
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="Yes">Yes</option>
                                                                <option value="No">No</option>
                                                            </select>
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Physical Challenge</label>
                                                            <select
                                                                name="physicalChallenge"
                                                                className="form-select"
                                                                value={formData.physicalChallenge}
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="Yes">Yes</option>
                                                                <option value="No">No</option>
                                                            </select>
                                                        </div>

                                                        {formData.physicalChallenge === "Yes" && (
                                                            <div className="col-12">
                                                                <label className="form-label">
                                                                    Physical Challenge Description
                                                                </label>
                                                                <input
                                                                    name="physicalChallengeDescription"
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={formData.physicalChallengeDescription}
                                                                    onChange={handleChange}
                                                                    placeholder="Describe briefly"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>

                                                    <hr className="my-4" />
                                                    {sectionTitle(
                                                        "Horoscope Details",
                                                        "Add horoscope details if you would like to share them."
                                                    )}

                                                    <div className="row g-3">
                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Rashi / Nakshatra</label>
                                                            <input
                                                                name="rashiNakshatra"
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.rashiNakshatra}
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Mangalik</label>
                                                            <select
                                                                name="mangalik"
                                                                className="form-select"
                                                                value={formData.mangalik}
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="Yes">Yes</option>
                                                                <option value="No">No</option>
                                                                <option value="Anshik">Anshik</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="d-grid gap-2 mt-4">
                                                        <button
                                                            type="button"
                                                            onClick={nextStep}
                                                            className="btn bg-D4AF37 text-white w-100"
                                                        >
                                                            Next
                                                        </button>
                                                    </div>
                                                </>
                                            )}

                                            {step === 3 && (
                                                <>
                                                    {sectionTitle(
                                                        "Professional Details",
                                                        "Add education, employment and occupation details."
                                                    )}

                                                    <div className="row g-3">
                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Education</label>
                                                            <select
                                                                name="education"
                                                                className="form-select"
                                                                value={formData.education}
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">Select education</option>
                                                                <option value="10th">10th / Secondary School</option>
                                                                <option value="12th">12th / Higher Secondary</option>
                                                                <option value="diploma">Diploma</option>
                                                                <option value="bachelors">
                                                                    Bachelor&#39;s Degree
                                                                </option>
                                                                <option value="masters">Master&#39;s Degree</option>
                                                                <option value="phd">PhD / Doctorate</option>
                                                                <option value="ca">CA</option>
                                                                <option value="cs">CS</option>
                                                                <option value="icwa">ICWA / CMA</option>
                                                                <option value="mbbs">MBBS</option>
                                                                <option value="md">MD / MS</option>
                                                                <option value="law">LLB / LLM</option>
                                                                <option value="Other">Other</option>
                                                            </select>
                                                        </div>

                                                        {formData.education === "Other" && (
                                                            <div className="col-12 col-md-6">
                                                                <label className="form-label">
                                                                    Other Education Description
                                                                </label>
                                                                <input
                                                                    name="educationOther"
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={formData.educationOther}
                                                                    onChange={handleChange}
                                                                    placeholder="Enter your education"
                                                                />
                                                            </div>
                                                        )}

                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Employment</label>
                                                            <select
                                                                name="employment"
                                                                className="form-select"
                                                                value={formData.employment}
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">Select employment</option>
                                                                <option value="government">Government Job</option>
                                                                <option value="private">Private Job</option>
                                                                <option value="business">
                                                                    Business / Entrepreneur
                                                                </option>
                                                                <option value="self_employed">
                                                                    Self Employed
                                                                </option>
                                                                <option value="freelancer">
                                                                    Freelancer / Consultant
                                                                </option>
                                                                <option value="defense">
                                                                    Defence / Armed Forces
                                                                </option>
                                                                <option value="psu">PSU / Public Sector</option>
                                                                <option value="startup">Startup</option>
                                                                <option value="ngo">NGO / Social Work</option>
                                                                <option value="student">Student</option>
                                                                <option value="not_working">Not Working</option>
                                                                <option value="homemaker">Homemaker</option>
                                                                <option value="retired">Retired</option>
                                                                <option value="Other">Other</option>
                                                            </select>
                                                        </div>

                                                        {formData.employment === "Other" && (
                                                            <div className="col-12 col-md-6">
                                                                <label className="form-label">
                                                                    Other Employment Description
                                                                </label>
                                                                <input
                                                                    name="employmentOther"
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={formData.employmentOther}
                                                                    onChange={handleChange}
                                                                    placeholder="Enter employment details"
                                                                />
                                                            </div>
                                                        )}

                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Occupation</label>
                                                            <select
                                                                name="occupation"
                                                                className="form-select"
                                                                value={formData.occupation}
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">Select occupation</option>
                                                                <option value="software_engineer">
                                                                    Software Engineer
                                                                </option>
                                                                <option value="web_developer">Web Developer</option>
                                                                <option value="mobile_developer">
                                                                    Mobile App Developer
                                                                </option>
                                                                <option value="data_analyst">Data Analyst</option>
                                                                <option value="it_support">IT Support</option>
                                                                <option value="manager">Manager</option>
                                                                <option value="hr">HR Professional</option>
                                                                <option value="accountant">Accountant</option>
                                                                <option value="marketing">
                                                                    Marketing Professional
                                                                </option>
                                                                <option value="sales">Sales Executive</option>
                                                                <option value="doctor">Doctor</option>
                                                                <option value="nurse">Nurse</option>
                                                                <option value="pharmacist">Pharmacist</option>
                                                                <option value="teacher">Teacher</option>
                                                                <option value="professor">
                                                                    Professor / Lecturer
                                                                </option>
                                                                <option value="govt_officer">
                                                                    Government Officer
                                                                </option>
                                                                <option value="defence">
                                                                    Defence Personnel
                                                                </option>
                                                                <option value="police">Police</option>
                                                                <option value="business_owner">
                                                                    Business Owner
                                                                </option>
                                                                <option value="shop_owner">Shop Owner</option>
                                                                <option value="entrepreneur">Entrepreneur</option>
                                                                <option value="mechanic">Mechanic</option>
                                                                <option value="electrician">Electrician</option>
                                                                <option value="plumber">Plumber</option>
                                                                <option value="technician">Technician</option>
                                                                <option value="farmer">Farmer</option>
                                                                <option value="driver">Driver</option>
                                                                <option value="clerk">Clerk</option>
                                                                <option value="security_guard">
                                                                    Security Guard
                                                                </option>
                                                                <option value="homemaker">Homemaker</option>
                                                                <option value="student">Student</option>
                                                                <option value="not_working">Not Working</option>
                                                                <option value="Other">Other</option>
                                                            </select>
                                                        </div>

                                                        {formData.occupation === "Other" && (
                                                            <div className="col-12 col-md-6">
                                                                <label className="form-label">
                                                                    Other Occupation Description
                                                                </label>
                                                                <input
                                                                    name="occupationOther"
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={formData.occupationOther}
                                                                    onChange={handleChange}
                                                                    placeholder="Enter occupation"
                                                                />
                                                            </div>
                                                        )}

                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Annual Income</label>
                                                            <select
                                                                name="annualIncome"
                                                                className="form-select"
                                                                value={formData.annualIncome}
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">Select annual income</option>
                                                                <option value="below_1_lakh">Below Rs 1 Lakh</option>
                                                                <option value="1_3_lakh">Rs 1 - 3 Lakh</option>
                                                                <option value="3_5_lakh">Rs 3 - 5 Lakh</option>
                                                                <option value="5_8_lakh">Rs 5 - 8 Lakh</option>
                                                                <option value="8_12_lakh">Rs 8 - 12 Lakh</option>
                                                                <option value="12_20_lakh">Rs 12 - 20 Lakh</option>
                                                                <option value="20_35_lakh">Rs 20 - 35 Lakh</option>
                                                                <option value="35_50_lakh">Rs 35 - 50 Lakh</option>
                                                                <option value="50_lakh_1_cr">
                                                                    Rs 50 Lakh - 1 Crore
                                                                </option>
                                                                <option value="above_1_cr">
                                                                    Above Rs 1 Crore
                                                                </option>
                                                                <option value="not_disclosed">
                                                                    Prefer not to say
                                                                </option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="d-grid gap-2 mt-4">
                                                        <button
                                                            type="button"
                                                            onClick={nextStep}
                                                            className="btn bg-D4AF37 text-white w-100"
                                                        >
                                                            Next
                                                        </button>
                                                    </div>
                                                </>
                                            )}

                                            {step === 4 && (
                                                <>
                                                    {sectionTitle(
                                                        "Family Details",
                                                        "Share family and household details if you want them visible."
                                                    )}

                                                    <div className="row g-3 mb-4">
                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Family Status</label>
                                                            <select
                                                                name="familyStatus"
                                                                className="form-select"
                                                                value={formData.familyStatus}
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="Middle class">Middle class</option>
                                                                <option value="Upper middle class">
                                                                    Upper middle class
                                                                </option>
                                                                <option value="Rich / Affluent (Elite)">
                                                                    Rich / Affluent (Elite)
                                                                </option>
                                                            </select>
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Diet</label>
                                                            <select
                                                                name="diet"
                                                                className="form-select"
                                                                value={formData.diet}
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="Veg">Veg</option>
                                                                <option value="Nonveg">Non Veg</option>
                                                                <option value="Vegan">Vegan</option>
                                                                <option value="Occasionally Non-Veg">
                                                                    Occasionally Non-Veg
                                                                </option>
                                                            </select>
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Mama Gotra</label>
                                                            <input
                                                                name="mamaGotra"
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.mamaGotra}
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Father Name</label>
                                                            <input
                                                                name="fatherName"
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.fatherName}
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Mother Name</label>
                                                            <input
                                                                name="motherName"
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.motherName}
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Father Contact No</label>
                                                            <input
                                                                name="fatherContactNo"
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.fatherContactNo}
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Father Status</label>
                                                            <input
                                                                name="fatherStatus"
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.fatherStatus}
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Father Occupation</label>
                                                            <input
                                                                name="fatherOccupation"
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.fatherOccupation}
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Mother Status</label>
                                                            <input
                                                                name="motherStatus"
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.motherStatus}
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">Mother Occupation</label>
                                                            <input
                                                                name="motherOccupation"
                                                                type="text"
                                                                className="form-control"
                                                                value={formData.motherOccupation}
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">No. of Brothers</label>
                                                            <input
                                                                name="noOfBrothers"
                                                                type="number"
                                                                min="0"
                                                                className="form-control"
                                                                value={formData.noOfBrothers}
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">No. of Sisters</label>
                                                            <input
                                                                name="noOfSisters"
                                                                type="number"
                                                                min="0"
                                                                className="form-control"
                                                                value={formData.noOfSisters}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <hr className="my-4" />
                                                    {sectionTitle(
                                                        "Additional Details",
                                                        "Tell others a little more about yourself."
                                                    )}

                                                    <div className="row g-3">
                                                        <div className="col-12">
                                                            <label className="form-label">
                                                                A few words about myself
                                                            </label>
                                                            <textarea
                                                                name="aboutYourself"
                                                                className="form-control"
                                                                rows="3"
                                                                value={formData.aboutYourself}
                                                                onChange={handleChange}
                                                                placeholder="Write a short intro..."
                                                            />
                                                        </div>

                                                        <div className="col-12">
                                                            <label className="form-label">Hobbies</label>
                                                            <textarea
                                                                name="hobbies"
                                                                className="form-control"
                                                                rows="2"
                                                                value={formData.hobbies}
                                                                onChange={handleChange}
                                                                placeholder="Write your hobbies"
                                                            />
                                                        </div>

                                                        <div className="col-12">
                                                            <label className="form-label">
                                                                Upload Profile Picture
                                                            </label>
                                                            {!photo ? (
                                                                <input
                                                                    className="form-control"
                                                                    type="file"
                                                                    accept="image/jpeg,image/png"
                                                                    onChange={(e) =>
                                                                        handlePhotoUpload(e.target.files[0])
                                                                    }
                                                                />
                                                            ) : (
                                                                <div className="text-center">
                                                                    <img
                                                                        src={photo}
                                                                        alt="uploaded"
                                                                        className="img-thumbnail mb-2"
                                                                        style={{
                                                                            width: 150,
                                                                            height: 150,
                                                                            objectFit: "cover",
                                                                        }}
                                                                    />
                                                                    <div>
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-danger btn-sm me-2"
                                                                            onClick={removePhoto}
                                                                        >
                                                                            Cancel
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="d-grid gap-2 mt-4">
                                                        <button
                                                            type="button"
                                                            className="btn bg-D4AF37 text-white w-100"
                                                            onClick={handleSubmit}
                                                            disabled={uploading}
                                                        >
                                                            {uploading ? "Uploading..." : "Submit"}
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>

                                {submitted && (
                                    <div className="text-center my-3">
                                        <img
                                            src="/assets/images/checkmark.png"
                                            alt="ok"
                                            width={100}
                                        />
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
    );
};

export default RegistrationForm;
