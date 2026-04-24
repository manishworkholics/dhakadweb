"use client";

import SectionTitle from "@/components/SectionTitle";
import Header from "@/app/components/Header/Page";
import Footer from "@/app/components/Footer/page";

export default function Error({ error, reset }) {
  return (
    <div className="publicPageLayout">
      <Header />
      <div className="publicPageContent termsPage">
        <div className="container">
          <SectionTitle title="Privacy Policy" />
          <div className="termsStateBox">
            <p className="termsStateTitle">Something went wrong</p>
            <p className="termsStateText">
              {error?.message || "Failed to load privacy policy. Please try again."}
            </p>
            <button className="termsRetryBtn" onClick={() => reset()}>
              Retry
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
