"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import axios from "axios";
import { toast } from "react-toastify";

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
        typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

    const [loading, setLoading] = useState(false);
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
            const res = await fetch(`${API_URL}/location/states`);
            const data = await res.json();
            setStates(data || []);
        } catch (err) {
            console.error(err);
        }
    };

    /* ================= FETCH CITIES ================= */
    const fetchCities = async (state) => {
        if (!state) return;
        const res = await axios.get(`${API_URL}/location/cities/${state}`);
        setCities((prev) => [
            ...new Set([...prev, ...(res.data.cities || [])]),
        ]);
    };

    /* ================= GET MY PREFERENCE ================= */
    const fetchPreference = async () => {
        try {
            const res = await axios.get(`${API_URL}/partner-preference/my`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data.preference) {
                setForm(res.data.preference);

                // preload cities for saved states
                for (const state of res.data.preference.preferredState || []) {
                    await fetchCities(state);
                }
            }
        } catch {
            console.log("No preference found");
        }
    };

    useEffect(() => {
        fetchStates();
        fetchPreference();
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
            if (res.data.success) toast.success("Partner preference saved");
        } catch {
            toast.error("Failed to save preference");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Delete partner preference?")) return;

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
    };

    return (
        <DashboardLayout>
            <div className="card p-4">
                <h5 className="fw-semibold mb-4">Partner Preferences</h5>

                {/* BASIC */}
                <div className="row mb-3">
                    <div className="col-md-3">
                        <label>Age From</label>
                        <input name="ageFrom" value={form.ageFrom} onChange={handleInputChange} className="form-control" />
                    </div>
                    <div className="col-md-3">
                        <label>Age To</label>
                        <input name="ageTo" value={form.ageTo} onChange={handleInputChange} className="form-control" />
                    </div>
                    <div className="col-md-3">
                        <label>Height From</label>
                        <input name="heightFrom" value={form.heightFrom} onChange={handleInputChange} className="form-control" />
                    </div>
                    <div className="col-md-3">
                        <label>Height To</label>
                        <input name="heightTo" value={form.heightTo} onChange={handleInputChange} className="form-control" />
                    </div>
                </div>

                {/* RELIGION */}
                <div className="row mb-3">
                    <div className="col-md-4">
                        <label>Religion</label>
                        <input name="religion" value={form.religion} onChange={handleInputChange} className="form-control" />
                    </div>
                    <div className="col-md-4">
                        <label>Caste</label>
                        <input name="caste" value={form.caste} onChange={handleInputChange} className="form-control" />
                    </div>
                    <div className="col-md-4">
                        <label>Mother Tongue</label>
                        <input name="motherTongue" value={form.motherTongue} onChange={handleInputChange} className="form-control" />
                    </div>
                </div>

                {/* CHECKBOXES */}
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

                {/* SELECTED VIEW */}
                <SelectedTags label="Selected States" items={form.preferredState} onRemove={handleRemoveState} />
                <SelectedTags label="Selected Cities" items={form.preferredCity} onRemove={handleRemoveCity} />

                {/* ACTIONS */}
                <div className="d-flex gap-3">
                    <button className="btn btn-danger px-4" onClick={handleSave} disabled={loading}>
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
