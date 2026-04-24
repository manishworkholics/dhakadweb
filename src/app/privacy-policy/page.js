import SectionTitle from "@/components/SectionTitle";
import { fetchJson } from "@/lib/api";
import Header from "@/app/components/Header/Page";
import Footer from "@/app/components/Footer/page";

export const metadata = {
  title: "Privacy Policy | Dhakad Matrimony",
  description: "Read the Privacy Policy for using Dhakad Matrimony.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const defaultPrivacyContent = `
 
 <h1>Privacy Policy - Dhakad Matrimony</h1>

<h2>Welcome to our Privacy Policy</h2>
<p>
Dhakad Matrimony recognises the importance of maintaining your privacy. We value your personal information & privacy and appreciate your trust in us.
</p>

<p>
This Privacy Policy sets out how Dhakad Matrimony uses and protects any information that you give Dhakad Matrimony when you use www.dhakadmatrimony.com, the Dhakad Matrimony mobile application, or any other digital medium and offline sources of our Company.
</p>

<p>
Dhakad Matrimony is committed to ensuring that your privacy is protected. Any information collected will be used only in accordance with this Privacy Policy.
</p>

<p>
This policy describes how we treat user information we collect from you, including policies and procedures on the collection, use, disclosure, and protection of your information when you use our platform.
</p>

<p>
This Privacy Policy applies to current and former visitors and customers. By visiting or using our platform, you agree to this Privacy Policy.
</p>

<p>
Dhakad Matrimony may update this policy from time to time. Please review this page periodically to stay updated.
</p>

<p>
www.dhakadmatrimony.com is a property of Dhakad Matrimony Private Limited, established under the laws of India, with its registered office in Indore, Madhya Pradesh - 452011.
</p>

---

<h2>Definitions</h2>

<p><strong>Dhakad Matrimony / Company / We / Us / Our:</strong> Refers to Dhakad Matrimony.</p>

<p><strong>Platform:</strong> Refers to website, mobile application, and all digital/offline services.</p>

<p><strong>User / You:</strong> Refers to any person using the platform.</p>

<p><strong>Group:</strong> Any entity directly or indirectly controlled or related under applicable law.</p>

<p><strong>Services:</strong> Any services provided by Dhakad Matrimony.</p>

<p><strong>Policy:</strong> Refers to this Privacy Policy.</p>

---

<p>
Please read this Policy carefully before using the platform. This Policy is part of and should be read along with our Terms of Use:
<a href="https://www.dhakadmatrimony.com/Home/term">Terms of Use</a>
</p>

---

<h2>1. Information We Collect</h2>
<p>
We may collect personal information such as name, age, gender, contact details, profile information, and photos to provide matchmaking services.
</p>

<h2>2. Ways of Collecting Information</h2>
<p>
Information is collected when you register, create a profile, upload details, or interact with our services.
</p>

<h2>3. Use of Personal Information</h2>
<p>
Your information is used to provide matchmaking services, improve user experience, communicate updates, and ensure platform safety.
</p>

<h2>4. Sharing of Information</h2>
<p>
We do not sell your personal data. Information may be shared with other users as part of the service or with authorities if required by law.
</p>

<h2>5. Your Consent</h2>
<p>
By using our platform, you consent to the collection and use of your information as described in this policy.
</p>

<h2>6. Cookies</h2>
<p>
We may use cookies to enhance user experience and improve our services.
</p>

<h2>7. Data Security</h2>
<p>
We implement reasonable security practices to protect your data from unauthorized access.
</p>

<h2>8. Email Opt-Out</h2>
<p>
Users can opt out of promotional communications at any time.
</p>

<h2>9. Third-Party Sites</h2>
<p>
Our platform may contain links to third-party websites. We are not responsible for their privacy practices.
</p>

<h2>10. Policy Updates</h2>
<p>
We may update this policy from time to time. Changes will be posted on this page.
</p>

<h2>11. Contact Details</h2>
<p>
For any questions or concerns regarding this policy, please contact us.
</p>
`;

async function getPrivacyPolicy() {
  try {
    const json = await fetchJson("/api/privacy-policy", { cache: "no-store" });
    return json?.data || null;
  } catch {
    return null;
  }
}

export default async function PrivacyPolicyPage() {
  const policy = await getPrivacyPolicy();
  const title = policy?.title || "Privacy Policy";
  const content = policy?.content || defaultPrivacyContent;

  return (
    <div className="publicPageLayout">
      <Header />
      <div className="publicPageContent termsPage">
        <div className="container">
          <SectionTitle title={title} />
          <article
            className="termsContent"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
