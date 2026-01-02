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
    <div className="align-items-start py-3 border-bottom row">
      {/* Image */}
      <div className="col-lg-3 col-md-3 col-6">
        <div
          className="interest-image w-100 d-flex align-items-center justify-content-center"
          style={{ height: "200px", overflow: "hidden" }}
        >
          <img
            src={
              item?.photos?.[0] ||
              "/dhakadweb/assets/images/default-profile.png"
            }
            alt={item?.name}
            className="rounded w-100 h-100"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Details */}
      <div className="col-lg-6 col-md-6 col-6">
        <h4 className="mb-2 fw-semibold text-dark">{item?.name || "No Name"}</h4>

        <p className="text-muted small mb-4">
          City: <strong className="text-dark me-3">{item?.location || "N/A"}</strong>
          &bull; Age:
          <strong className="text-dark mx-2">{calculateAge(item?.dob)} Yrs</strong>
          &bull; Job:
          <strong className="text-dark ms-2">{item?.occupation || "N/A"}</strong>
        </p>

        <Link
          href={`/profiledetail/${item?._id}`}
          className="btn btn-sm rounded-3 fw-medium py-1 px-2 text-decoration-none text-black"
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
        <h4 className="fw-semibold">New Matches</h4>

        <div className="card shadow-sm p-4">
          {loading ? (
            <p className="text-center py-5 text-muted">Loading...</p>
          ) : profiles.length > 0 ? (
            profiles.map((item) => <ViewedCard key={item._id} item={item} />)
          ) : (
            <p className="text-center py-5 text-muted">
              No profile found in recently viewed.
            </p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
