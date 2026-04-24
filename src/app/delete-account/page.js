import SectionTitle from "@/components/SectionTitle";
import Header from "@/app/components/Header/Page";
import Footer from "@/app/components/Footer/page";

export const metadata = {
  title: "Delete Account | Dhakad Matrimony",
  description: "Request account deletion for Dhakad Matrimony.",
};

const deleteAccountContent = `
  <h1>Delete Account</h1>
  <p>
    Users can request account deletion by emailing us at dhakarmatrimonial@gmail.com.
  </p>
  <p>
    We will permanently delete your account and associated data within 7 days.
  </p>
`;

export default function DeleteAccountPage() {
  return (
    <div className="publicPageLayout">
      <Header />
      <div className="publicPageContent termsPage">
        <div className="container">
          <SectionTitle title="Delete Account" />
          <article
            className="termsContent"
            dangerouslySetInnerHTML={{ __html: deleteAccountContent }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
