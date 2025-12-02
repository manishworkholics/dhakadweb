import React from 'react'
import Header from '../Header/Page'
import Footer from '../Footer/page'
export default function RecentSuccessStorypage() {
  return (
    <div>
      <div className="my-4">
        <Header />

        <div className="sub-bg">
          <h4 className="text-white p-4 text-center font-bold mb-0 pageheading-banner fw-semibold">
            Lakhs of Happy Marriages
          </h4>
        </div>

        {/* Back Arrow */}
        <div className="d-flex align-items-center mb-3 mt-3 container">
          <span
            style={{
              fontSize: "22px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            ←
          </span>
          <h5 className="m-0">Millions of Happy Marriages</h5>
        </div>
        <div className="d-flex align-items-center mb-3">


          <span
            style={{
              fontSize: "22px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            ←
          </span>
          <h4 className="m-0">Millions of Happy Marriages</h4>
        </div>

        <div
          className="row p-5 shadow-lg"

          style={{
            borderRadius: "15px",
            background: "rgba(255, 255, 255, 1)",
          }}
        >

          <div className="col-lg-5 col-md-6 col-12 mb-3">
          {/* LEFT IMAGE */}
          <div className="col-lg-6 col-md-6 col-12 mb-3 mt-3">

            <div
              className="position-relative"
              style={{
                borderRadius: "15px",
                overflow: "hidden",
              }}
            >
              <img
                src="/dhakadweb/assets/images/viewallprofile-img2.jpeg"
                width={500}
                height={600}
                alt="Couple"
                className="img-fluid"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />

              <div
                className="position-absolute bottom-0 start-0 w-100 p-3"
                style={{
                  background: "rgba(0,0,0,0.6)",
                  color: "white",
                }}>
                <h6 className="m-0">Mohit & Sonam Bhardwaj</h6>
                <hr />
                <div className="d-flex justify-content-between mt-1 flex-wrap">
                  <small>Married on: 02 Nov 2025</small>
                  <small>Posted on: 27 Nov 2025</small>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT TEXT */}
          <div className="col-lg-6 col-md-6 col-12 d-flex align-items-start">
            <p
              style={{
                fontSize: "16px",
                lineHeight: "25px",
                marginTop: "0px",
              }}
            >
              I met my perfect match through Bharat Matrimony. I was interested
              when I came across Mohit’s profile on Bharat Matrimony. When we
              started talking, I was able to connect with Mohit easily. Our
              thoughts and interests were similar, and now we are planning for a
              wonderful life together, thanks to Bharat Matrimony.
            </p>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>

  )

}
