"use client";

import React, { useState, useEffect, useMemo } from "react";

const NavLink = ({ href, children, className, style }) => (
  <a href={href} className={className} style={style}>
    {children}
  </a>
);

export default function RelatedProfiles() {
  const [featuredProfiles, setFeaturedProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const backgroundColors = useMemo(
    () => ["bg-info", "bg-danger", "bg-warning", "bg-secondary"],
    []
  );

  useEffect(() => {
    const getProfiles = async () => {
      try {
        const res = await fetch("http://143.110.244.163:5000/api/featured?limit=10");
        const data = await res.json();
        setFeaturedProfiles(data?.profiles || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching featured profiles:", error);
        setLoading(false);
      }
    };
    getProfiles();

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getItemsPerSlide = () => {
    if (windowWidth <= 575) return 2; // mobile
    if (windowWidth <= 991) return 2; // tablet
    return 4; // desktop
  };

  const itemsPerSlide = getItemsPerSlide();

  const cardWidthPercentage = `${100 / itemsPerSlide}%`;

  const totalSlides = Math.ceil(
    featuredProfiles.length - itemsPerSlide + 1
  );

  const nextSlide = () => {
    setActiveIndex((prev) =>
      prev < totalSlides - 1 ? prev + 1 : prev
    );
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  if (loading)
    return (
      <section className="py-5 text-center bg-white">
        <div className="container">Loading related profiles...</div>
      </section>
    );

  if (!featuredProfiles.length)
    return (
      <section className="py-5 text-center bg-white">
        <div className="container">
          <h2 className="fw-bold m-0">
            <span className="text-danger">Related</span> Profiles
          </h2>
          <p className="mt-3 text-muted">No profiles found.</p>
        </div>
      </section>
    );

  const showNavigation = featuredProfiles.length > itemsPerSlide;

  return (
    <section className="py-5">
      <div className="container">
        <div className="d-flex justify-content-center mb-4">
          <h2 className="fw-bold m-0 text-uppercase">
            <span className="text-danger">Related</span> Profiles
          </h2>
        </div>

        <div className="position-relative">
          <div className="overflow-hidden p-2">
            <div
              className="d-flex flex-nowrap"
              style={{
                transform: `translateX(-${activeIndex * (100 / itemsPerSlide)}%)`,
                transition: "transform 0.5s ease-in-out",
              }}
            >
              {featuredProfiles.map((item, index) => {
                const bgColorClass =
                  backgroundColors[index % backgroundColors.length];
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 p-2"
                    style={{
                      flexBasis: cardWidthPercentage,
                      maxWidth: cardWidthPercentage,
                      transition: "flex-basis 0.5s, max-width 0.5s",
                    }}
                  >
                    <div
                      className="rounded-3 overflow-hidden position-relative"
                      style={{
                        height: windowWidth <= 575 ? "auto" : "100%",
                      }}
                    >
                      <div
                        className="position-absolute start-0 top-0 m-3 text-white p-2 rounded-2 fw-bold small"
                        style={{ zIndex: 10 }}
                      >

                      </div>

                      <div
                        className="position-relative overflow-hidden"
                        style={{
                          height: windowWidth <= 575 ? "180px" : "260px",
                        }}
                      >
                        <img
                          src={
                            item?.photos[0] ||
                            `https://placehold.co/400x260/${bgColorClass.replace(
                              "bg-",
                              ""
                            )}/ffffff?text=Profile+${index + 1}`
                          }
                          alt={`Profile ${index + 1}`}
                          className="w-100 h-100 object-fit-cover rounded-4"
                          style={{ height: "100%", width: "100%" }}
                        />
                      </div>

                      <div
                        className="bg-white p-lg-2 p-md-2 p-1 text-center mx-lg-4 mx-md-4 mx-2 rounded-3"
                        style={{
                          bottom: "30px",
                          position: "relative",
                          boxShadow:
                            "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                        }}
                      >
                        <h5 className="fw-bold mb-1 text-danger" style={{ fontSize: "15px" }}>
                          {item.name || `User ${index + 1}`}
                        </h5>
                        <p className="text-muted small m-0" style={{ fontSize: "12px" }}>
                          CITY: {item.location || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          {showNavigation && (
            <>
              <button
                onClick={prevSlide}
                className="position-absolute top-50 translate-middle-y start-0 btn btn-dark rounded-circle shadow-lg"
                style={{
                  opacity: activeIndex === 0 ? 0.5 : 1,
                  width: "45px",
                  height: "45px",
                  fontSize: "1.5rem",
                  lineHeight: "45px",
                  padding: 0,
                  marginLeft: "-10px",
                }}
                disabled={activeIndex === 0}
              >
                &#10094;
              </button>
              <button
                onClick={nextSlide}
                className="position-absolute top-50 translate-middle-y end-0 btn btn-dark rounded-circle shadow-lg"
                style={{
                  opacity: activeIndex === totalSlides - 1 ? 0.5 : 1,
                  width: "45px",
                  height: "45px",
                  fontSize: "1.5rem",
                  lineHeight: "45px",
                  padding: 0,
                  marginRight: "-10px",
                }}
                disabled={activeIndex === totalSlides - 1}
              >
                &#10095;
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
