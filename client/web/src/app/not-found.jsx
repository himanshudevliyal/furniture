import { Section } from "@/components/layout/section";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NotFound(){
  return (
    <Section className="min-h-screen bg-white flex  justify-center">
      <div className="w-full max-w-6xl mx-auto text-center">

        {/* ERROR */}
        <p className="text-4xl md:text-5xl font-medium tracking-[3px] text-black">
          ERROR
        </p>

        {/* 404 IMAGE */}
        <div className="w-full max-w-5xl mx-auto ">
          <Image
            src="/img/404.png"
            width={500}
            height={500}

            alt="404 Page Not Found"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* PAGE NOT FOUND */}
        <h1 className="text-3xl  italic md:text-5xl font-medium tracking-[1px] text-black mb-5">
          PAGE NOT FOUND
        </h1>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

          <Link
            href="/"
            className="
              min-w-[190px]
              px-7 py-3.5
              bg-black
              text-white
              border border-black
              rounded-md
              font-medium
              text-base
              transition-all duration-300
              hover:bg-white
              hover:text-black
            "
          >
            Back to Home
          </Link>

          <Link
            href="/contact"
            className="
              min-w-[190px]
              px-7 py-3.5
              bg-white
              text-black
              border border-black
              rounded-md
              font-medium
              text-base
              transition-all duration-300
              hover:bg-black
              hover:text-white
            "
          >
            Contact Us
          </Link>

        </div>

      </div>
    </Section>
  );
};

