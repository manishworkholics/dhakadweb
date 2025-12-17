"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { usePathname } from "next/navigation";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const pathname = usePathname(); // 👈 current route

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) setIsLoggedIn(true);
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        setIsLoggedIn(false);
        window.location.href = "/dhakadweb/login";
    };

    const isActive = (path) => pathname === path ? "nav-link active" : "nav-link";

    return (
        <div className='container-fluid border-bottom shadow-sm bg-white'>
            <div className="container">
                <nav className="navbar navbar-expand-lg">
                    <Link className="navbar-brand" href="/">
                        <img src={`/dhakadweb/assets/images/dhakadlogo.png`} />
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto me-4 text-center gap-lg-4 header-nav">

                            <li className="nav-item">
                                <Link className={isActive("/")} href="/">Home</Link>
                            </li>

                            <li className="nav-item">
                                <Link className={isActive("/aboutus")} href="/aboutus">About us</Link>
                            </li>

                            <li className="nav-item">
                                <Link className={isActive("/contactus")} href="/contactus">Contact us</Link>
                            </li>

                            {isLoggedIn && (
                                <>
                                    <li className="nav-item">
                                        <Link className={isActive("/profile")} href="/profile">Find Partner</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className={isActive("/myprofile")} href="/myprofile">My Profile</Link>
                                    </li>
                                </>
                            )}
                        </ul>

                        <div className="d-flex gap-3">
                            {!isLoggedIn ? (
                                <Link href="/login" className="btn btn-outline-secondary">Login</Link>
                            ) : (
                                <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Header;
