
// "use client";

// import React, { useEffect, useState } from "react";
// import DashboardLayout from "../components/Layout/DashboardLayout";

// const DetailItem = ({ label, value }) => (
//     <div className="profile-detail-item">
//         <span className="detail-label">{label}:</span>
//         <span className="detail-value">{value || "Not Available"}</span>
//     </div>
// );

// const ProfileSection = ({ title, children }) => (
//     <div className="profile-edit-section">
//         <div className="section-header-row">
//             <h4 className="section-title-profile">{title}</h4>
//             <button className="edit-btn">
//                 <span role="img" aria-label="Edit">✏️</span> Edit
//             </button>
//         </div>
//         <div className="section-content-grid">{children}</div>
//     </div>
// );

// export default function ProfilePage() {
//     const [token, setToken] = useState("");
//     const [user, setUser] = useState(null);
//     const [profile, setProfile] = useState(null);
//     const [uploading, setUploading] = useState(false);

//     useEffect(() => {
//         if (typeof window !== "undefined") {
//             const savedToken = localStorage.getItem("token");
//             const savedUser = localStorage.getItem("user");

//             if (savedToken) setToken(savedToken);
//             if (savedUser) setUser(JSON.parse(savedUser));
//         }
//     }, []);

//     const userId =
//         typeof window !== "undefined"
//             ? JSON.parse(localStorage.getItem("user"))?._id
//             : null;

//     // Load profile
//     const fetchProfile = async () => {
//         try {
//             const res = await fetch(
//                 `http://143.110.244.163:5000/api/profile/own-profile/${userId}`
//             );
//             const data = await res.json();
//             setProfile(data.profile);
//         } catch (error) {
//             console.log("Profile fetch error:", error);
//         }
//     };

//     useEffect(() => {
//         if (userId) fetchProfile();
//     }, [userId]);


//     /** 📌 Handle Photo Upload */
//     const handlePhotoUpload = async (event) => {
//         const file = event.target.files[0];
//         if (!file) return;

//         setUploading(true);

//         const formData = new FormData();
//         formData.append("photo", file);

//         try {
//             const res = await fetch(
//                 `http://143.110.244.163:5000/api/upload/photo`,
//                 {
//                     method: "POST",
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                     body: formData,
//                 }
//             );

//             const data = await res.json();

//             if (data?.url) {
//                 const updatedPhotos = [...profile.photos, data.url];

//                 await fetch(`http://143.110.244.163:5000/api/profile/own-profile/${userId}`, {
//                     // method: "PUT",
//                     // headers: {
//                     //     "Content-Type": "application/json",
//                     //     Authorization: `Bearer ${token}`,
//                     // },
//                     body: JSON.stringify({ photos: updatedPhotos }),
//                 });

//                 setProfile((prev) => ({ ...prev, photos: updatedPhotos }));
//             }
//         } catch (error) {
//             console.log("Upload Error:", error);
//         }

//         setUploading(false);
//     };


//     const calculateAge = (dob) => {
//         if (!dob) return "";
//         const diff = Date.now() - new Date(dob).getTime();
//         return Math.abs(new Date(diff).getUTCFullYear() - 1970);
//     };

//     // if (!profile) return <p className="text-center mt-5">Loading profile...</p>;

//     return (
//         <DashboardLayout>
//             <div className="profile-page-content-custom">

//                 {/* HEADER */}
//                 <div className="profile-header-status-grid">
//                     <div className="profile-photo-column">
//                         <img
//                             src={profile?.photos?.[0] }
//                             alt={profile?.name}
//                             className="main-profile-photo"
//                         />
//                         <label className="add-photo-btn" style={{ cursor: "pointer" }}>
//                             Add/Edit Photo
//                             <input type="file" hidden accept="image/*" onChange={handlePhotoUpload} />
//                         </label>
//                     </div>

//                     <div className="profile-info-column">
//                         <h2 className="profile-name-header">{profile?.name}</h2>
//                         <p className="profile-id-text">Profile ID: {profile?._id}</p>

