import styles from "./SectionTitle.module.css";

export default function SectionTitle({ title, subtitle, align = "center" }) {
  return (
    <div
      className={[
        styles.wrap,
        align === "left" ? styles.left : styles.center,
      ].join(" ")}
    >
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      <h1 className={styles.title}>
        <span className={styles.highlight}>{title}</span>
      </h1>
      <div className={styles.divider} />
    </div>
  );
}

