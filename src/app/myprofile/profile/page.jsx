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
//                 ✏️ Edit
//             </button>
//         </div>
//         <div className="section-content-grid">{children}</div>
//     </div>
// );

// export default function ProfilePage() {
//     const [profile, setProfile] = useState(null);

//     const userId =
//         typeof window !== "undefined"
//             ? JSON.parse(sessionStorage.getItem("user"))?._id
//             : null;

//     useEffect(() => {
//         if (!userId) return;

//         const fetchProfile = async () => {
//             try {
//                 const res = await fetch(
//                     `http://206.189.130.102:5000/api/profile/${userId}`
//                 );
//                 const data = await res.json();
//                 setProfile(data.profile);
//             } catch (error) {
//                 console.log("Profile fetch error:", error);
//             }
//         };

//         fetchProfile();
//     }, [userId]);

//     const calculateAge = (dob) => {
//         if (!dob) return "";
//         const diff = Date.now() - new Date(dob).getTime();
//         return Math.abs(new Date(diff).getUTCFullYear() - 1970);
//     };

//     if (!profile) return <p className="text-center mt-5">Loading profile...</p>;

//     return (
//         <DashboardLayout>
//             <div className="profile-page-content-custom">
//                 <div className="profile-header-status-grid">

//                     <div className="profile-photo-column">
//                         <img
//                             src={profile?.photos?.[0] || "/no-image.png"}
//                             alt={profile?.name}
//                             className="main-profile-photo"
//                         />
//                         <button className="add-photo-btn">Add/Edit Photo</button>
//                     </div>

//                     <div className="profile-info-column">
//                         <h2 className="profile-name-header">{profile?.name}</h2>
//                         <p className="profile-id-text">Profile ID: {profile?._id}</p>

//                         <div className="profile-key-details">
//                             <span>
//                                 {calculateAge(profile?.dob)} Yrs, {profile?.height}
//                             </span>{" "}
//                             | <span>{profile?.religion}, {profile?.gotra}</span> |
//                             <span>{profile?.occupation}</span>
//                         </div>

//                         <div className="profile-contact-info">
//                             <p>📞 Not Available</p>
//                             <p>✉️ {profile?.email}</p>
//                         </div>
//                     </div>

//                     <div className="profile-paid-member-column">
//                         <div className="paid-member-cta-box">
//                             <h4 className="cta-title">BECOME A PAID MEMBER</h4>
//                             <p className="cta-discount text-start lh-1">
//                                 Get **UPTO 20% OFF** on all membership!
//                             </p>
//                             <ul>
//                                 <li>✅ Edit WhatsApp matches</li>
//                                 <li>✅ Unlimited messages</li>
//                                 <li>✅ Show full photos</li>
//                             </ul>
//                             <button className="see-membership-btn">
//                                 See membership plans
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* BASIC DETAILS */}
//                 <ProfileSection title="Basic Details">
//                     <DetailItem label="Full Name" value={profile?.name} />
//                     <DetailItem label="Age" value={`${calculateAge(profile?.dob)} Years`} />
//                     <DetailItem label="Gender" value={profile?.gender} />
//                     <DetailItem label="Height" value={profile?.height} />
//                     <DetailItem label="Marital Status" value={profile?.maritalStatus} />
//                     <DetailItem label="Physical Status" value={profile?.physicalStatus} />
//                 </ProfileSection>

//                 {/* RELIGION DETAILS */}
//                 <ProfileSection title="Religion Information">
//                     <DetailItem label="Religion" value={profile?.religion} />
//                     <DetailItem label="Caste" value={"Dhakad"} />
//                     <DetailItem label="Gotra" value={profile?.gotra} />
//                     <DetailItem label="Mother Tongue" value={profile?.motherTongue} />
//                 </ProfileSection>

//                 {/* LOCATION */}
//                 <ProfileSection title="Location Information">
//                     <DetailItem label="City" value={profile?.location} />
//                 </ProfileSection>

//                 {/* PROFESSION */}
//                 <ProfileSection title="Professional Information">
//                     <DetailItem label="Occupation" value={profile?.occupation} />
//                     <DetailItem label="Employment Type" value={profile?.employmentType} />
//                     <DetailItem label="Annual Income" value={profile?.annualIncome} />
//                     <DetailItem label="Family Status" value={profile?.familyStatus} />
//                 </ProfileSection>

//             </div>
//         </DashboardLayout>
//     );
// }





"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";

const DetailItem = ({ label, value }) => (
    <div className="profile-detail-item">
        <span className="detail-label">{label}:</span>
        <span className="detail-value">{value || "Not Available"}</span>
    </div>
);

const ProfileSection = ({ title, children }) => (
    <div className="profile-edit-section">
        <div className="section-header-row">
            <h4 className="section-title-profile">{title}</h4>
            <button className="edit-btn">
                <span role="img" aria-label="Edit">✏️</span> Edit
            </button>
        </div>
        <div className="section-content-grid">{children}</div>
    </div>
);