//                         <div className="profile-key-details">
//                             <span>{calculateAge(profile?.dob)} Yrs, {profile?.height}</span> |
//                             <span> {profile?.religion}, {profile?.gotra}</span> |
//                             <span> {profile?.occupation}</span>
//                         </div>

//                         <div className="profile-contact-info">
//                             <p>📞 {profile?.phone || "Not Available"}</p>
//                             <p>✉️ {profile?.email}</p>
//                         </div>
//                     </div>

//                     <div className="profile-paid-member-column">
//                         <div className="paid-member-cta-box">
//                             <h4 className="cta-title">BECOME A PAID MEMBER</h4>
//                             <p className="cta-discount text-start lh-1">Get **UPTO 20% OFF** on all membership!</p>
//                             <ul>
//                                 <li>✅ Unlimited messages</li>
//                                 <li>✅ Show full photos</li>
//                                 <li>✅ WhatsApp matches</li>
//                             </ul>
//                             <button className="see-membership-btn">See membership plans</button>
//                         </div>
//                     </div>
//                 </div>


//                 {/* GALLERY */}
//                 <div className="gallery-section mt-4">
//                     <div className="section-header-row">
//                         <h4 className="section-title-profile">Image Gallery</h4>

//                         <label className="edit-btn" style={{ cursor: "pointer" }}>
//                             {uploading ? "Uploading..." : "➕ Add More Photo"}
//                             <input type="file" hidden accept="image/*" onChange={handlePhotoUpload} />
//                         </label>
//                     </div>

//                     <div className="gallery-grid"
//                         style={{
//                             display: "grid",
//                             gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
//                             gap: "10px",
//                             marginTop: "12px",
//                         }}>
//                         {profile?.photos?.map((img, i) => (
//                             <img
//                                 key={i}
//                                 src={img}
//                                 alt="gallery"
//                                 style={{
//                                     width: "100%",
//                                     height: "120px",
//                                     objectFit: "cover",
//                                     borderRadius: "10px",
//                                     border: "1px solid #ddd",
//                                 }}
//                             />
//                         ))}
//                     </div>
//                 </div>


//                 {/* PERSONAL INFORMATION */}
//                 <ProfileSection title="Personal Information">
//                     <DetailItem label="Gender" value={profile?.gender} />
//                     <DetailItem label="Marital Status" value={profile?.maritalStatus} />
//                     <DetailItem label="Physical Status" value={profile?.physicalStatus} />
//                 </ProfileSection>


//                 {/* RELIGION & CULTURE */}
//                 <ProfileSection title="Religion & Culture">
//                     <DetailItem label="Religion" value={profile?.religion} />
//                     <DetailItem label="Gotra" value={profile?.gotra} />
//                     <DetailItem label="Mother Tongue" value={profile?.motherTongue} />
//                 </ProfileSection>


//                 {/* PROFESSIONAL DETAILS */}
//                 <ProfileSection title="Professional Information">
//                     <DetailItem label="Occupation" value={profile?.occupation} />
//                     <DetailItem label="Employment Type" value={profile?.employmentType} />
//                     <DetailItem label="Income" value={profile?.annualIncome} />
//                 </ProfileSection>


//                 {/* LOCATION */}
//                 <ProfileSection title="Location">
//                     <DetailItem label="City" value={profile?.location} />
//                 </ProfileSection>

//             </div>
//         </DashboardLayout>
//     );
// }







"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";

// ------------------ Detail Item ------------------
const DetailItem = ({ label, value }) => (
    <div className="profile-detail-item">
        <span className="detail-label">{label}:</span>
        <span className="detail-value">{value || "Not Available"}</span>
    </div>
);

// ------------------ Profile Section ------------------
const ProfileSection = ({ title, children, onEdit }) => (
    <div className="profile-edit-section position-relative">
        <div className="section-header-row ">
            <h4 className="section-title-profile ">{title}</h4>
            {onEdit && (
                <button onClick={onEdit} className="edit-btn">
                    <span role="img" aria-label="Edit"><i className="fa-solid fa-pen me-2"></i></span> Edit
                </button>
            )}
        </div>
        <div className="section-content-grid">{children}</div>
    </div>
);

