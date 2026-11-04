import { BreadcrumbBanner } from "@/components/breadcrumb";
import BookSlotForm from "@/components/form/book-slot-form";
import Heading from "@/components/layout/heading";
import { Section } from "@/components/layout/section";

export const metadata = {
  title: "Book Your Slot",
  description:
    "Book a time to visit the Natraj Office Furniture Experience Centre or talk to our team. Monday to Saturday, 10:00 AM to 4:30 PM.",
  alternates: { canonical: "/book-your-slot" },
};

export default function BookYourSlotPage() {
  return (
    <>
   

      <Section className="bg-white">
        <Heading
          eyebrow="BOOK A VISIT"
          heading="Book Your Slot"
          subheading="Pick a date and time that suits you. Our team will call you to confirm your visit."
          eyebrowClassName="justify-center"
          className="mx-auto max-w-3xl text-center"
        />

        <div className="mx-auto mt-10 max-w-5xl rounded-md border-t-4 border-[#E87717] bg-white p-5 shadow-sm ring-1 ring-neutral-200 sm:p-8 lg:p-10">
          <BookSlotForm />
        </div>
      </Section>
    </>
  );
}
