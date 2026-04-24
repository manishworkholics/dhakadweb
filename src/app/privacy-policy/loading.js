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
          <SectionTitle title="Privacy Policy" />
          <div className="termsLoadingBox">
            <SkeletonLine height={18} width="58%" />
            <SkeletonLine height={12} width="95%" />
            <SkeletonLine height={12} width="91%" />
            <SkeletonLine height={12} width="89%" />
            <SkeletonLine height={12} width="86%" />
            <SkeletonLine height={12} width="83%" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
