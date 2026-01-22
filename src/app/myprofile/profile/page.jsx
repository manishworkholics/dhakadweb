"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import axios from "axios";

// ---------------- Detail Item ----------------
const DetailItem = ({ label, value }) => (
    <div className="profile-detail-item">
        <div className="detail-label">{label}</div>
        <div className="detail-value">{value || "Not Available"}</div>
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




    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setForm((p) => ({ ...p, [name]: value }));
    // };

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
                    {fields.map((f) => (
                        <div key={f} className="col-md-6">
                            <label className="form-label text-capitalize">{f}</label>

                            {f === "state" ? (
                                <select name="state" value={form.state || ""} onChange={handleChange} className="form-select">
                                    <option value="">Select State</option>
                                    {states.map((s) => (
                                        <option key={s._id} value={s.state}>{s.state}</option>
                                    ))}
                                </select>

                            ) : f === "city" || f === "location" ? (
                                <select name="city" value={form.city || form.location || ""} onChange={handleChange} className="form-select">
                                    <option value="">Select City</option>
                                    {cities.map((c, i) => (
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
                    <button className="btn btn-warning text-white" onClick={() => onSubmit(form)}>Save</button>
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

    if (!profile) return <div className="text-center mt-5">Loading...</div>;

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

                    {/* <div
                    //     style={{
                    //         display: "grid",
                    //         gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                    //         gap: "12px",
                    //         marginTop: "10px",
                    //     }}
                    // > */}
                    <div className="masonryGallery">
                        <div className="gallery-1 gap-3">
                            <div className="row">
                                {profile?.photos?.length > 0 ? (
                                    profile.photos.map((img, i) => (
                                        <div className="col-lg-3 col-md-3 col-6 mb-lg-3 mb-md-3 mb-2" key={i}>
                                            <div key={i} className="galleryItem position-relative" onClick={() => setSelectedImage(img)}>
                                                <img
                                                    key={i}
                                                    src={img}
                                                    alt="gallery"
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


                <ProfileSection title="Personal Information" onEdit={() => handleEdit(["name", "gender", "dob", "motherTongue"])}>
                    <DetailItem label="Name" value={profile.name} />
                    <DetailItem label="Gender" value={profile.gender} />
                    <DetailItem label="DOB" value={profile.dob?.split("T")[0]} />
                    <DetailItem label="Mother Tongue" value={profile.motherTongue} />
                </ProfileSection>

                <ProfileSection title="Location" onEdit={() => handleEdit(["state", "city", "location"])}>
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
        </DashboardLayout >
    );
}


