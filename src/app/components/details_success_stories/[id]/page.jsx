"use client";

import React, { useEffect, useState, use } from "react";
import Header from "../../Header/Page";
import Footer from "../../Footer/page";

export default function DetailsSuccessStories({ params }) {
  // 🟢 unwrap params promise using use()
  const { id } = use(params);

  const [story, setStory] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await fetch(`http://143.110.244.163:5000/api/success/${id}`);
        const data = await res.json();
        setStory(data?.story);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchStory();
  }, [id]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  // if (!story) return <p className="text-center py-5">Loading...</p>;

  return (
    <div>
      <Header />
      <div className="sub-bg">
        <h4 className="text-white p-4 text-center font-bold mb-0 pageheading-banner fw-semibold">
          Lakhs of Happy Marriages
        </h4>
      </div>

      {/* Back */}
      <div className="bg-FDFBF7">
        <div className="d-flex align-items-center mt-3 container">
          <span
            style={{ fontSize: 22, cursor: "pointer", marginRight: 10 }}
            onClick={() => window.history.back()}
          >
            ←
          </span>
          <h5 className="m-0">Success Story</h5>
        </div>

        <div className="container my-3">
          <div
            className="row shadow-lg py-3 px-1"
            style={{
              borderRadius: 15,
              background: "#fff",
            }}
          >
            {/* IMAGE */}
            <div className="col-lg-6 mb-3">
              <div
                className="position-relative rounded-3"
                style={{ height: "550px", overflow: "hidden" }}
              >
                <img
                  src={story?.image}
                  alt="success"
                  className="img-fluid"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />

                <div
                  className="position-absolute bottom-0 start-0 w-100 p-3"
                  style={{ background: "rgba(0,0,0,0.6)", color: "#fff" }}
                >
                  <h6 className="m-0">
                    {story?.name} & {story?.partnerName}
                  </h6>
                  <hr />
                  <small>Posted on: {formatDate(story?.createdAt)}</small>
                </div>
              </div>
            </div>

            {/* STORY TEXT */}
            <div className="col-lg-6 d-flex">
              <p style={{ fontSize: 16, lineHeight: "25px" }}>{story?.story}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
