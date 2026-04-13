import SectionTitle from "@/components/SectionTitle";
import { SkeletonLine } from "@/components/Skeleton";
import styles from "./terms.module.css";

export default function Loading() {
  return (
    <div className={styles.page}>
      <div className="container">
        <SectionTitle title="Terms & Conditions" />
        <div className={styles.loadingBox}>
          <SkeletonLine height={18} width="60%" />
          <SkeletonLine height={12} width="95%" />
          <SkeletonLine height={12} width="92%" />
          <SkeletonLine height={12} width="90%" />
          <SkeletonLine height={12} width="85%" />
          <SkeletonLine height={12} width="88%" />
        </div>
      </div>
    </div>
  );
}

