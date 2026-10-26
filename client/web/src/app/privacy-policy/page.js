import LegalPage from "@/components/legal-page";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How Natraj Office Furniture collects, uses, stores and protects the personal information you share with us through our website, enquiries and orders.",
  alternates: { canonical: "/privacy-policy" },
};

const intro = [
  "Natraj Office Furniture (\"Natraj\", \"we\", \"us\" or \"our\") respects your privacy. This Privacy Policy explains what personal information we collect when you visit our website, create an account, send an enquiry, request a quote, apply for a job or place an order, and how we use and protect that information.",
  "By using our website or sharing your information with us, you agree to the practices described in this policy. This policy is published in accordance with the Information Technology Act, 2000, the rules made under it, and the Digital Personal Data Protection Act, 2023.",
];

const sections = [
  {
    id: "information-we-collect",
    heading: "Information We Collect",
    body: [
      "We collect only the information we need to respond to you and serve you well. Depending on how you use our website, this may include:",
      {
        list: [
          "Contact details: your name, email address, phone number, company name and city, shared through our contact, enquiry and project quote forms.",
          "Account details: your name, email address, phone number and password when you sign up. Passwords are stored in encrypted form and are never visible to our staff.",
          "Order details: billing and delivery addresses, GST number (if provided), products ordered and order history.",
          "Job applications: your CV and the details you provide when applying through our Careers page.",
          "Technical information: your IP address, browser type, device information and the pages you visit, collected automatically when you browse our website.",
        ],
      },
      "We do not collect or store your card, UPI or net banking details. Payments are processed directly by our payment partner, as described below.",
    ],
  },
  {
    id: "how-we-use",
    heading: "How We Use Your Information",
    body: [
      "We use your information to:",
      {
        list: [
          "Respond to your enquiries and prepare quotations, layouts and project proposals.",
          "Process, deliver, install and support your orders, including warranty and after-sales service.",
          "Create and manage your account and keep you signed in securely.",
          "Evaluate job applications and contact shortlisted candidates.",
          "Send you order updates, and, where you have agreed, information about new products and offers. You can opt out of promotional messages at any time.",
          "Improve our website, products and services, and keep our website secure.",
          "Meet our legal, tax and accounting obligations.",
        ],
      },
    ],
  },
  {
    id: "payments",
    heading: "Payments",
    body: [
      "Online payments on our website are processed by PayU, a third-party payment gateway. When you pay, you are redirected to PayU's secure page and your payment details are handled by PayU under its own privacy policy and security standards. We only receive confirmation of whether the payment succeeded, along with a transaction reference.",
    ],
  },
  {
    id: "cookies",
    heading: "Cookies",
    body: [
      "Cookies are small files stored on your device. We use essential cookies to keep you signed in to your account, remember your cart and keep our website secure. These cookies are necessary for the website to work properly.",
      "You can block or delete cookies through your browser settings, but some parts of the website, such as signing in and checkout, may not work without them.",
    ],
  },
  {
    id: "sharing",
    heading: "How We Share Your Information",
    body: [
      "We do not sell, rent or trade your personal information. We share it only where needed to serve you, with:",
      {
        list: [
          "Delivery, logistics and installation partners, to deliver and set up your order.",
          "Our payment gateway partner, to process your payment.",
          "Service providers who host our website, store data or send emails on our behalf, under obligations to keep your data confidential.",
          "Government or law enforcement authorities, where we are required to do so by law.",
        ],
      },
    ],
  },
  {
    id: "security",
    heading: "Data Security",
    body: [
      "We use reasonable technical and organisational measures to protect your information, including encrypted connections (HTTPS), encrypted passwords and restricted access to personal data within our team. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    id: "retention",
    heading: "Data Retention",
    body: [
      "We keep your information only as long as it is needed for the purpose it was collected for, or as required by law. Order and invoice records are retained for the period required under Indian tax and accounting laws. Job applications are retained for up to 12 months so that we can contact you about future openings, unless you ask us to delete them sooner.",
    ],
  },
  {
    id: "your-rights",
    heading: "Your Rights",
    body: [
      "You have the right to:",
      {
        list: [
          "Access the personal information we hold about you.",
          "Ask us to correct or update information that is inaccurate or incomplete.",
          "Ask us to delete your information, subject to our legal obligations.",
          "Withdraw your consent to promotional communication at any time.",
          "Raise a grievance about how your information has been handled.",
        ],
      },
      "To exercise any of these rights, write to us at sales@natrajfurniture.com. We will respond within a reasonable time.",
    ],
  },
  {
    id: "third-party-links",
    heading: "Third-Party Links",
    body: [
      "Our website may contain links to other websites, such as our social media pages. We are not responsible for the content or privacy practices of those websites, and we encourage you to read their privacy policies.",
    ],
  },
  {
    id: "children",
    heading: "Children's Privacy",
    body: [
      "Our website and services are intended for businesses and adults. We do not knowingly collect personal information from anyone under 18 years of age.",
    ],
  },
  {
    id: "changes",
    heading: "Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised \"Last updated\" date. We encourage you to review this page periodically.",
    ],
  },
  {
    id: "grievance-officer",
    heading: "Grievance Officer",
    body: [
      "If you have any questions, concerns or complaints about this Privacy Policy or how your information is handled, please contact our Grievance Officer:",
      {
        list: [
          "Natraj Office Furniture, Plot No. C 40, DDA Sheds, Okhla Industrial Area, Phase 1, New Delhi 110020",
          "Email: sales@natrajfurniture.com",
          "Phone: +91 9810438876",
        ],
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      href="/privacy-policy"
      updated="26 October 2026"
      intro={intro}
      sections={sections}
    />
  );
}
