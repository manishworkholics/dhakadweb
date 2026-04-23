"use client";

import SectionTitle from "@/components/SectionTitle";

export default function Error({ error, reset }) {
  return (
    <div className="termsPage">
      <div className="container">
        <SectionTitle title="Terms & Conditions" />
        <div className="termsStateBox">
          <p className="termsStateTitle">Something went wrong</p>
          <p className="termsStateText">
            {error?.message || "Failed to load terms. Please try again."}
          </p>
          <button className="termsRetryBtn" onClick={() => reset()}>
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}
