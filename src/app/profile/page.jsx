"use client";

import Link from "next/link";
import Header from "../components/Header/Page";
import { useState, useEffect } from "react";
import Readytomeet from "../components/Readytomeet/page";
import Footer from "../components/Footer/page";

export default function Profile() {

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
        const query = new URLSearchParams(filters).toString();

        fetch(`http://206.189.130.102:5000/api/profile/profiles?${query}`)
            .then((res) => res.json())
            .then((result) => setData(result.profiles))
            .catch((err) => console.log(err));
    };


    useEffect(() => {
        getAllProfile();
    }, [filters]);


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

                        {/* Left Filter */}
                        <div className="col-md-3 col-lg-3 col-12 mt-5">
                            <div className="card w-100">
                                <div className="card-body">
                                    <h6 className="mb-2 fw-normal">I am looking for</h6>
                                    <select
                                        className="form-select mb-3"
                                        onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                                    >
                                        <option value="">Any</option>
                                        <option value="Male">Men</option>
                                        <option value="Female">Women</option>
                                    </select>

                                    <h6 className="mb-2 fw-normal">Age</h6>
                                    <select className="form-select mb-3">
                                        <option>18-30</option>
                                        <option>31-45</option>
                                    </select>
                                    <h6 className="mb-2 fw-normal">Select Religion</h6>
                                    <select className="form-select mb-3">
                                        <option>Hindu</option>
                                        <option>Sikh</option>
                                    </select>
                                    <h6 className="mb-2 fw-normal">Location</h6>
                                    <select className="form-select mb-3">
                                        <option>Indore</option>
                                        <option>Pune</option>
                                    </select>
                                    <h6 className="mb-2 fw-normal">Education</h6>
                                    <select className="form-select mb-3">
                                        <option>B.sc</option>
                                        <option>MBA</option>
                                    </select>
                                    <h6 className="mb-2 fw-normal">Profession</h6>
                                    <select className="form-select mb-3">
                                        <option>IT Profession</option>
                                        <option>Businessman</option>
                                    </select>
                                    <div className="filter-btn">
                                        <button className="btn bg-D4AF37 text-white px-4 me-3 rounded-3">
                                            Apply
                                        </button>
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
                                        <input className="form-control" placeholder="Search" />
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

                                {data.map((item) => (
                                    <div key={item._id} className="col-lg-4 col-md-4 col-12 mb-3">
                                        <div className="card">
                                            <img
                                                src={item.photos?.[0] || "/placeholder.png"}
                                                className="card-img-top p-1"
                                                style={{ height: "230px", objectFit: "cover" }}
                                            />

                                            <div className="card-body">
                                                <h6 className="fw-semibold mb-0 text-capitalize">{item.name || "Unknown"}</h6>

                                                <p className="d-flex align-items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="13" viewBox="0 0 10 13" fill="none">
                                                        <path d="M5.00005 0C2.24318 0 5.09029e-05 2.24312 5.09029e-05 4.99687C-0.0180741 9.025 4.81005 12.365 5.00005 12.5C5.00005 12.5 10.0182 9.025 10.0001 5C10.0001 2.24313 7.75693 0 5.00005 0ZM5.00005 7.5C3.6188 7.5 2.50005 6.38125 2.50005 5C2.50005 3.61875 3.6188 2.5 5.00005 2.5C6.3813 2.5 7.50005 3.61875 7.50005 5C7.50005 6.38125 6.3813 7.5 5.00005 7.5Z" fill="#4CAF50" />
                                                    </svg>
                                                    <span className="ms-2">
                                                        {item.location || "Unknown"}
                                                    </span>
                                                </p>

                                                <div className="d-flex gap-3 flex-wrap text-small">
                                                    <span className="bg-FFECAE py-1 px-2 rounded-2 fs-13 text-capitalize">{item.employmentType || "N/A"}</span>
                                                    <span className="bg-FFECAE py-1 px-2 rounded-2 fs-13 text-capitalize">
                                                        {item.dob ? `${new Date().getFullYear() - new Date(item.dob).getFullYear()} yrs` : "N/A"}
                                                    </span>
                                                    <span className="bg-FFECAE py-1 px-2 rounded-2 fs-13 text-capitalize">{item.occupation || "N/A"}</span>
                                                </div>

                                                <hr />

                                                <div className="btn-bottom d-flex gap-2 flex-wrap">
                                                    <button className="btn btn-sm bg-4CAF50 text-white rounded-5 fs-13">
                                                        Chat Now
                                                    </button>
                                                    <button className="btn btn-sm border rounded-5 fs-13">
                                                        Send Interest
                                                    </button>
                                                    <Link href={`/profiledetail/${item._id}`} className="btn btn-sm border fs-13 rounded-5">
                                                        More Detail
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* ReadyToMeet */}
                        <div className="">
                            <Readytomeet />
                        </div>

                    </div>
                </div>
            </div>
            {/* Footer */}
            <Footer />
        </main>
    );
}
