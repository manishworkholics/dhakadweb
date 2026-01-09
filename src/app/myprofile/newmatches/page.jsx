"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://143.110.244.163:5000/api";

// ----------- Profile Card Component ----------
const ViewedCard = ({ item }) => {
  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    return new Date().getFullYear() - new Date(dob).getFullYear();
  };

  return (
    <div className="align-items-start py-3 row">
      {/* Image */}
      <div className="col-lg-6 col-md-6 col-12">
        <div
          className="interest-image w-100 d-flex align-items-center justify-content-center position-relative"
          style={{ height: "200px", overflow: "hidden", borderRadius: "12px" }}
        >
          {/* Blurred Background */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${item?.photos?.[0] || "/dhakadweb/assets/images/default-profile.png"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(15px)",
              transform: "scale(1.1)",
              zIndex: 1,
            }}
          >
            {/* Optional Dark Overlay for contrast */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.15)",
              }}
            ></div>
          </div>

          {/* Main Profile Image */}
          <img
            src={item?.photos?.[0] || "/dhakadweb/assets/images/default-profile.png"}
            alt={item?.name || "Profile"}
            className="rounded w-100 h-100 position-relative"
            style={{ objectFit: "contain", zIndex: 2 }}
          />
        </div>

      </div>

      {/* Details */}
      <div className="col-lg-6 col-md-6 col-12">
        <h4 className="mb-2 fw-semibold text-dark">{item?.name || "No Name"}</h4>

        <p className="text-muted small mb-1">
          City: <strong className="text-dark me-3">{item?.location || "N/A"}</strong></p>
        <p className="mb-1"> Age:
          <strong className="text-dark mx-2">{calculateAge(item?.dob)} Yrs</strong>
        </p>
        <p className="mb-3"> Job:
          <strong className="text-dark ms-2">{item?.occupation || "N/A"}</strong>
        </p>

        <Link
          href={`/profiledetail/${item?._id}`}
          className="btn short-btn rounded-3 fw-medium py-2 px-3 text-decoration-none"
          style={{ border: "1px solid #BABABA" }}
        >
          View full profile
        </Link>
      </div>
    </div>
  );
};

// ---------- MAIN COMPONENT ----------
export default function NewMatches() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchViewedProfiles = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(`${API_URL}/viewed/viewed`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setProfiles(res.data.profiles);   // <-- Correct mapping
      }
    } catch (err) {
      toast.error("Failed to fetch recently viewed profiles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchViewedProfiles();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-4">
        <h4 className="fw-semibold mb-4">New Matches</h4>

        <div className="row g-4">
          {loading ? (
            <div className="col-12">
              <p className="text-center py-5 text-muted">Loading...</p>
            </div>
          ) : profiles.length > 0 ? (
            profiles.map((item) => (
              <div key={item._id} className="col-lg-6 col-md-6 col-12">
                {/* Add margin-bottom to each card */}
                <div className="card p-3 h-100 rounded-3 short-card">
                  <ViewedCard key={item._id} item={item} />
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <p className="text-center py-5 text-muted">
                No profile found in new matches.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
