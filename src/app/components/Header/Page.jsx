"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) setIsLoggedIn(true);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        window.location.href = "/dhakadweb/login"; // redirect
    };

    return (
        <div className='container-fluid border-bottom shadow-sm bg-white'>
            <div className="container">
                <header className="header">
                    <nav className="navbar navbar-expand-lg">
                        <div className="container-fluid">
                            <Link className="navbar-brand" href="/home">
                                <img src={`/dhakadweb/assets/images/dhakadlogo.png`} />
                            </Link>

                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse " id="navbarSupportedContent">
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-4 gap-lg-4 gap-md-4 gap-0 text-center">

                                    {/* Always visible menu */}
                                    <li className="nav-item">
                                        <Link className="nav-link active" href="/">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" href="/aboutus">About us</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" href="/contactus">Contact us</Link>
                                    </li>

                                    {/* Visible only after login */}
                                    {isLoggedIn && (
                                        <>
                                            <li className="nav-item">
                                                <Link className="nav-link" href="/profile">Find Partner</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" href="/myprofile">My Profile</Link>
                                            </li>
                                        </>
                                    )}
                                </ul>

                                {/* Buttons section */}
                                <div className="d-flex mb-2 mb-lg-0 gap-lg-4 gap-md-4 gap-0 justify-content-center">
                                    {!isLoggedIn ? (
                                        <>
                                            {/* <Link href="/registrationform" className='btn btn-danger'>Registration</Link> */}
                                            <Link href='/login' className='btn btn-outline-secondary'>Login</Link>
                                        </>
                                    ) : (
                                        <button className='btn btn-outline-danger' onClick={handleLogout}>
                                            Logout
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        </div>
    );
};

export default Header;
