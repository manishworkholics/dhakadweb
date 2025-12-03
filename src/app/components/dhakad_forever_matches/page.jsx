"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../Header/Page";
import Footer from "../Footer/page";

export default function ViewProfileAll() {

  const [successStorries, setsuccessStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSuccess = async () => {
    try {
      const res = await fetch('http://206.189.130.102:5000/api/success');
      const data = await res.json();
      setsuccessStories(data?.stories || []);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching success stories:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getSuccess();
  }, [])

  return (
    <div>
      <Header />
      <div className="sub-bg">
        <h4 className="text-white p-4 text-center font-bold mb-0 pageheading-banner fw-semibold">
          Lakhs of Happy Marriages
        </h4>
      </div>
      <div className="container mt-4">
        <h4 className="text-danger">Recent Success Stories</h4>
        <div className="row">
          {/* CARD 1 */}

          {successStorries?.map((val, index) => {
            return (

              <div key={index} className="col-sm-6 mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="main d-flex gap-3">
                      <div className="image">
                        <Link href="/components/details_success_stories">
                          <img
                            src={val?.image}
                            style={{
                              width: "200px",
                              height: "120px",
                              objectFit: "cover",
                              borderRadius: "10px",
                              cursor: "pointer",
                            }}
                            alt="Profile"
                          />
                        </Link>
                      </div>

                      <div className="text fw-bold">
                        <h4 style={{ fontWeight: "bold" }}>{val?.name} and {val?.partnerName}</h4>
                        <h6>Posted on {new Date(val?.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}</h6>

                        <p>
                          {val?.story?.slice(0,20)}

                          <Link href={`/components/details_success_stories/${val._id}`} className="text-decoration-none" style={{ color: "red" }}>
                            More...
                          </Link>

                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            )
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
