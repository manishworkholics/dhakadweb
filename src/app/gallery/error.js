"use client";

import SectionTitle from "@/components/SectionTitle";
import Header from "@/app/components/Header/Page";
import Footer from "@/app/components/Footer/page";

export default function Error({ error, reset }) {
  return (
    <div className="publicPageLayout">
      <Header />
      <div className="publicPageContent galleryPage">
        <div className="container">
          <SectionTitle title="Gallery" subtitle="Our moments" align="center" />
          <div className="galleryStateBox">
            <p className="galleryStateTitle">Couldn&apos;t load gallery</p>
            <p className="galleryStateText">
              {error?.message || "Please try again in a moment."}
            </p>
            <button className="galleryRetryBtn" onClick={() => reset()}>
              Retry
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
