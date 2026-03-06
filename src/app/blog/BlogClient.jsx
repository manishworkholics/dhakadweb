"use client";

import Link from "next/link";
import Header from "../components/Header/Page";
import Footer from "../components/Footer/page";

export default function BlogClient({ blogs }) {

    return (
        <div className="login-page bg-FDFBF7">

            {/* HEADER */}
            <Header />

            {/* Banner */}
            <div className="sub-bg">
                <h4 className="text-white p-4 text-center font-bold mb-0 pageheading-banner">
                    Dhakad Matrimony Blog
                </h4>
            </div>

            {/* BLOG SECTION */}
            <div className="container py-5">

                <div className="mx-auto text-center mb-5" style={{ maxWidth: "900px" }}>
                    <h1 className="mb-3">Latest Blogs</h1>
                    <p className="text-muted">
                        Discover relationship advice, marriage tips and Dhakad Matrimony guides.
                    </p>
                </div>

                <div className="row g-4">

                    {blogs?.map((blog) => (

                        <div key={blog?._id} className="col-lg-4 col-md-6">

                            <Link
                                href={`/blog/${blog?.slug}`}
                                className="text-decoration-none text-dark"
                            >

                                <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden blog-card">

                                    {/* Image */}
                                    <div className="position-relative">

                                        <img
                                            src={blog?.image}
                                            alt={blog?.title}
                                            className="w-100"
                                            style={{
                                                height: "220px",
                                                objectFit: "cover"
                                            }}
                                        />

                                    </div>

                                    {/* Content */}
                                    <div className="card-body">

                                        <h5 className="fw-bold mb-2">
                                            {blog?.title}
                                        </h5>

                                        <p className="text-muted small mb-3">

                                            {blog?.excerpt?.length > 120
                                                ? blog?.excerpt.slice(0, 120) + "..."
                                                : blog?.excerpt}

                                        </p>

                                        <span className="text-D4AF37 fw-semibold">
                                            Read More →
                                        </span>

                                    </div>

                                </div>

                            </Link>

                        </div>

                    ))}

                </div>

            </div>

            {/* FOOTER */}
            <Footer />

        </div>
    );
}