import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import SlotManager from "@/features/appointments/components/slot-manager";

export const metadata = {
  title: "Manage Slots",
};

export default function ManageSlotsPage() {
  return (
    <PageContainer
      pageTitle="Manage Slots"
      pageDescription="Mon–Sat, 10:00 AM – 4:30 PM. Disable a whole day or single slots; booked slots close automatically."
      pageHeaderAction={
        <Link
          href="/appointments?page=1&limit=10"
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          <ArrowLeft /> Appointments
        </Link>
      }
    >
      <SlotManager />
    </PageContainer>
  );
}
