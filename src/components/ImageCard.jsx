import styles from "./ImageCard.module.css";

export default function ImageCard({ title, image, priority = false }) {
  return (
    <figure className={styles.card}>
      <div className={styles.media}>
        {/* Using <img> keeps this working with any remote host without next/image config */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title || "Gallery image"}
          className={styles.img}
          loading={priority ? "eager" : "lazy"}
        />
        <div className={styles.overlay} />
      </div>
      <figcaption className={styles.caption}>
        <div className={styles.title}>{title || "Untitled"}</div>
      </figcaption>
    </figure>
  );
}

