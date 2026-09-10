"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Section } from "./layout/section";

const testimonials = [
  {
    name: "Mr. Akash Kohli",
    image: "/img/residential.jpg",
    video: "https://www.youtube.com/embed/YOUR_VIDEO_ID_1",
  },
  {
    name: "Ar. Saumitra Agarwal",
    image: "/img/residential.jpg",
    video: "https://www.youtube.com/embed/YOUR_VIDEO_ID_2",
  },
  {
    name: "Mr. Udit Agarwal",
    image: "/img/residential.jpg",
    video: "https://www.youtube.com/embed/YOUR_VIDEO_ID_3",
  },
  {
    name: "Mr. Debasis Sarangi",
    image: "/img/residential.jpg",
    video: "https://www.youtube.com/embed/YOUR_VIDEO_ID_4",
  },
  {
    name: "Mr. Lokendra Tomar",
    image: "/img/residential.jpg",
    video: "https://www.youtube.com/embed/YOUR_VIDEO_ID_5",
  },
  {
    name: "Mr. Yojit Pareek",
    image: "/img/residential.jpg",
    video: "https://www.youtube.com/embed/YOUR_VIDEO_ID_6",
  },
];

export default function Testimonials() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <Section >
     
        {/* Heading */}
        
 <div className="mx-auto max-w-5xl px-5 text-center sm:px-8  mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[11px] font-medium tracking-wide text-neutral-500">
          <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
          TESTIMONIAL
        </span>
        <h2
          id="testimonials-heading"
          className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl"
        >
          What They&rsquo;re Saying
        </h2>
      </div>
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedVideo(testimonial.video)}
              className="group relative block h-[280px] w-full overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 md:h-[285px]"
            >
              {/* Image */}
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Dark Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

              {/* Play Button */}
              <div className="absolute bottom-7 left-6 flex items-center gap-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-white/80 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
                  <Play
                    size={19}
                    strokeWidth={2}
                    fill="white"
                    className="ml-0.5 text-white"
                  />
                </span>

                {/* Name */}
                <span className="text-base font-semibold text-white md:text-[17px]">
                  {testimonial.name}
                </span>
              </div>
            </button>
          ))}
        </div>
  

      {/* Video Popup */}
      <Dialog
        open={!!selectedVideo}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedVideo(null);
          }
        }}
      >
        <DialogContent className="max-w-5xl border-0 bg-black p-0 overflow-hidden">
          <DialogTitle className="sr-only">
            Client Testimonial Video
          </DialogTitle>

          {selectedVideo && (
            <div className="relative aspect-video w-full">
              <iframe
                src={`${selectedVideo}?autoplay=1&rel=0`}
                title="Client Testimonial Video"
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  );
}