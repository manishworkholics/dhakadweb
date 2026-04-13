"use client";

import SectionTitle from "@/components/SectionTitle";
import styles from "./terms.module.css";

export default function Error({ error, reset }) {
  return (
    <div className={styles.page}>
      <div className="container">
        <SectionTitle title="Terms & Conditions" />
        <div className={styles.stateBox}>
          <p className={styles.stateTitle}>Something went wrong</p>
          <p className={styles.stateText}>
            {error?.message || "Failed to load terms. Please try again."}
          </p>
          <button className={styles.retryBtn} onClick={() => reset()}>
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}

