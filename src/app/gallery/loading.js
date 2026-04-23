import SectionTitle from "@/components/SectionTitle";
import { SkeletonCard } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="galleryPage">
      <div className="container">
        <SectionTitle title="Gallery" subtitle="Our moments" align="center" />
        <div className="galleryGrid">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
