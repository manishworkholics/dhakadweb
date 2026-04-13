import SectionTitle from "@/components/SectionTitle";
import { SkeletonCard } from "@/components/Skeleton";
import styles from "./gallery.module.css";

export default function Loading() {
  return (
    <div className={styles.page}>
      <div className="container">
        <SectionTitle title="Gallery" subtitle="Our moments" align="center" />
        <div className={styles.grid}>
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

