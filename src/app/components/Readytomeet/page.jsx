"use client";

import React from "react";

export default function Readytomeet() {

  const handleRegisterClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // smooth scroll
    });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="ready-card rounded-5">
              <h1>Ready to Meet Your Match?</h1>
              <h6>Create your profile in minutes and start connecting</h6>

              <button
                className="text-white"
                onClick={handleRegisterClick}
              >
                Register Now
              </button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
