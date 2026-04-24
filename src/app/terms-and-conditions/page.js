import SectionTitle from "@/components/SectionTitle";
import { fetchJson } from "@/lib/api";
import Header from "@/app/components/Header/Page";
import Footer from "@/app/components/Footer/page";

export const metadata = {
  title: "Terms & Conditions | Dhakad Matrimony",
  description: "Read the Terms & Conditions for using Dhakad Matrimony.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getTerms() {
  const json = await fetchJson("/api/terms", { cache: "no-store" });
  return json?.data || null;
}

export default async function TermsAndConditionsPage() {
  const terms = await getTerms();

  return (
    <div className="publicPageLayout">
      <Header />
      <div className="publicPageContent termsPage">
        <div className="container">
          <SectionTitle title={terms?.title || "Terms & Conditions"} />

          {!terms?.content ? (
            <div className="termsStateBox">
              <p className="termsStateTitle">No terms available</p>
              <p className="termsStateText">
                Please check back later. If this keeps happening, contact support.
              </p>
            </div>
          ) : (
            <article
              className="termsContent"
              dangerouslySetInnerHTML={{ __html: terms.content }}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
