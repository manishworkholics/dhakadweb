import SectionTitle from "@/components/SectionTitle";
import { SkeletonCard } from "@/components/Skeleton";
import Header from "@/app/components/Header/Page";
import Footer from "@/app/components/Footer/page";

export default function Loading() {
  return (
    <div className="publicPageLayout">
      <Header />
      <div className="publicPageContent galleryPage">
        <div className="container">
          <SectionTitle title="Gallery" subtitle="Our moments" align="center" />
          <div className="galleryGrid">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
