"use client";

import Link from "next/link";
import Header from "../components/Header/Page";
import { useState, useEffect } from "react";

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
                <h4 className="text-white p-4 text-center font-bold mb-0">
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
                            <div className="filter d-flex justify-content-between">
                                <h6 className="mb-0">Showing {data?.length} profiles</h6>

                                {/* Search */}
                                <div className="search">
                                    <form className="d-flex">
                                        <input className="form-control" placeholder="Search" />
                                        <button className="btn border" type="submit">
                                            🔍
                                        </button>
                                    </form>
                                </div>

                                {/* Sort */}
                                <div className="sort d-flex align-items-center">
                                    <h6 style={{ width: "60px" }}>Sort By</h6>
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
                                            />

                                            <div className="card-body">
                                                <h6 className="fw-semibold">{item.name || "Unknown"}</h6>

                                                <p className="d-flex align-items-center">
                                                    📍 {item.location|| "Unknown"}
                                                </p>

                                                <div className="d-flex justify-content-between text-small">
                                                    <span>{item.employmentType || "N/A"}</span>
                                                    <span>
                                                        {item.dob ? `${new Date().getFullYear() - new Date(item.dob).getFullYear()} yrs` : "N/A"}
                                                    </span>
                                                    <span>{item.occupation || "N/A"}</span>
                                                </div>

                                                <hr />

                                                <div className="btn-bottom d-flex">
                                                    <button className="btn bg-4CAF50 text-white px-2 rounded-5 me-2">
                                                        Chat Now
                                                    </button>
                                                    <button className="btn border px-2 rounded-5 me-2">
                                                        Send Interest
                                                    </button>
                                                    <Link href={`/profiledetail/${item._id}`} className="btn border px-2 rounded-5">
                                                        More Detail
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}
