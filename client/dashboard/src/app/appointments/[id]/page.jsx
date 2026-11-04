import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import AppointmentDetails from "@/features/appointments/components/appointment-details";

export const metadata = {
  title: "Appointment",
};

export default async function AppointmentDetailsPage({ params }) {
  const { id } = await params;

  return (
    <PageContainer
      pageTitle="Appointment"
      pageDescription="Full details of this booking."
      pageHeaderAction={
        <Link
          href="/appointments?page=1&limit=10"
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          <ArrowLeft /> Back
        </Link>
      }
    >
      <AppointmentDetails id={id} />
    </PageContainer>
  );
}