export default function ProfilePage() {
    const [token, setToken] = useState("");
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedToken = sessionStorage.getItem("token");
            const savedUser = sessionStorage.getItem("user");

            if (savedToken) setToken(savedToken);
            if (savedUser) setUser(JSON.parse(savedUser));
        }
    }, []);

    const userId =
        typeof window !== "undefined"
            ? JSON.parse(sessionStorage.getItem("user"))?._id
            : null;

    // Load profile
    const fetchProfile = async () => {
        try {
            const res = await fetch(
                `http://206.189.130.102:5000/api/profile/${userId}`
            );
            const data = await res.json();
            setProfile(data.profile);
        } catch (error) {
            console.log("Profile fetch error:", error);
        }
    };

    useEffect(() => {
        if (userId) fetchProfile();
    }, [userId]);


    /** 📌 Handle Photo Upload */
    const handlePhotoUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploading(true);

        const formData = new FormData();
        formData.append("photo", file);

        try {
            const res = await fetch(
                `http://206.189.130.102:5000/api/upload/photo`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            const data = await res.json();

            if (data?.url) {
                const updatedPhotos = [...profile.photos, data.url];

                await fetch(`http://206.189.130.102:5000/api/profile/${userId}`, {
                    // method: "PUT",
                    // headers: {
                    //     "Content-Type": "application/json",
                    //     Authorization: `Bearer ${token}`,
                    // },
                    body: JSON.stringify({ photos: updatedPhotos }),
                });

                setProfile((prev) => ({ ...prev, photos: updatedPhotos }));
            }
        } catch (error) {
            console.log("Upload Error:", error);
        }

        setUploading(false);
    };


    const calculateAge = (dob) => {
        if (!dob) return "";
        const diff = Date.now() - new Date(dob).getTime();
        return Math.abs(new Date(diff).getUTCFullYear() - 1970);
    };

    if (!profile) return <p className="text-center mt-5">Loading profile...</p>;

    return (
        <DashboardLayout>
            <div className="profile-page-content-custom">

                {/* HEADER */}
                <div className="profile-header-status-grid">
                    <div className="profile-photo-column">
                        <img
                            src={profile.photos?.[0] || "/no-image.png"}
                            alt={profile?.name}
                            className="main-profile-photo"
                        />
                        <label className="add-photo-btn" style={{ cursor: "pointer" }}>
                            Add/Edit Photo
                            <input type="file" hidden accept="image/*" onChange={handlePhotoUpload} />
                        </label>
                    </div>

                    <div className="profile-info-column">
                        <h2 className="profile-name-header">{profile?.name}</h2>
                        <p className="profile-id-text">Profile ID: {profile?._id}</p>

                        <div className="profile-key-details">
                            <span>{calculateAge(profile?.dob)} Yrs, {profile?.height}</span> |
                            <span> {profile?.religion}, {profile?.gotra}</span> |
                            <span> {profile?.occupation}</span>
                        </div>

                        <div className="profile-contact-info">
                            <p>📞 {profile?.phone || "Not Available"}</p>
                            <p>✉️ {profile?.email}</p>
                        </div>
                    </div>

                    <div className="profile-paid-member-column">
                        <div className="paid-member-cta-box">
                            <h4 className="cta-title">BECOME A PAID MEMBER</h4>
                            <p className="cta-discount text-start lh-1">Get **UPTO 20% OFF** on all membership!</p>
                            <ul>
                                <li>✅ Unlimited messages</li>
                                <li>✅ Show full photos</li>
                                <li>✅ WhatsApp matches</li>
                            </ul>
                            <button className="see-membership-btn">See membership plans</button>
                        </div>
                    </div>
                </div>


                {/* GALLERY */}
                <div className="gallery-section mt-4">
                    <div className="section-header-row">
                        <h4 className="section-title-profile">Image Gallery</h4>

                        <label className="edit-btn" style={{ cursor: "pointer" }}>
                            {uploading ? "Uploading..." : "➕ Add More Photo"}
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
                        {profile.photos?.map((img, i) => (
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


                {/* PERSONAL INFORMATION */}
                <ProfileSection title="Personal Information">
                    <DetailItem label="Gender" value={profile?.gender} />
                    <DetailItem label="Marital Status" value={profile?.maritalStatus} />
                    <DetailItem label="Physical Status" value={profile?.physicalStatus} />
                </ProfileSection>


                {/* RELIGION & CULTURE */}
                <ProfileSection title="Religion & Culture">
                    <DetailItem label="Religion" value={profile?.religion} />
                    <DetailItem label="Gotra" value={profile?.gotra} />
                    <DetailItem label="Mother Tongue" value={profile?.motherTongue} />
                </ProfileSection>


                {/* PROFESSIONAL DETAILS */}
                <ProfileSection title="Professional Information">
                    <DetailItem label="Occupation" value={profile?.occupation} />
                    <DetailItem label="Employment Type" value={profile?.employmentType} />
                    <DetailItem label="Income" value={profile?.annualIncome} />
                </ProfileSection>


                {/* LOCATION */}
                <ProfileSection title="Location">
                    <DetailItem label="City" value={profile?.location} />
                </ProfileSection>

            </div>
        </DashboardLayout>
    );
}
