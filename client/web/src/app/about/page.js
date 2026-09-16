import { BreadcrumbBanner } from "@/components/breadcrumb";
import Heading from "@/components/layout/heading";
import { Section } from "@/components/layout/section";
import Image from "next/image";
  import {
  BadgeCheck,
  SlidersHorizontal,
  Headset,
} from "lucide-react";
import NatrajTimeline from "@/components/timeline-Section";


export default function AboutPage() {
  return (
    <>
      {/* Breadcrumb Banner */}
      <BreadcrumbBanner
        title="About Us"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about-us" },
        ]}
      />

      {/* About Section */}
      <Section className="bg-[#f4f0eb] ">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* Image */}
          <div className=" overflow-hidden">
            <Image
              src="/img/about.jpg"
              alt="Natraj Office Furniture"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex items-center px-6 py-16 sm:px-10 lg:px-16 xl:px-20">
            <div className="w-full ">
              
              <Heading
                eyebrow="ABOUT US"
                heading="CREATING BETTER WORKSPACES SINCE 1989"
                subheading="Natraj Office Furniture is a leading designer and manufacturer of office furniture, offering thoughtfully designed workstations, desks, seating and storage solutions for modern workplaces."
                eyebrowClassName="!justify-start"
                headingClassName="text-xl sm:text-2xl lg:text-4xl !font-normal !leading-[1]"
                subheadingClassName="text-base sm:text-lg leading-[1.7]"
                className="!text-left !max-w-none"
              />

              <div className="mt-6 space-y-5">
                <p className="text-base sm:text-lg leading-[1.7] ">
                  With decades of experience, we combine quality materials,
                  practical design and customization to create furniture
                  tailored to the unique needs of every organization.
                </p>

                <p className="text-base sm:text-lg leading-[1.7] ">
                  From concept and manufacturing to delivery and after-sales
                  support, our focus remains on delivering exceptional quality,
                  personalized solutions and dependable service.
                </p>
              </div>

            </div>
          </div>
        </div>
      </Section>

      {/* Our Approach Section */}


<Section className="bg-white">
  <Heading
    eyebrow="OUR APPROACH"
    heading="DESIGNED FOR THE WAY YOU WORK"
    subheading="We believe great office furniture should balance aesthetics, comfort, functionality and durability."
    eyebrowClassName="justify-center"
    headingClassName="text-3xl sm:text-4xl lg:text-5xl"
    className="max-w-5xl mx-auto text-center"
  />

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12">

    {/* Quality */}
    <div className="p-8 lg:p-10 border border-gray-200 text-center">
      <div className="w-16 h-16 mx-auto mb-7 rounded-full bg-[#f4f0eb] flex items-center justify-center">
        <BadgeCheck
          size={32}
          strokeWidth={1.5}
         
        />
      </div>

      <h3 className="text-2xl lg:text-3xl font-medium  mb-5">
        Quality
      </h3>

      <p className="text-lg lg:text-xl leading-8 ">
        Carefully selected materials and thoughtful manufacturing
        processes ensure furniture that is built for everyday use,
        comfort and lasting performance.
      </p>
    </div>

    {/* Customisation */}
    <div className="p-8 lg:p-10 border border-gray-200 text-center">
      <div className="w-16 h-16 mx-auto mb-7 rounded-full bg-[#f4f0eb] flex items-center justify-center">
        <SlidersHorizontal
          size={32}
          strokeWidth={1.5}
        />
      </div>

      <h3 className="text-2xl lg:text-3xl font-medium  mb-5">
        Customisation
      </h3>

      <p className="text-lg lg:text-xl leading-8 ">
        Flexible furniture solutions designed around your workplace,
        allowing you to create spaces that match your requirements,
        layout and working style.
      </p>
    </div>

    {/* Service */}
    <div className="p-8 lg:p-10 border border-gray-200 text-center">
      <div className="w-16 h-16 mx-auto mb-7 rounded-full bg-[#f4f0eb] flex items-center justify-center">
        <Headset
          size={32}
          strokeWidth={1.5}
          
        />
      </div>

      <h3 className="text-2xl lg:text-3xl font-medium  mb-5">
        Service
      </h3>

      <p className="text-lg lg:text-xl leading-8 ">
        From planning and delivery to after-sales support, we remain
        committed to providing a smooth, reliable and dependable
        experience at every stage.
      </p>
    </div>

  </div>
</Section>

<NatrajTimeline></NatrajTimeline>
    </>
  );
}