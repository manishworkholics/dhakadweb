"use client";

import SectionTitle from "@/components/SectionTitle";

export default function Error({ error, reset }) {
  return (
    <div className="galleryPage">
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
  );
}
