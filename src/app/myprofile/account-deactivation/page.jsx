"use client";

import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/Layout/DashboardLayout";
import { buildApiUrl } from "@/lib/api";

const STATUS_STYLES = {
  pending: {
    badge: "bg-warning-subtle text-warning border border-warning-subtle",
    title: "Request under review",
    description:
      "Your deactivation request has been submitted and is currently pending review.",
  },
  approved: {
    badge: "bg-success-subtle text-success border border-success-subtle",
    title: "Request approved",
    description: "Your deactivation request has been approved.",
  },
  rejected: {
    badge: "bg-danger-subtle text-danger border border-danger-subtle",
    title: "Request not approved",
    description:
      "Your previous request was not approved. You can submit a fresh reason below.",
  },
};

const INITIAL_FORM = {
  reason: "",
};

export default function AccountDeactivationPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("usertoken") : null;

  const fetchDeactivationStatus = useCallback(async () => {
    if (!token) {
      setError("Please login again to continue.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.get(buildApiUrl("/api/user/deactivate-request"), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.success) {
        setStatusData(res.data.data || null);
      }
    } catch (err) {
      if (err?.response?.status !== 404) {
        setError(
          err?.response?.data?.message ||
            "Unable to fetch your deactivation request status."
        );
      }
      setStatusData(null);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchDeactivationStatus();
  }, [fetchDeactivationStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reason = form.reason.trim();
    if (!reason) {
      setError("Please share a reason before submitting.");
      return;
    }

    if (!token) {
      setError("Please login again to continue.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setSuccessMessage("");

      const res = await axios.post(
        buildApiUrl("/api/user/deactivate-request"),
        { reason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data?.success) {
        setSuccessMessage(
          res.data.message || "Deactivation request submitted successfully."
        );
        setForm(INITIAL_FORM);
        await fetchDeactivationStatus();
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to submit your deactivation request."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const activeStatus = statusData?.status?.toLowerCase();
  const statusMeta = STATUS_STYLES[activeStatus] || STATUS_STYLES.pending;
  const canSubmitNewRequest = !statusData || activeStatus === "rejected";

  return (
    <DashboardLayout>
      <div className="container-fluid px-0">
        <div className="row g-4">
          <div className="col-12">
            <div
              className="rounded-4 border-0 shadow-sm p-4 p-lg-5"
              style={{
                background:
                  "linear-gradient(135deg, #fff9ef 0%, #ffffff 55%, #f8f4ea 100%)",
              }}
            >
              <div className="d-flex flex-column flex-lg-row justify-content-between gap-4">
                <div>
                  <span
                    className="d-inline-flex align-items-center rounded-pill px-3 py-2 mb-3 fw-semibold"
                    style={{ backgroundColor: "#f6ead1", color: "#8a6a18" }}
                  >
                    Account Deactivation
                  </span>
                  <h2 className="fw-bold mb-2" style={{ color: "#2f2418" }}>
                    Take a pause without losing your request history
                  </h2>
                  <p className="mb-0 text-muted" style={{ maxWidth: "720px" }}>
                    Submit a deactivation request if you want to temporarily step
                    away from Dhakad Matrimony. Our team can review it and keep
                    your account status updated here.
                  </p>
                </div>

                <div
                  className="rounded-4 p-3 p-lg-4"
                  style={{
                    minWidth: "260px",
                    backgroundColor: "#2f2418",
                    color: "#fff7e7",
                  }}
                >
                  <div className="small text-uppercase opacity-75 mb-2">
                    What happens next
                  </div>
                  <div className="fw-semibold mb-2">Review by support team</div>
                  <div className="small opacity-75">
                    Once you submit the reason, the latest request status will
                    appear below automatically.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                  <div>
                    <h4 className="fw-semibold mb-1">Current request status</h4>
                    <p className="text-muted mb-0">
                      We fetch your latest deactivation request here.
                    </p>
                  </div>
                  {statusData?.status ? (
                    <span
                      className={`rounded-pill px-3 py-2 text-capitalize small fw-semibold ${statusMeta.badge}`}
                    >
                      {statusData.status}
                    </span>
                  ) : (
                    <span className="rounded-pill px-3 py-2 small fw-semibold bg-light text-dark border">
                      No request
                    </span>
                  )}
                </div>

                {loading ? (
                  <div className="text-muted">Loading request status...</div>
                ) : statusData ? (
                  <div>
                    <div
                      className="rounded-4 p-3 mb-3"
                      style={{ backgroundColor: "#faf6ee" }}
                    >
                      <h5 className="fw-semibold mb-1">{statusMeta.title}</h5>
                      <p className="text-muted mb-0">{statusMeta.description}</p>
                    </div>

                    <div className="mb-3">
                      <div className="small text-muted mb-1">Reason submitted</div>
                      <div className="fw-medium">{statusData.reason || "-"}</div>
                    </div>

                    <div className="row g-3">
                      <div className="col-sm-6">
                        <div className="small text-muted mb-1">Requested on</div>
                        <div className="fw-medium">
                          {statusData.requestedAt
                            ? new Date(statusData.requestedAt).toLocaleString()
                            : "-"}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="small text-muted mb-1">Last updated</div>
                        <div className="fw-medium">
                          {statusData.updatedAt
                            ? new Date(statusData.updatedAt).toLocaleString()
                            : "-"}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="rounded-4 p-3"
                    style={{ backgroundColor: "#faf6ee" }}
                  >
                    <h5 className="fw-semibold mb-1">No active request found</h5>
                    <p className="text-muted mb-0">
                      You have not submitted any account deactivation request yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h4 className="fw-semibold mb-1">Submit deactivation request</h4>
                <p className="text-muted mb-4">
                  Tell us why you want to deactivate the account. A short, clear
                  reason is enough.
                </p>

                {error ? (
                  <div className="alert alert-danger rounded-4" role="alert">
                    {error}
                  </div>
                ) : null}

                {successMessage ? (
                  <div className="alert alert-success rounded-4" role="alert">
                    {successMessage}
                  </div>
                ) : null}

                {!canSubmitNewRequest ? (
                  <div
                    className="rounded-4 p-3 mb-3"
                    style={{ backgroundColor: "#fff4de", color: "#7a5b15" }}
                  >
                    A request is already in progress. You can submit a new one if
                    the current request is rejected.
                  </div>
                ) : null}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="deactivation-reason" className="form-label fw-medium">
                      Reason
                    </label>
                    <textarea
                      id="deactivation-reason"
                      className="form-control rounded-4 p-3"
                      rows={7}
                      placeholder="I want to stop using this account for now"
                      value={form.reason}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, reason: e.target.value }))
                      }
                      disabled={!canSubmitNewRequest || submitting}
                    />
                  </div>

                  <div className="d-flex flex-column flex-sm-row gap-3 align-items-sm-center justify-content-between">
                    <div className="small text-muted">
                      Your request will be submitted securely with your logged-in
                      account token.
                    </div>
                    <button
                      type="submit"
                      className="btn text-white px-4 py-2 rounded-pill fw-semibold"
                      style={{ backgroundColor: "#d4af37", minWidth: "220px" }}
                      disabled={!canSubmitNewRequest || submitting}
                    >
                      {submitting ? "Submitting..." : "Submit Request"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
