import LegalPage from "@/components/legal-page";

export const metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions for using the Natraj Office Furniture website and for orders, payments, delivery, installation, warranty and returns.",
  alternates: { canonical: "/terms" },
};

const intro = [
  "Welcome to Natraj Office Furniture. These Terms & Conditions (\"Terms\") govern your use of our website and the purchase of products and services from Natraj Office Furniture (\"Natraj\", \"we\", \"us\" or \"our\").",
  "By accessing our website, creating an account or placing an order, you agree to these Terms. If you do not agree, please do not use our website or services.",
];

const sections = [
  {
    id: "use-of-website",
    heading: "Use of the Website",
    body: [
      "You agree to use our website only for lawful purposes. You must not:",
      {
        list: [
          "Use the website in any way that breaks any applicable law or regulation.",
          "Attempt to gain unauthorised access to the website, its servers or any connected systems.",
          "Upload or send any harmful code, spam or misleading information.",
          "Copy, scrape or reproduce website content for commercial use without our written permission.",
        ],
      },
    ],
  },
  {
    id: "accounts",
    heading: "Your Account",
    body: [
      "When you create an account, you agree to provide accurate and complete information and to keep it up to date. You are responsible for keeping your password confidential and for all activity under your account. Please tell us immediately if you believe your account has been used without your permission.",
      "We may suspend or close accounts that are used fraudulently or in breach of these Terms.",
    ],
  },
  {
    id: "products-pricing",
    heading: "Products, Pricing & Quotations",
    body: [
      {
        list: [
          "We make every effort to show our products accurately. However, colours, wood grain, fabric texture and finishes may vary slightly from images because of screen settings and natural variation in materials.",
          "Dimensions shown are approximate and may vary within normal manufacturing tolerances.",
          "Prices are shown in Indian Rupees (INR). Unless stated otherwise, prices exclude GST, delivery and installation, which will be shown separately at checkout or in your quotation.",
          "Quotations are valid for the period stated on them, or 15 days if no period is stated.",
          "We may change prices, specifications and product availability without notice. Changes will not affect orders that have already been confirmed.",
          "If a product is listed at an incorrect price because of an error, we may cancel the order and refund any amount paid.",
        ],
      },
    ],
  },
  {
    id: "orders-payment",
    heading: "Orders & Payment",
    body: [
      "An order is confirmed only after we accept it and receive the required payment or advance. We may decline or cancel any order, for example if a product is unavailable or if we suspect fraud. In that case, any amount paid will be refunded in full.",
      "Online payments are processed securely by our payment partner, PayU. For bulk, project and customised orders, payment terms, including any advance, will be agreed in writing in the quotation or purchase order.",
    ],
  },
  {
    id: "customised-orders",
    heading: "Customised & Project Orders",
    body: [
      "Many of our products, such as workstations, storage and conference tables, are made to order based on your size, finish and layout requirements. For these orders:",
      {
        list: [
          "Production starts only after you approve the final drawings, specifications and finishes, and the agreed advance is received.",
          "Changes requested after approval may affect the price and delivery timeline.",
          "Customised products cannot be cancelled, returned or exchanged once production has started, except where they are defective.",
        ],
      },
    ],
  },
  {
    id: "delivery-installation",
    heading: "Delivery & Installation",
    body: [
      {
        list: [
          "Delivery timelines are estimates and begin from order confirmation. Made-to-order products may take longer than stock items. We will keep you informed of any delay.",
          "You are responsible for providing clear access to the delivery site, including lift or stair access, and for any permissions needed from your building management.",
          "Please inspect products at the time of delivery and note any visible damage or shortage on the delivery receipt. Report it to us within 48 hours of delivery.",
          "Where installation is included, our team will install the products at the agreed time. Site readiness, such as completed flooring, electrical and civil work, is the customer's responsibility. Extra visits caused by site delays may be charged.",
        ],
      },
    ],
  },
  {
    id: "returns-refunds",
    heading: "Cancellations, Returns & Refunds",
    body: [
      {
        list: [
          "Standard (non-customised) orders may be cancelled before dispatch. A cancellation charge may apply if the product has already been prepared for your order.",
          "If you receive a damaged, defective or incorrect product, report it within 48 hours of delivery with photographs. We will repair or replace it, or issue a refund if a repair or replacement is not possible.",
          "Products that have been used, assembled by a third party, altered or damaged after delivery cannot be returned.",
          "Approved refunds are made to the original payment method within 7 to 10 working days of approval.",
        ],
      },
    ],
  },
  {
    id: "warranty",
    heading: "Warranty",
    body: [
      "Our products carry a warranty against manufacturing defects for the period stated on the product page, quotation or invoice. The warranty does not cover:",
      {
        list: [
          "Normal wear and tear, including fading, scratches and fabric wear.",
          "Damage caused by misuse, overloading, accidents, moisture, pests or exposure to heat or direct sunlight.",
          "Products that have been repaired, modified or moved and reinstalled by anyone other than our team.",
        ],
      },
      "To make a warranty claim, contact us with your invoice number and photographs of the issue. We will inspect the product and repair or replace the affected part at our discretion.",
    ],
  },
  {
    id: "intellectual-property",
    heading: "Intellectual Property",
    body: [
      "All content on this website, including text, photographs, product designs, drawings, logos and graphics, belongs to Natraj Office Furniture or is used with permission. You may not copy, reproduce, distribute or use any of it for commercial purposes without our prior written consent. Layouts and drawings we prepare for your project remain our property until the project is paid for in full.",
    ],
  },
  {
    id: "liability",
    heading: "Limitation of Liability",
    body: [
      "To the extent permitted by law, we are not liable for any indirect, incidental or consequential loss, such as loss of business or profit, arising from the use of our website or products. Our total liability for any claim relating to an order will not exceed the amount you paid for that order.",
      "We are not responsible for delays or failure to perform caused by events beyond our reasonable control, such as natural disasters, strikes, transport disruption or government restrictions.",
    ],
  },
  {
    id: "privacy",
    heading: "Privacy",
    body: [
      "Your use of our website is also governed by our Privacy Policy, which explains how we collect and use your personal information.",
    ],
  },
  {
    id: "governing-law",
    heading: "Governing Law & Disputes",
    body: [
      "These Terms are governed by the laws of India. We will always try to resolve any concern with you directly first. Any dispute that cannot be resolved amicably will be subject to the exclusive jurisdiction of the courts in New Delhi.",
    ],
  },
  {
    id: "changes",
    heading: "Changes to These Terms",
    body: [
      "We may update these Terms from time to time. The updated version will be posted on this page with a revised \"Last updated\" date. Continuing to use our website after changes are posted means you accept the updated Terms.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      href="/terms"
      updated="26 October 2026"
      intro={intro}
      sections={sections}
    />
  );
}
