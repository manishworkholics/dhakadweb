"use client";

import SectionTitle from "@/components/SectionTitle";
import styles from "./gallery.module.css";

export default function Error({ error, reset }) {
  return (
    <div className={styles.page}>
      <div className="container">
        <SectionTitle title="Gallery" subtitle="Our moments" align="center" />
        <div className={styles.stateBox}>
          <p className={styles.stateTitle}>Couldn’t load gallery</p>
          <p className={styles.stateText}>
            {error?.message || "Please try again in a moment."}
          </p>
          <button className={styles.retryBtn} onClick={() => reset()}>
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}

