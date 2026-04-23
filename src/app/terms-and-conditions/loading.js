import SectionTitle from "@/components/SectionTitle";
import { SkeletonLine } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="termsPage">
      <div className="container">
        <SectionTitle title="Terms & Conditions" />
        <div className="termsLoadingBox">
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
