"use client";

import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";

import ProjectQuoteForm from "@/components/form/project-quote-form";

// Request Project Quote popup.
// Navbar z-[9999] par hai, isliye popup uske upar z-[10000] par rakha hai.
export default function ProjectQuoteDialog({ open, onOpenChange, category }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[10000] bg-black/50 backdrop-blur-sm transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />

        <Dialog.Popup className="fixed left-1/2 top-1/2 z-[10000] max-h-[calc(100svh-2rem)] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-white shadow-2xl outline-none transition-all duration-200 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
          {/* Header */}
          <div className="relative border-t-4 border-[#e30613] px-6 pb-4 pt-6 sm:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e30613]">
              Get a quote
            </p>
            <Dialog.Title className="mt-1 text-xl font-semibold text-neutral-900 sm:text-2xl">
              Request Project Quote
            </Dialog.Title>
            <Dialog.Description className="mt-1.5 text-sm text-neutral-500">
              Share a few details and our team will prepare a quote for your
              workspace.
            </Dialog.Description>

            {category && (
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#e30613]/10 px-3 py-1 text-xs font-medium text-[#e30613]">
                Enquiry for: {category}
              </span>
            )}

            <Dialog.Close
              aria-label="Close"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e30613]/40"
            >
              <X className="h-5 w-5" aria-hidden />
            </Dialog.Close>
          </div>

          {/* Body */}
          <div className="border-t border-neutral-100 px-6 py-5 sm:px-8 sm:py-6">
            <ProjectQuoteForm key={category} category={category} />
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