// ------------------ Edit Modal ------------------
const EditModal = ({ open, onClose, fields, data, onSubmit }) => {
    const [form, setForm] = useState(data || {});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setForm(data);
    }, [data]);

    if (!open) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSave = () => {
        let newErrors = {};
        fields.forEach((field) => {
            if (!form[field] || form[field].toString().trim() === "") {
                newErrors[field] = "This field is required";
            }
        });
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            onSubmit(form);
        }
    };

    return (
        <div className="position-absolute top-0 left-0 right-0 d-flex align-items-center justify-content-center z-50 p-3 w-100 h-100">
            <div className="bg-white p-5 rounded-lg w-50 max-w-md shadow-lg overflow-auto max-h-[90vh] ">
                <h3 className="text-lg fw-bold mb-3">Edit Details</h3>

                {fields.map((field) => {
                    let inputType = "text";
                    if (["gender", "maritalStatus", "physicalStatus"].includes(field)) inputType = "select";
                    if (field === "dob") inputType = "date";

                    return (
                        <div key={field} className="mb-3 d-flex">
                            <label className="d-block text-sm font-medium mb-1 me-1" style={{ width: "105px" }}>{field}</label>
                            {inputType === "select" ? (
                                <select
                                    name={field}
                                    value={form[field] || ""}
                                    onChange={handleChange}
                                    className="border p-1 rounded w-full"
                                >
                                    <option value="">Select {field}</option>
                                    {field === "gender" && (
                                        <>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>

                                        </>
                                    )}
                                    {field === "maritalStatus" && (
                                        <>
                                            <option value="Never married">Never Married</option>
                                            <option value="Previously Married (Divorced)">Divorced</option>
                                            <option value="Previously Married (Widowed)">Widowed</option>
                                            <option value="Currently Separated">Separated</option>

                                        </>
                                    )}
                                    {field === "physicalStatus" && (
                                        <>
                                            <option value="Normal">Normal</option>
                                            <option value="Physically Challenged">Physically Challenged</option>

                                        </>
                                    )}
                                </select>
                            ) : (
                                <input
                                    type={inputType}
                                    name={field}
                                    value={form[field] || ""}
                                    onChange={handleChange}
                                    className="border p-2 rounded w-full"
                                />
                            )}
                            {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
                        </div>
                    );
                })}
                <div className="d-flex justify-content-end gap-2 mt-3">
                    <button onClick={onClose} className="px-3 py-2 bg-gray-300 rounded">Cancel</button>
                    <button onClick={handleSave} className="px-3 py-2 bg-[#D4AF37] text-white rounded">Save</button>
                </div>
            </div>
        </div>
    );
};

// ------------------ Photo Uploader ------------------
const PhotoUploader = ({ photos, onUpload, uploading }) => (
    <div className="profile-photo-column">
        <img
            src={photos?.[0] || "/dhakadweb/assets/images/dummy.png"}
            alt="profile"
            className="main-profile-photo"
        />
        <label className="add-photo-btn cursor-pointer inline-block">
            {photos?.length > 0 ? "Edit Photo" : "Add Photo"}
            <input type="file" hidden accept="image/*" onChange={onUpload} />
        </label>
    </div>
);

