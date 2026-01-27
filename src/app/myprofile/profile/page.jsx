"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import axios from "axios";

// ---------------- Detail Item ----------------
const DetailItem = ({ label, value }) => (
    <div className="profile-detail-item">
        <div className="fw-medium fs-6 text-secondary">{label}</div>
        <div className="fw-medium fs-6 text-dark">{value || "Not Available"}</div>
    </div>
);

// ---------------- Section Card ----------------
const ProfileSection = ({ title, children, onEdit }) => (
    <div className="profile-edit-section">
        <div className="section-header-row">
            <h4 className="section-title-profile">{title}</h4>
            {onEdit && (
                <button onClick={onEdit} className="edit-btn">
                    <i className="fa-solid fa-pen me-1"></i> Edit
                </button>
            )}
        </div>
        <div className="section-content-grid">{children}</div>
    </div>
);

// ---------------- Edit Modal ----------------
const EditModal = ({ open, onClose, fields, data, onSubmit }) => {
    const [form, setForm] = useState({});
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        setForm(data || {});
    }, [data]);

    useEffect(() => {
        axios.get("http://143.110.244.163:5000/api/location/states").then((res) => {
            setStates(res.data || []);
        });
    }, []);

    useEffect(() => {
        if (form.state) {
            axios
                .get(`http://143.110.244.163:5000/api/location/cities/${form.state}`)
                .then((res) => setCities(res.data.cities || []));
        }
    }, [form.state]);

    if (!open) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name === "city" ? "location" : name]: value,
        }));
    };


    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center" style={{ zIndex: 9999 }}>
            <div className="bg-white p-4 rounded-4 shadow w-100 editdetail">
                <h5 className="mb-3">Edit Details</h5>

                <div className="row g-3">
                    {/* {fields.map((f) => (
                        <div key={f} className="col-md-6">
                            <label className="form-label text-capitalize">{f}</label>

                            {f === "state" ? (
                                <select name="state" value={form.state || ""} onChange={handleChange} className="form-select">
                                    <option value="">Select State</option>
                                    {states
                                        .slice()
                                        .sort((a, b) => a.state.localeCompare(b.state))
                                        .map((s) => (
                                            <option key={s._id} value={s.state}>{s.state}</option>
                                        ))}

                                </select>

                            ) : f === "city" || f === "location" ? (
                                <select name="city" value={form.city || form.location || ""} onChange={handleChange} className="form-select">
                                    <option value="">Select City</option>
                                    {cities
                                        .slice()
                                        .sort((a, b) => a.localeCompare(b))
                                        .map((c, i) => (
                                            <option key={i} value={c}>{c}</option>
                                        ))}

                                </select>

                            ) : f === "gender" ? (
                                <select name="gender" value={form.gender || ""} onChange={handleChange} className="form-select">
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>

                            ) : f === "diet" ? (
                                <select name="diet" value={form.diet || ""} onChange={handleChange} className="form-select">
                                    <option value="">Select</option>
                                    <option value="Veg">Veg</option>
                                    <option value="Nonveg">Non Veg</option>
                                </select>

                            ) : f === "familyStatus" ? (
                                <select name="familyStatus" value={form.familyStatus || ""} onChange={handleChange} className="form-select">
                                    <option value="">Select</option>
                                    <option value="Middle class">Middle class</option>
                                    <option value="Upper middle class">Upper middle class</option>
                                    <option value="Rich / Affluent (Elite)">Rich / Affluent (Elite)</option>
                                </select>

                            ) : f === "physicalStatus" ? (
                                <select name="physicalStatus" value={form.physicalStatus || ""} onChange={handleChange} className="form-select">
                                    <option value="">Select</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Physically Challenged">Physically Challenged</option>
                                </select>

                            ) : f === "maritalStatus" ? (
                                <select name="maritalStatus" value={form.maritalStatus || ""} onChange={handleChange} className="form-select">
                                    <option value="">Select</option>
                                    <option value="Never married">Never Married</option>
                                    <option value="Divorced">Previously Married (Divorced)</option>
                                    <option value="Widower">Previously Married (Widowed)</option>
                                    <option value="Awaiting divorce">Legally Separated / Awaiting Divorce</option>
                                </select>

                            ) : f === "dob" ? (
                                <input
                                    type="date"
                                    name="dob"
                                    value={form.dob || ""}
                                    onChange={handleChange}
                                    className="form-control"
                                />

                            ) : (
                                <input
                                    name={f}
                                    value={form[f] || ""}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            )}
                        </div>
                    ))} */}


                    {fields.map((f) => (
                        <div key={f} className="col-md-6">
                            <label className="form-label text-capitalize">{f}</label>

                            {/* State */}
                            {f === "state" ? (
                                <select name="state" value={form.state || ""} onChange={handleChange} className="form-select">
                                    <option value="">Select State</option>
                                    {states
                                        .slice()
                                        .sort((a, b) => a.state.localeCompare(b.state))
                                        .map((s) => (
                                            <option key={s._id} value={s.state}>{s.state}</option>
                                        ))}
                                </select>

                            ) : f === "city" || f === "location" ? (
                                <select name="city" value={form.city || form.location || ""} onChange={handleChange} className="form-select">
                                    <option value="">Select City</option>
                                    {cities
                                        .slice()
                                        .sort((a, b) => a.localeCompare(b))
                                        .map((c, i) => (
                                            <option key={i} value={c}>{c}</option>
                                        ))}
                                </select>

                            ) : f === "gender" ? (
                                <select name="gender" value={form.gender || ""} onChange={handleChange} className="form-select">
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>

                            ) : f === "diet" ? (
                                <select name="diet" value={form.diet || ""} onChange={handleChange} className="form-select">
                                    <option value="">Select</option>
                                    <option value="Veg">Veg</option>
                                    <option value="Nonveg">Non Veg</option>
                                </select>

                            ) : f === "familyStatus" ? (
                                <select name="familyStatus" value={form.familyStatus || ""} onChange={handleChange} className="form-select">
                                    <option value="">Select</option>
                                    <option value="Middle class">Middle class</option>
                                    <option value="Upper middle class">Upper middle class</option>
                                    <option value="Rich / Affluent (Elite)">Rich / Affluent (Elite)</option>
                                </select>

                            ) : f === "physicalStatus" ? (
                                <select name="physicalStatus" value={form.physicalStatus || ""} onChange={handleChange} className="form-select">
                                    <option value="">Select</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Physically Challenged">Physically Challenged</option>
                                </select>

                            ) : f === "maritalStatus" ? (
                                <select name="maritalStatus" value={form.maritalStatus || ""} onChange={handleChange} className="form-select">
                                    <option value="">Select</option>
                                    <option value="Never married">Never Married</option>
                                    <option value="Divorced">Previously Married (Divorced)</option>
                                    <option value="Widower">Previously Married (Widowed)</option>
                                    <option value="Awaiting divorce">Legally Separated / Awaiting Divorce</option>
                                </select>

                            ) : f === "employmentType" ? (
                                <select name="employmentType" value={form.employmentType || ""} onChange={handleChange} className="form-select">
                                    <option value="">Select employment type</option>
                                    <option value="government">Government Job</option>
                                    <option value="private">Private Job</option>
                                    <option value="business">Business / Entrepreneur</option>
                                    <option value="self_employed">Self Employed</option>
                                    <option value="freelancer">Freelancer / Consultant</option>
                                    <option value="defense">Defence / Armed Forces</option>
                                    <option value="psu">PSU / Public Sector</option>
                                    <option value="startup">Startup</option>
                                    <option value="ngo">NGO / Social Work</option>
                                    <option value="student">Student</option>
                                    <option value="not_working">Not Working</option>
                                    <option value="homemaker">Homemaker</option>
                                    <option value="retired">Retired</option>
                                </select>

                            ) : f === "education" ? (
                                <select name="education" value={form.education || ""} onChange={handleChange} className="form-select">
                                    <option value="">Select education</option>
                                    <option value="10th">10th</option>
                                    <option value="12th">12th</option>
                                    <option value="diploma">Diploma</option>
                                    <option value="bachelors">Bachelor's Degree</option>
                                    <option value="masters">Master's Degree</option>
                                    <option value="phd">PhD / Doctorate</option>
                                    <option value="ca">CA</option>
                                    <option value="cs">CS</option>
                                    <option value="mbbs">MBBS</option>
                                    <option value="law">LLB / LLM</option>
                                    <option value="others">Others</option>
                                </select>

                            ) : f === "occupation" ? (
                                <select name="occupation" value={form.occupation || ""} onChange={handleChange} className="form-select">
                                    <option value="">Select occupation</option>
                                    <option value="software_engineer">Software Engineer</option>
                                    <option value="manager">Manager</option>
                                    <option value="doctor">Doctor</option>
                                    <option value="teacher">Teacher</option>
                                    <option value="business_owner">Business Owner</option>
                                    <option value="govt_officer">Government Officer</option>
                                    <option value="farmer">Farmer</option>
                                    <option value="student">Student</option>
                                    <option value="not_working">Not Working</option>
                                    <option value="others">Others</option>
                                </select>

                            ) : f === "annualIncome" ? (
                                <select name="annualIncome" value={form.annualIncome || ""} onChange={handleChange} className="form-select">
                                    <option value="">Select annual income</option>
                                    <option value="below_1_lakh">Below ₹1 Lakh</option>
                                    <option value="1_3_lakh">₹1 – 3 Lakh</option>
                                    <option value="3_5_lakh">₹3 – 5 Lakh</option>
                                    <option value="5_8_lakh">₹5 – 8 Lakh</option>
                                    <option value="8_12_lakh">₹8 – 12 Lakh</option>
                                    <option value="12_20_lakh">₹12 – 20 Lakh</option>
                                    <option value="20_35_lakh">₹20 – 35 Lakh</option>
                                    <option value="35_50_lakh">₹35 – 50 Lakh</option>
                                    <option value="50_lakh_1_cr">₹50 Lakh – 1 Crore</option>
                                    <option value="above_1_cr">Above ₹1 Crore</option>
                                    <option value="not_disclosed">Prefer not to say</option>
                                </select>

                            ) : f === "dob" ? (
                                <input
                                    type="date"
                                    name="dob"
                                    value={form.dob || ""}
                                    onChange={handleChange}
                                    className="form-control"
                                />

                            ) : (
                                <input
                                    name={f}
                                    value={form[f] || ""}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            )}
                        </div>
                    ))}


                </div>

                <div className="text-end mt-4">
                    <button className="btn btn-secondary me-2" onClick={onClose}>Cancel</button>
                    <button className="btn btn-danger text-white" onClick={() => onSubmit(form)}>Save</button>
                </div>
            </div>
        </div>
    );
};

