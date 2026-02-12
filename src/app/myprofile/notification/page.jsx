"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_URL = "http://143.110.244.163:5000/api";

function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "min", seconds: 60 },
  ];

  for (const i of intervals) {
    const count = Math.floor(seconds / i.seconds);
    if (count >= 1) return `${count} ${i.label}${count > 1 ? "s" : ""} ago`;
  }
  return "just now";
}

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotifications(res.data.notifications || []);
    } catch (err) {
      console.error("Notification fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <DashboardLayout>
      <div className="notification-page-content">
        <h3 className="page-header-title mb-4">Today</h3>

        {loading && <p>Loading notifications...</p>}

        {!loading && notifications.length === 0 && (
          <div className="alert alert-light text-center">
            No notifications yet
          </div>
        )}

        <div className="row">
          {notifications.map((n) => (
            <div className="col-lg-6 col-md-6 col-12 mb-3" key={n._id}>
              <div className="card p-2">
                <div className="row">
                  <div className="col-8">
                    <div className="image-text d-flex align-items-center">
                      <div className="image">
                        <img
                          src={
                            n.senderPhoto ||
                            "/dhakadweb/assets/images/default-user.png"
                          }
                          alt="profile"
                          style={{
                            height: "70px",
                            width: "70px",
                            objectFit: "cover",
                          }}
                          className="rounded-circle"
                        />
                      </div>

                      <div className="ms-3 text">
                        <h6 className="fw-semibold mb-0">
                          {n.sender?.name || "Someone"}
                        </h6>
                        <p className="mb-0">Viewed your profile</p>
                        <p className="mb-0 text-muted">
                          {timeAgo(n.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-4 d-flex align-items-start justify-content-end">
                    <button
                      className="rounded-3 px-2 py-1 btn btn-outline-danger"
                      onClick={() =>
                        router.push(`/profiledetail/${n.senderProfileId}`)
                      }
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
