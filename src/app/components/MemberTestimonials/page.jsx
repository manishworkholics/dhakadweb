// MemberTestimonials.jsx
"use client";

import React from "react";

export default function MemberTestimonials() {
  // Testimonial data could be mapped over, but for simplicity, we'll hardcode the structure.
  // Note: The third testimonial has a profile image.
  return (
    <section className="testimonials-section">
      <div className="container">
        {/* Title */}
        <h2 className="testimonials-title">
          What <span className="highlight-text">Members Say</span>
        </h2>

        {/* Testimonials Grid */}
        <div className="row testimonials-grid">
          {/* Testimonial Card 1 */}
          <div className="col-md-4 col-sm-12 col-lg-4">
            <div className="testimonial-card">
              <p className="testimonial-quote">
                "I found my life partner here! The verified profiles and simple
                interface made everything so easy. Truly grateful to this platform
                for bringing us together."
              </p>
              <div className="testimonial-author">
                <div className="author-info">
                  <h5 className="author-name">Rohit Dhakad</h5>
                  <p className="author-location">Indore</p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Card 2 */}
          <div className="col-md-4 col-sm-12 col-lg-4">
            <div className="testimonial-card">
              <p className="testimonial-quote">
                "We both loved music and travel — that’s how our story began. The
                match suggestions were so accurate! Thank you for making our dream
                come true."
              </p>
              <div className="testimonial-author">
                <div className="author-info">
                  <h5 className="author-name">Nikhil Dhakad</h5>
                  <p className="author-location">Indore</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-12 col-lg-4">
            <div className="testimonial-card">
              <p className="testimonial-quote">
                "We both loved music and travel — that’s how our story began. The
                match suggestions were so accurate! Thank you for making our dream
                come true."
              </p>
              <div className="testimonial-author">
                <div className="author-info">
                  <h5 className="author-name">Nikhil Dhakad</h5>
                  <p className="author-location">Indore</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}