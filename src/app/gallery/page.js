import SectionTitle from "@/components/SectionTitle";
import ImageCard from "@/components/ImageCard";
import { fetchJson } from "@/lib/api";
import Header from "@/app/components/Header/Page";
import Footer from "@/app/components/Footer/page";

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
    <div className="publicPageLayout">
      <Header />
      <div className="publicPageContent galleryPage">
        <div className="container">
          <SectionTitle
            title="Gallery"
            subtitle="Our moments"
            align="center"
          />

          {gallery.length === 0 ? (
            <div className="galleryStateBox">
              <p className="galleryStateTitle">No gallery items yet</p>
              <p className="galleryStateText">
                New photos will appear here as soon as they&apos;re published.
              </p>
            </div>
          ) : (
            <div className="galleryGrid">
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
      <Footer />
    </div>
  );
}
