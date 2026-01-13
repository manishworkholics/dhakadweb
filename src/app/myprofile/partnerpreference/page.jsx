"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://143.110.244.163:5000/api";

/* ================= TAG VIEW ================= */
const SelectedTags = ({ label, items, onRemove }) => {
  if (!items.length) return null;

  return (
    <div className="mb-3">
      <label className="form-label fw-semibold">{label}</label>
      <div className="d-flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="badge bg-primary d-flex align-items-center gap-2"
            style={{ fontSize: "14px" }}
          >
            {item}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => onRemove(item)}
            >
              ✕
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

/* ================= CHECKBOX GROUP ================= */
const CheckboxGroup = ({ label, name, options, value, onChange }) => (
  <div className="mb-3">
    <label className="form-label fw-semibold">{label}</label>
    <div className="d-flex flex-wrap gap-3">
      {options.map((opt) => (
        <div className="form-check" key={opt}>
          <input
            type="checkbox"
            className="form-check-input"
            checked={value.includes(opt)}
            onChange={() => onChange(name, opt)}
          />
          <label className="form-check-label">{opt}</label>
        </div>
      ))}
    </div>
  </div>
);

export default function PartnerPreferencePage() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [form, setForm] = useState({
    ageFrom: "",
    ageTo: "",
    heightFrom: "",
    heightTo: "",
    religion: "",
    caste: "",
    motherTongue: "",
    maritalStatus: [],
    educationDetails: [],
    employmentType: [],
    preferredState: [],
    preferredCity: [],
  });

  /* ================= FETCH STATES ================= */
  const fetchStates = async () => {
    try {
      const res = await axios.get(`${API_URL}/location/states`);
      setStates(res.data || []);
    } catch {
      toast.error("Failed to load states");
    }
  };

  /* ================= FETCH CITIES ================= */
  const fetchCities = async (state) => {
    if (!state) return;
    try {
      const res = await axios.get(`${API_URL}/location/cities/${state}`);
      setCities((prev) =>
        Array.from(new Set([...prev, ...(res.data.cities || [])]))
      );
    } catch {
      toast.error("Failed to load cities");
    }
  };

  /* ================= GET MY PREFERENCE ================= */
  const fetchPreference = async () => {
    try {
      const res = await axios.get(`${API_URL}/partner-preference/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.preference) {
        setForm(res.data.preference);

        for (const state of res.data.preference.preferredState || []) {
          await fetchCities(state);
        }
      }
    } catch {
      console.log("No preference found");
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchStates();
      await fetchPreference();
      setPageLoading(false);
    };
    init();
  }, []);

  /* ================= HANDLERS ================= */
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleAddState = async (state) => {
    if (!state || form.preferredState.includes(state)) return;

    setForm((prev) => ({
      ...prev,
      preferredState: [...prev.preferredState, state],
    }));

    await fetchCities(state);
  };

  const handleRemoveState = (state) => {
    setForm((prev) => ({
      ...prev,
      preferredState: prev.preferredState.filter((s) => s !== state),
    }));
  };

  const handleAddCity = (city) => {
    if (!city || form.preferredCity.includes(city)) return;

    setForm((prev) => ({
      ...prev,
      preferredCity: [...prev.preferredCity, city],
    }));
  };

  const handleRemoveCity = (city) => {
    setForm((prev) => ({
      ...prev,
      preferredCity: prev.preferredCity.filter((c) => c !== city),
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${API_URL}/partner-preference/save`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) toast.success("Partner preference saved successfully");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save preference");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete partner preference?")) return;

    try {
      await axios.delete(`${API_URL}/partner-preference/delete`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Preference cleared");
      setForm({
        ageFrom: "",
        ageTo: "",
        heightFrom: "",
        heightTo: "",
        religion: "",
        caste: "",
        motherTongue: "",
        maritalStatus: [],
        educationDetails: [],
        employmentType: [],
        preferredState: [],
        preferredCity: [],
      });
      setCities([]);
    } catch {
      toast.error("Failed to clear preference");
    }
  };

  return (
    <DashboardLayout>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* PAGE LOADER */}
      {pageLoading && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-white d-flex justify-content-center align-items-center" style={{ zIndex: 9999 }}>
          <div className="spinner-border text-warning"></div>
        </div>
      )}

      <div className="card p-4">
        <h5 className="fw-semibold mb-4">Partner Preferences</h5>

        {/* BASIC */}
        <div className="row mb-3">
          {["ageFrom", "ageTo", "heightFrom", "heightTo"].map((f) => (
            <div className="col-md-3" key={f}>
              <label className="text-capitalize">{f.replace(/([A-Z])/g, " $1")}</label>
              <input
                type="number"
                name={f}
                value={form[f]}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
          ))}
        </div>

        {/* RELIGION */}
        <div className="row mb-3">
          {["religion", "caste", "motherTongue"].map((f) => (
            <div className="col-md-4" key={f}>
              <label className="text-capitalize">{f}</label>
              <input
                name={f}
                value={form[f]}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
          ))}
        </div>

        <CheckboxGroup
          label="Marital Status"
          name="maritalStatus"
          options={["Never married", "Widower", "Divorced"]}
          value={form.maritalStatus}
          onChange={handleCheckboxChange}
        />

        <CheckboxGroup
          label="Education"
          name="educationDetails"
          options={["Graduate", "Post Graduate", "PhD"]}
          value={form.educationDetails}
          onChange={handleCheckboxChange}
        />

        <CheckboxGroup
          label="Employment Type"
          name="employmentType"
          options={["Private", "Govt", "Business"]}
          value={form.employmentType}
          onChange={handleCheckboxChange}
        />

        {/* LOCATION */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Select State</label>
            <select className="form-select" onChange={(e) => handleAddState(e.target.value)}>
              <option value="">Select State</option>
              {states.map((s) => (
                <option key={s._id} value={s.state}>{s.state}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label>Select City</label>
            <select className="form-select" onChange={(e) => handleAddCity(e.target.value)}>
              <option value="">Select City</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <SelectedTags label="Selected States" items={form.preferredState} onRemove={handleRemoveState} />
        <SelectedTags label="Selected Cities" items={form.preferredCity} onRemove={handleRemoveCity} />

        <div className="d-flex gap-3 mt-3">
          <button className="btn btn-warning px-4 text-white" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Preferences"}
          </button>
          <button className="btn btn-outline-secondary px-4" onClick={handleDelete}>
            Clear
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
