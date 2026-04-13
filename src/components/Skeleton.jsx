import styles from "./Skeleton.module.css";

export function SkeletonLine({ width = "100%", height = 12, className = "" }) {
  return (
    <div
      className={[styles.shimmer, className].join(" ")}
      style={{ width, height }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={styles.media} />
      <div className={styles.body}>
        <SkeletonLine width="70%" height={14} />
        <SkeletonLine width="45%" height={12} className={styles.mt} />
      </div>
    </div>
  );
}

