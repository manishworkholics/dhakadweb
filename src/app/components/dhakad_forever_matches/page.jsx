"use client";
import React from "react";
import Link from "next/link";
import Header from "../Header/Page";
import Footer from "../Footer/page";

export default function ViewProfileAll() {
  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div style={{ position: "relative", width: "fit-content" }}>
          <img
            src="/dhakadweb/assets/images/pageheading-banner.png"
            className="img-fluid"
            style={{ display: "block" }}
            alt="Hero"
          />

          <p
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
              fontSize: "28px",
              fontWeight: "700",
              textAlign: "center",
              margin: 0,
            }}
          >
            Lakhs of Happy Marriages
          </p>
        </div>
      </div>

      <div className="container mt-4">
        <h3 className="text-danger">Recent Success Stories</h3>
        <div className="row">
          {/* CARD 1 */}
          <div className="col-sm-6 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="main d-flex gap-3">
                  <div className="image">
                    <Link href="/components/details_success_stories">
                      <img
                        src="/dhakadweb/assets/images/viewallprofile-img2.jpeg"
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

                  <div className="text">
                    <h4>Mohit and Sonam Bhardwaj</h4>
                    <b>Posted on 27 Nov 2025</b>
                    <p>
                      I met my perfect match through Bharata Matrimony. <br />I
                      was interested when more...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="col-sm-6 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="main d-flex gap-3">
                  <div className="image">
                    <Link href="/components/details_success_stories">
                      <img
                        src="/dhakadweb/assets/images/viewallprofile-img4.jpg"
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

                  <div className="text">
                    <h4>Rajat and Priyanka Bhardwaj</h4>
                    <b>Posted on 30 Nov 2025</b>
                    <p>
                      I met my perfect match through Bharata Matrimony. <br />I
                      was interested when more...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 3 */}

          <div className="col-sm-6 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="main d-flex gap-3">
                  <div className="image">
                    <Link href="/components/details_success_stories">
                      <img
                        src="/dhakadweb/assets/images/viewallprofile-img4.jpg"
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

                  <div className="text">
                    <h4>Anil and Naina Bhardwaj</h4>
                    <b>Posted on 15 Nov 2025</b>
                    <p>
                      I met my perfect match through Bharata Matrimony. <br />I
                      was interested when more...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 4 */}

          <div className="col-sm-6 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="main d-flex gap-3">
                  <div className="image">
                    <Link href="/components/details_success_stories">
                      <img
                        src="/dhakadweb/assets/images/viewallprofile-img6.jpg"
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

                  <div className="text">
                    <h4>Raj and Sonal Dhakad</h4>
                    <b>Posted on 15 Nov 2025</b>
                    <p>
                      I met my perfect match through Bharata Matrimony. <br />I
                      was interested when more...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 5 */}

          <div className="col-sm-6 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="main d-flex gap-3">
                  <div className="image">
                    <Link href="/components/details_success_stories">
                      <img
                        src="/dhakadweb/assets/images/viewallprofile-img8.avif"
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

                  <div className="text">
                    <h4>Rohit and Neha Bhardwaj</h4>
                    <b>Posted on 20 Nov 2025</b>
                    <p>
                      I met my perfect match through Bharata Matrimony. <br />I
                      was interested when more...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 6 */}

          <div className="col-sm-6 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="main d-flex gap-3">
                  <div className="image">
                    <Link href="/components/details_success_stories">
                      <img
                        src="/dhakadweb/assets/images/viewallprofile-img7.avif"
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

                  <div className="text">
                    <h4>Rahul and Priya Dhakad</h4>
                    <b>Posted on 25 Nov 2025</b>
                    <p>
                      I met my perfect match through Bharata Matrimony. <br />I
                      was interested when more...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 7 */}

          <div className="col-sm-6 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="main d-flex gap-3">
                  <div className="image">
                    <Link href="/components/details_success_stories">
                      <img
                        src="/dhakadweb/assets/images/viewallprofile-img2.jpeg"
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

                  <div className="text">
                    <h4>Rahul and Priya Dhakad</h4>
                    <b>Posted on 25 Nov 2025</b>
                    <p>
                      I met my perfect match through Bharata Matrimony. <br />I
                      was interested when more...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 8 */}

          <div className="col-sm-6 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="main d-flex gap-3">
                  <div className="image">
                    <Link href="/components/details_success_stories">
                      <img
                        src="/dhakadweb/assets/images/viewallprofile-img6.jpg"
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

                  <div className="text">
                    <h4>Rahul and Priya Dhakad</h4>
                    <b>Posted on 25 Nov 2025</b>
                    <p>
                      I met my perfect match through Bharata Matrimony. <br />I
                      was interested when more...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 9 */}

          <div className="col-sm-6 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="main d-flex gap-3">
                  <div className="image">
                    <Link href="/components/details_success_stories">
                      <img
                        src="/dhakadweb/assets/images/viewallprofile-img8.avif"
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

                  <div className="text">
                    <h4>Rahul and Priya Dhakad</h4>
                    <b>Posted on 25 Nov 2025</b>
                    <p>
                      I met my perfect match through Bharata Matrimony. <br />I
                      was interested when more...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 10 */}

          <div className="col-sm-6 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="main d-flex gap-3">
                  <div className="image">
                    <Link href="/components/details_success_stories">
                      <img
                        src="/dhakadweb/assets/images/viewallprofile-img6.jpg"
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

                  <div className="text">
                    <h4>Rahul and Priya Dhakad</h4>
                    <b>Posted on 25 Nov 2025</b>
                    <p>
                      I met my perfect match through Bharata Matrimony. <br />I
                      was interested when more...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
