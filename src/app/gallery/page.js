import SectionTitle from "@/components/SectionTitle";
import ImageCard from "@/components/ImageCard";
import styles from "./gallery.module.css";
import { fetchJson } from "@/lib/api";

export const metadata = {
  title: "Gallery | Dhakad Matrimony",
  description: "Explore our latest moments and event highlights.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getGallery() {
  const json = await fetchJson("/api/gallery", { cache: "no-store" });
  const list = Array.isArray(json?.gallery) ? json.gallery : [];
  return list
    .slice()
    .sort((a, b) => (Number(a?.order) || 0) - (Number(b?.order) || 0));
}

export default async function GalleryPage() {
  const gallery = await getGallery();

  return (
    <div className={styles.page}>
      <div className="container">
        <SectionTitle
          title="Gallery"
          subtitle="Our moments"
          align="center"
        />

        {gallery.length === 0 ? (
          <div className={styles.stateBox}>
            <p className={styles.stateTitle}>No gallery items yet</p>
            <p className={styles.stateText}>
              New photos will appear here as soon as they’re published.
            </p>
          </div>
        ) : (
          <div className={styles.grid}>
            {gallery.map((item, idx) => (
              <ImageCard
                key={item?._id || `${item?.image || "img"}-${idx}`}
                title={item?.title}
                image={item?.image}
                priority={idx < 4}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

