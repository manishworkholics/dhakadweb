import SectionTitle from "@/components/SectionTitle";
import { SkeletonLine } from "@/components/Skeleton";
import Header from "@/app/components/Header/Page";
import Footer from "@/app/components/Footer/page";

export default function Loading() {
  return (
    <div className="publicPageLayout">
      <Header />
      <div className="publicPageContent termsPage">
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
      <Footer />
    </div>
  );
}
