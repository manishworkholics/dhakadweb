"use client";

import Header from "../../components/Header/Page";
import Footer from "../../components/Footer/page";
import Link from "next/link";

export default function BlogDetailClient({ blog }) {

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    image: blog.image,
    author: {
      "@type": "Person",
      name: blog.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Dhakad Matrimony",
      logo: {
        "@type": "ImageObject",
        url: "https://dhakadmatrimony.com/logo.png",
      },
    },
    datePublished: blog.publishedAt,
    description: blog.excerpt,
  };

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

      {/* BLOG CONTENT */}
      <div className="container py-5">

        {/* Breadcrumb */}
        <div className="mb-4">
          <Link href="/" className="text-decoration-none text-muted">
            Home
          </Link>
          {" / "}
          <Link href="/blog" className="text-decoration-none text-muted">
            Blogs
          </Link>
          {" / "}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
          <span className="text-dark">{blog?.title}</span>
        </div>

        <div className="row justify-content-center">

          <div className="col-lg-8">

            <div className="bg-white p-4 p-lg-5 rounded-4 shadow-sm">

              {/* Title */}
              <h1 className="fw-bold mb-3">
                {blog?.title}
              </h1>

              {/* Featured Image */}
              <div className="mb-4">
                <img
                  src={blog?.image}
                  alt={blog?.title}
                  className="w-100 rounded"
                  style={{ maxHeight: "450px", objectFit: "cover" }}
                />
              </div>

              {/* Blog Content */}
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{
                  __html: blog?.content,
                }}
              />

            </div>

          </div>

        </div>

      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}