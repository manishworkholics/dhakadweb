"use client";

import Link from "next/link";
import Header from "../components/Header/Page";
import { useState, useEffect } from "react";
import Readytomeet from "../components/Readytomeet/page";
import Footer from "../components/Footer/page";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


export default function Profile() {
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.replace("/login");
        }
    }, []);

    const [token, setToken] = useState("");
    const [user, setUser] = useState(null);

    // Detect if screen is mobile
    const [isMobile, setIsMobile] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedToken = localStorage.getItem("token");
            const savedUser = localStorage.getItem("user");

            if (savedToken) setToken(savedToken);
            if (savedUser) setUser(JSON.parse(savedUser));

            const handleResize = () => setIsMobile(window.innerWidth < 768);
            handleResize(); // initial check
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    const [filterOptions, setFilterOptions] = useState({
        religions: [],
        locations: [],
        education: [],
        occupations: []
    });

    const [page, setPage] = useState(1);
    const limit = 9;
    const [totalPages, setTotalPages] = useState(1);

    const getFilterOptions = async () => {
        try {
            const res = await fetch("http://143.110.244.163:5000/api/profile/filters");
            const result = await res.json();
            if (result.success) setFilterOptions(result.filters);
        } catch (err) {
            console.log("Filter fetch error", err);
        }
    };

    const [search, setSearch] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFilters(prev => ({ ...prev, search }));
        }, 400);
        return () => clearTimeout(timeout);
    }, [search]);

    const [filters, setFilters] = useState({
        gender: "",
        age: "",
        religion: "",
        location: "",
        education: "",
        profession: "",
        sortBy: ""
    });

    const [data, setData] = useState([]);

    const getAllProfile = () => {
        const { age } = filters;
        const ageObj = ageRangeToQuery(age);
        const params = new URLSearchParams();

        Object.keys(filters).forEach((key) => {
            if (!filters[key] || key === "age") return;
            params.append(key, filters[key]);
        });

        if (ageObj.ageMin) params.append("ageMin", ageObj.ageMin);
        if (ageObj.ageMax) params.append("ageMax", ageObj.ageMax);

        params.append("userId", user?._id);
        params.append("page", page);
        params.append("limit", limit);

        fetch(`http://143.110.244.163:5000/api/profile/profiles?${params.toString()}`)
            .then((res) => res.json())
            .then((result) => {
                setData(result?.profiles || []);
                setTotalPages(Math.ceil((result?.total || 0) / limit));
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getFilterOptions();
        getAllProfile();
    }, []);

    useEffect(() => {
        setPage(1);
    }, [filters]);

    useEffect(() => {
        getAllProfile();
    }, [filters, page]);

    const ageRangeToQuery = (ageRange) => {
        if (!ageRange) return {};
        const map = {
            "18-25": { ageMin: 18, ageMax: 25 },
            "26-30": { ageMin: 26, ageMax: 30 },
            "31-35": { ageMin: 31, ageMax: 35 },
            "36-40": { ageMin: 36, ageMax: 40 },
            "41-50": { ageMin: 41, ageMax: 50 },
            "50+": { ageMin: 51, ageMax: 100 }
        };
        return map[ageRange] || {};
    };





    return (
        <main>
            <Header />
            <div className="sub-bg">
                <h4 className="text-white p-4 text-center font-bold mb-0 pageheading-banner fw-semibold">
                    Lakhs of Happy Marriages
                </h4>
            </div>

            <div className="container-fluid content bg-FDFBF7">
                <div className="container">
                    <div className="row py-4">

                        {/* ===== MOBILE FILTER BUTTON ===== */}
                        {isMobile && (
                            <div className="d-md-none d-lg-none d-block text-end mb-2">
                                <button
                                    className="btn btn-outline-danger rounded-circle"
                                    onClick={() => setShowFilters(true)}
                                >
                                    <i className="fa-solid fa-filter"></i>
                                </button>
                            </div>
                        )}

                        {/* ===== LEFT FILTER ===== */}
                        <div className="col-md-3 col-lg-3 col-12 mt-lg-5 mt-md-0 mt-0">
                            <div
                                className="card"
                                style={isMobile ? {
                                    position: "fixed",
                                    top: "260px",
                                    right: 0,
                                    width: "85%",            // like Bootstrap offcanvas
                                    height: "100vh",
                                    zIndex: 1050,
                                    padding: "20px",
                                    overflowY: "auto",
                                    background: "white",
                                    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                                    transform: showFilters ? "translateX(0)" : "translateX(100%)",
                                    transition: "transform 0.3s ease-in-out"
                                } : { width: "100%" }}
                            >
                                {/* Close button only on mobile */}
                                {isMobile && (
                                    <div className="text-end mb-3">
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => setShowFilters(false)}
                                        >
                                            <i className="fa-solid fa-xmark"></i>
                                        </button>
                                    </div>
                                )}
                                {/* Filter options */}
                                <div className="card-body">
                                    <h6 className="mb-2 fw-normal">I am looking for</h6>
                                    <select
                                        className="form-select mb-3"
                                        value={filters.gender}
                                        onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                                    >
                                        <option value="">Any</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>

                                    <h6 className="mb-2 fw-normal">Age</h6>
                                    <select
                                        className="form-select mb-3"
                                        value={filters.age}
                                        onChange={(e) => setFilters({ ...filters, age: e.target.value })}
                                    >
                                        <option value="">Any</option>
                                        <option value="18-25">18 - 25</option>
                                        <option value="26-30">26 - 30</option>
                                        <option value="31-35">31 - 35</option>
                                        <option value="36-40">36 - 40</option>
                                        <option value="41-50">41 - 50</option>
                                        <option value="50+">50+</option>
                                    </select>

                                    <h6 className="mb-2 fw-normal">Select Religion</h6>
                                    <select className="form-select mb-3"
                                        onChange={(e) => setFilters({ ...filters, religion: e.target.value })}
                                    >
                                        <option value="">Any</option>
                                        {filterOptions.religions.map((item, i) => (
                                            <option key={i}>{item}</option>
                                        ))}
                                    </select>

                                    <h6 className="mb-2 fw-normal">Location</h6>
                                    <select className="form-select mb-3"
                                        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                                    >
                                        <option value="">Any</option>
                                        {filterOptions.locations.map((item, i) => (
                                            <option key={i}>{item}</option>
                                        ))}
                                    </select>

                                    <h6 className="mb-2 fw-normal">Education</h6>
                                    <select className="form-select mb-3"
                                        onChange={(e) => setFilters({ ...filters, education: e.target.value })}
                                    >
                                        <option value="">Any</option>
                                        {filterOptions.education.map((item, i) => (
                                            <option key={i}>{item}</option>
                                        ))}
                                    </select>

                                    <h6 className="mb-2 fw-normal">Profession</h6>
                                    <select className="form-select mb-3"
                                        onChange={(e) => setFilters({ ...filters, profession: e.target.value })}
                                    >
                                        <option value="">Any</option>
                                        {filterOptions.occupations.map((item, i) => (
                                            <option key={i}>{item}</option>
                                        ))}
                                    </select>

                                    <div className="filter-btn">
                                        <button
                                            className="btn bg-C8C8C8 text-white px-4 rounded-3"
                                            onClick={() => setFilters({
                                                gender: "",
                                                age: "",
                                                religion: "",
                                                location: "",
                                                education: "",
                                                profession: "",
                                                sortBy: ""
                                            })}
                                        >
                                            Clear
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Profile List */}
                        <div className="col-md-9 col-lg-9 col-12">
                            <div className="filter row d-flex justify-content-between">
                                <h6 className="col-12 col-lg-3 mb-2 mb-lg-0 d-flex align-items-center ">
                                    Showing
                                    <span className="fw-semibold mx-2">{data?.length}</span>
                                    profiles
                                </h6>

                                {/* Search */}
                                <div className="col-12 col-lg-5 mb-2 mb-lg-0 mx-auto search">
                                    <form className="d-flex position-relative">
                                        <input
                                            className="form-control"
                                            placeholder="Search"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />

                                        <button className="btn border-0 bg-transparent position-absolute top-0 end-0" type="submit">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                <path d="M10.0833 10.0833L12.75 12.75M0.75 6.08333C0.75 7.49782 1.3119 8.85438 2.3121 9.85457C3.31229 10.8548 4.66885 11.4167 6.08333 11.4167C7.49782 11.4167 8.85438 10.8548 9.85457 9.85457C10.8548 8.85438 11.4167 7.49782 11.4167 6.08333C11.4167 4.66885 10.8548 3.31229 9.85457 2.3121C8.85438 1.3119 7.49782 0.75 6.08333 0.75C4.66885 0.75 3.31229 1.3119 2.3121 2.3121C1.3119 3.31229 0.75 4.66885 0.75 6.08333Z" stroke="#686868" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </form>
                                </div>

                                {/* Sort */}
                                <div className="col-12 col-lg-3 sort d-flex align-items-center">
                                    <h6 className="d-flex align-items-center mb-0" style={{ width: "80px" }}>Sort By</h6>
                                    <select
                                        className="form-select"
                                        onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                                    >
                                        <option value="relevant">More Relevant</option>
                                        <option value="latest">Latest</option>
                                    </select>

                                </div>
                            </div>

                            <hr />

                            <div className="row">
                                {data.length === 0 && (
                                    <p className="text-center">No profiles found...</p>
                                )}

                                {data
                                    .filter(item => item.userId !== user?._id)
                                    .map((item) => (
                                        <div key={item._id} className="col-lg-4 col-md-4 col-12 mb-3">
                                            <div className="card overflow-hidden position-relative">

                                                {/* Image Container */}
                                                <div className="position-relative" style={{ height: "230px", overflow: "hidden" }}>

                                                    {/* Blurred Background with overlay */}
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            top: 0,
                                                            left: 0,
                                                            width: "100%",
                                                            height: "100%",
                                                            backgroundImage: `url(${item.photos?.[0] || "assets/images/dummy.png"})`,
                                                            backgroundSize: "cover",
                                                            backgroundPosition: "center",
                                                            filter: "blur(15px)",
                                                            transform: "scale(1.1)",
                                                        }}
                                                    >
                                                        {/* Dark Overlay */}
                                                        <div
                                                            style={{
                                                                position: "absolute",
                                                                top: 0,
                                                                left: 0,
                                                                width: "100%",
                                                                height: "100%",
                                                                backgroundColor: "rgba(0,0,0,0.2)"
                                                            }}
                                                        ></div>
                                                    </div>

                                                    {/* Main Image */}
                                                    <img
                                                        src={item.photos?.[0] || "assets/images/dummy.png"}
                                                        alt="Profile"
                                                        className="position-relative w-100 h-100"
                                                        style={{
                                                            objectFit: "contain",
                                                            zIndex: 2,
                                                        }}
                                                    />
                                                </div>

                                                {/* Card Body */}
                                                <div className="card-body">
                                                    <h6 className="fw-semibold mb-0 text-capitalize">{item.name || "Unknown"}</h6>

                                                    <p className="d-flex align-items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="13" viewBox="0 0 10 13" fill="none">
                                                            <path d="M5.00005 0C2.24318 0 5.09029e-05 2.24312 5.09029e-05 4.99687C-0.0180741 9.025 4.81005 12.365 5.00005 12.5C5.00005 12.5 10.0182 9.025 10.0001 5C10.0001 2.24313 7.75693 0 5.00005 0ZM5.00005 7.5C3.6188 7.5 2.50005 6.38125 2.50005 5C2.50005 3.61875 3.6188 2.5 5.00005 2.5C6.3813 2.5 7.50005 3.61875 7.50005 5C7.50005 6.38125 6.3813 7.5 5.00005 7.5Z" fill="#4CAF50" />
                                                        </svg>
                                                        <span className="ms-2">{item.location || "Unknown"}</span>
                                                    </p>

                                                    <div className="d-flex gap-3 flex-wrap text-small">
                                                        <span className="bg-FFECAE py-1 px-2 rounded-2 fs-12 text-capitalize">{item.employmentType || "N/A"}</span>
                                                        <span className="bg-FFECAE py-1 px-2 rounded-2 fs-12 text-capitalize">
                                                            {item.dob ? `${new Date().getFullYear() - new Date(item.dob).getFullYear()} yrs` : "N/A"}
                                                        </span>
                                                        <span className="bg-FFECAE py-1 px-2 rounded-2 fs-12 text-capitalize">{item.occupation || "N/A"}</span>
                                                    </div>

                                                    <hr />

                                                    <div className="btn-bottom d-flex gap-2 flex-wrap">


                                                        <Link href={`/profiledetail/${item._id}`} className="btn btn-lg border fs-12 rounded-5">
                                                            More Detail
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>


                        </div>

                        {/* Pagination */}
                        <div className="d-flex justify-content-center my-4">
                            <button
                                className="btn btn-outline-dark mx-2"
                                disabled={page === 1}
                                onClick={() => setPage(prev => prev - 1)}
                            >
                                Previous
                            </button>

                            <span className="fw-bold mt-2">
                                Page {page} of {totalPages}
                            </span>

                            <button
                                className="btn btn-outline-dark mx-2"
                                disabled={page === totalPages}
                                onClick={() => setPage(prev => prev + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <Footer />
        </main>
    );
}
