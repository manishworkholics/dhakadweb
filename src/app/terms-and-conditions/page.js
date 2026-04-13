import SectionTitle from "@/components/SectionTitle";
import styles from "./terms.module.css";
import { fetchJson } from "@/lib/api";

export const metadata = {
  title: "Terms & Conditions | Dhakad Matrimony",
  description: "Read the Terms & Conditions for using Dhakad Matrimony.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getTerms() {
  const json = await fetchJson("/api/terms", { cache: "no-store" });
  return json?.data || null;
}

export default async function TermsAndConditionsPage() {
  const terms = await getTerms();

  return (
    <div className={styles.page}>
      <div className="container">
        <SectionTitle title={terms?.title || "Terms & Conditions"} />

        {!terms?.content ? (
          <div className={styles.stateBox}>
            <p className={styles.stateTitle}>No terms available</p>
            <p className={styles.stateText}>
              Please check back later. If this keeps happening, contact support.
            </p>
          </div>
        ) : (
          <article
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: terms.content }}
          />
        )}
      </div>
    </div>
  );
}