// ---------------- Main Page ----------------
export default function ProfilePage() {
    const [token, setToken] = useState("");
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [editOpen, setEditOpen] = useState(false);
    const [editFields, setEditFields] = useState([]);
    const [editData, setEditData] = useState({});
    const [uploading, setUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [photoToDelete, setPhotoToDelete] = useState(null);

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploading(true);

            const fd = new FormData();
            fd.append("photo", file);

            const uploadRes = await axios.post(
                "http://143.110.244.163:5000/api/upload/photo",
                fd,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const newUrl = uploadRes.data.url;

            const updatedPhotos = [...(profile.photos || []), newUrl];

            await axios.put(
                "http://143.110.244.163:5000/api/profile/update",
                { photos: updatedPhotos },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setProfile((prev) => ({ ...prev, photos: updatedPhotos }));
        } catch (err) {
            alert("Photo upload failed");
        } finally {
            setUploading(false);
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            setToken(localStorage.getItem("token") || "");
            setUser(JSON.parse(localStorage.getItem("user") || "null"));
        }
    }, []);

    const userId = user?._id;

    const fetchProfile = async () => {
        if (!userId) return;
        const res = await axios.get(`http://143.110.244.163:5000/api/profile/own-profile/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data.profile);
    };

    useEffect(() => { fetchProfile(); }, [userId]);

    const handleEdit = (fields) => {
        const data = {};
        fields.forEach((f) => data[f] = profile[f] || "");
        setEditFields(fields);
        setEditData(data);
        setEditOpen(true);
    };

    const saveProfileUpdate = async (updated) => {
        await axios.put("http://143.110.244.163:5000/api/profile/update", updated, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setEditOpen(false);
        fetchProfile();
    };


    const handleDeletePhoto = async () => {
        try {
            const updatedPhotos = profile.photos.filter((p) => p !== photoToDelete);

            await axios.put(
                "http://143.110.244.163:5000/api/profile/update",
                { photos: updatedPhotos },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setProfile((prev) => ({
                ...prev,
                photos: updatedPhotos,
            }));

            setDeleteModalOpen(false);
            setPhotoToDelete(null);

        } catch (err) {
            console.error(err);
            alert("Failed to delete photo");
        }
    };



    if (!profile) return
    <div className="text-center mt-5">
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-white d-flex justify-content-center align-items-center" style={{ zIndex: 9999 }}>
            <div className="spinner-border text-warning">

            </div>
        </div>
    </div>;

    return (
        <DashboardLayout>


            <div className="profile-page-content-custom position-relative">

                {/* IMAGE GALLERY KEEP AS IS */}
                {/* ================= IMAGE GALLERY ================= */}
                <div className="profile-edit-section">
                    <div className="section-header-row">
                        <h4 className="section-title-profile">Image Gallery</h4>

                        <label className="edit-btn" style={{ cursor: "pointer" }}>
                            {uploading ? "Uploading..." : "+ Add More Photo"}
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handlePhotoUpload}
                            />
                        </label>
                    </div>


                    <div className="masonryGallery">
                        <div className="gallery-1 gap-3">
                            <div className="row">
                                {profile?.photos?.length > 0 ? (
                                    profile.photos.map((img, i) => (
                                        <div className="col-lg-3 col-md-3 col-6 mb-lg-3 mb-md-3 mb-2" key={i}>
                                            <div className="galleryItem position-relative">

                                                <button
                                                    onClick={() => {
                                                        setPhotoToDelete(img);
                                                        setDeleteModalOpen(true);
                                                    }}
                                                    style={{
                                                        position: "absolute",
                                                        top: "6px",
                                                        right: "6px",
                                                        background: "rgba(0,0,0,0.7)",
                                                        color: "#fff",
                                                        border: "none",
                                                        borderRadius: "50%",
                                                        width: "28px",
                                                        height: "28px",
                                                        cursor: "pointer",
                                                        zIndex: 10
                                                    }}
                                                >
                                                    ×
                                                </button>

                                                <img
                                                    src={img}
                                                    alt="gallery"
                                                    onClick={() => setSelectedImage(img)}
                                                    style={{
                                                        width: "100%",
                                                        height: "200px",
                                                        objectFit: "cover",
                                                        borderRadius: "10px",
                                                        border: "1px solid #ddd",
                                                    }}
                                                />
                                            </div>
                                        </div>

                                    ))
                                ) : (
                                    <p className="text-muted small">No photos uploaded yet</p>
                                )}
                            </div>
                        </div>
                    </div>
                    {selectedImage && (
                        <div className="preview position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75" onClick={() => setSelectedImage(null)}>
                            <div className="previewContent p-3 rounded">
                                <img
                                    src={selectedImage}
                                    alt="Preview"
                                    width={600}
                                    style={{ maxHeight: "80vh", objectFit: "contain" }}
                                    className="img-fluid rounded"
                                />
                            </div>
                        </div>
                    )}
                </div>


                <ProfileSection title="Personal Information" onEdit={() => handleEdit(["name", "gender", "dob", "motherTongue", "height", "physicalStatus", "maritalStatus"])}>
                    <DetailItem label="Name" value={profile.name} />
                    <DetailItem label="Gender" value={profile.gender} />
                    <DetailItem label="DOB" value={profile.dob?.split("T")[0]} />
                    <DetailItem label="Mother Tongue" value={profile.motherTongue} />
                    <DetailItem label="Height" value={profile.height} />
                    <DetailItem label="Physical Status" value={profile.physicalStatus} />
                    <DetailItem label="Marital Status" value={profile.maritalStatus} />

                </ProfileSection>

                <ProfileSection title="Location" onEdit={() => handleEdit(["state", "city"])}>
                    {/* <DetailItem label="State" value={profile.state} /> */}
                    <DetailItem label="City" value={profile.city || profile.location} />
                </ProfileSection>

                <ProfileSection title="Religion & Culture" onEdit={() => handleEdit(["religion", "caste", "subCaste", "gotra"])}>
                    <DetailItem label="Religion" value={profile.religion} />
                    <DetailItem label="caste" value={profile.caste} />
                    <DetailItem label="Sub caste" value={profile.subCaste} />
                    <DetailItem label="Gotra" value={profile.gotra} />
                </ProfileSection>

                <ProfileSection title="Professional Information" onEdit={() => handleEdit(["educationDetails", "employmentType", "occupation", "annualIncome"])}>
                    <DetailItem label="Education" value={profile.educationDetails} />
                    <DetailItem label="Employment Type" value={profile.employmentType} />
                    <DetailItem label="Occupation" value={profile.occupation} />
                    <DetailItem label="Annual Income" value={profile.annualIncome} />
                </ProfileSection>

                <ProfileSection title="Family & Lifestyle" onEdit={() => handleEdit(["familyStatus", "diet", "aboutYourself", "hobbies"])}>
                    <DetailItem label="Family Status" value={profile.familyStatus} />
                    <DetailItem label="Diet" value={profile.diet} />
                    <DetailItem label="About" value={profile.aboutYourself} />
                    <DetailItem label="Hobbies" value={profile.hobbies} />


                </ProfileSection>

                <EditModal
                    open={editOpen}
                    onClose={() => setEditOpen(false)}
                    fields={editFields}
                    data={editData}
                    onSubmit={saveProfileUpdate}
                />

            </div>

            {deleteModalOpen && (
                <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center" style={{ zIndex: 9999 }}>
                    <div className="bg-white p-4 rounded-4 shadow" style={{ width: "320px" }}>
                        <h5 className="mb-3">Delete Photo</h5>
                        <p className="text-muted">Are you sure you want to delete this photo?</p>

                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <button
                                className="btn btn-secondary"
                                onClick={() => {
                                    setDeleteModalOpen(false);
                                    setPhotoToDelete(null);
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                className="btn btn-danger"
                                onClick={handleDeletePhoto}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </DashboardLayout >
    );
}