// ------------------ Profile Page ------------------
export default function ProfilePage() {
    const [token, setToken] = useState("");
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editFields, setEditFields] = useState([]);
    const [editSectionData, setEditSectionData] = useState({});
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setToken(localStorage.getItem("token") || "");
            setUser(JSON.parse(localStorage.getItem("user") || null));
        }
    }, []);

    const userId = user?._id;

    const fetchProfile = async () => {
        if (!userId) return;
        try {
            const res = await fetch(`http://143.110.244.163:5000/api/profile/own-profile/${userId}`, { headers: { Authorization: `Bearer ${token}` }, });
            const data = await res.json();
            setProfile(data.profile);
        } catch (err) { console.log(err); }
    };

    useEffect(() => { fetchProfile(); }, [userId]);

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);

        const formData = new FormData();
        formData.append("photo", file);

        try {
            const res = await fetch(`http://143.110.244.163:5000/api/upload/photo`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData
            });
            const data = await res.json();

            if (data?.url) {
                const updatedPhotos = [...(profile.photos || []), data.url];
                await fetch(`http://143.110.244.163:5000/api/profile/update`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ photos: updatedPhotos }),
                });
                setProfile((prev) => ({ ...prev, photos: updatedPhotos }));
            }
        } catch (err) { console.log(err); }
        setUploading(false);
    };

    const handleEdit = (fields) => {
    const sectionData = {};
    fields.forEach(f => sectionData[f] = profile[f] || "");
    setEditFields(fields);
    setEditSectionData(sectionData);
    setEditModalOpen(true);
};


    const saveProfileUpdate = async (updatedData) => {
        try {
            const res = await fetch(`http://143.110.244.163:5000/api/profile/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            });
            const data = await res.json();
            if (data.success) {
                alert("Profile Updated Successfully");
                setEditModalOpen(false);
                fetchProfile();
            }
        } catch (err) { console.log(err); }
    };

    const calculateAge = (dob) => {
        if (!dob) return "";
        const diff = Date.now() - new Date(dob).getTime();
        return Math.abs(new Date(diff).getUTCFullYear() - 1970);
    };

    if (!profile) return <p className="text-center mt-5">Loading profile...</p>;

    return (
        <DashboardLayout>
            <div className="profile-page-content-custom position-relative">

                <div className="profile-header-status-grid">
                    <PhotoUploader photos={profile.photos} onUpload={handlePhotoUpload} uploading={uploading} />

                    <div className="profile-info-column">
                        <h2>{profile.name}</h2>
                        <p>Profile ID: {profile._id}</p>
                        <p>{calculateAge(profile.dob)} yrs | {profile.religion} | {profile.occupation}</p>
                        {/* <p>📞 {profile.phone || "Not Available"} | ✉️ {profile.email}</p> */}
                    </div>
                </div>


                {/* GALLERY */}
                <div className="gallery-section mt-4">
                    <div className="section-header-row">
                        <h4 className="section-title-profile">Image Gallery</h4>

                        <label className="edit-btn d-inline-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
                            {uploading ? (
                                "Uploading..."
                            ) : (
                                <>
                                    <i className="fa-solid fa-plus"></i>
                                    Add More Photo
                                </>
                            )}
                            <input type="file" hidden accept="image/*" onChange={handlePhotoUpload} />
                        </label>
                    </div>

                    <div className="gallery-grid"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                            gap: "10px",
                            marginTop: "12px",
                        }}>
                        {profile?.photos?.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt="gallery"
                                style={{
                                    width: "100%",
                                    height: "120px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                    border: "1px solid #ddd",
                                }}
                            />
                        ))}
                    </div>
                </div>

                <ProfileSection title="Personal Information" onEdit={() => handleEdit(["gender", "maritalStatus", "physicalStatus"])}>
                    <DetailItem label="Gender" value={profile.gender} />
                    <DetailItem label="Marital Status" value={profile.maritalStatus} />
                    <DetailItem label="Physical Status" value={profile.physicalStatus} />
                </ProfileSection>

                <ProfileSection title="Religion & Culture" onEdit={() => handleEdit(["religion", "gotra", "motherTongue"])}>
                    <DetailItem label="Religion" value={profile.religion} />
                    <DetailItem label="Gotra" value={profile.gotra} />
                    <DetailItem label="Mother Tongue" value={profile.motherTongue} />
                </ProfileSection>

                <ProfileSection title="Professional Information" onEdit={() => handleEdit(["occupation", "employmentType", "annualIncome"])}>
                    <DetailItem label="Occupation" value={profile.occupation} />
                    <DetailItem label="Employment Type" value={profile.employmentType} />
                    <DetailItem label="Income" value={profile.annualIncome} />
                </ProfileSection>

                <ProfileSection title="Location" onEdit={() => handleEdit(["location"])}>
                    <DetailItem label="City" value={profile.location} />
                </ProfileSection>

                <EditModal
                    open={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    fields={editFields}
                    data={editSectionData}
                    onSubmit={saveProfileUpdate}
                />
            </div>
        </DashboardLayout>
    );
}
