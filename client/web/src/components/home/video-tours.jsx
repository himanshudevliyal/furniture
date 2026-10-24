import Heading from "@/components/layout/heading";
import { Section } from "@/components/layout/section";
import { projectVideos } from "@/lib/videos";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import VideoToursGrid from "./video-tours-grid";

// Homepage "Project walkthroughs" section. Includes VideoObject structured
// data so search engines can index the videos.
export default function VideoTours() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": projectVideos.map((v) => ({
      "@type": "VideoObject",
      name: v.title,
      description: v.description,
      thumbnailUrl: `${SITE_URL}${v.poster}`,
      contentUrl: `${SITE_URL}${v.src}`,
      uploadDate: v.uploadDate,
      duration: v.duration,
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    })),
  };

  return (
    <Section className="bg-[#F7F4EF] sm:py-20">
      <Heading
        eyebrow="VIDEO TOURS"
        heading="SEE OUR WORK IN MOTION"
        subheading="Walk through a few of the offices we have furnished — workstations, cabins, meeting rooms and breakout spaces."
        eyebrowClassName="justify-center"
        headingClassName="text-3xl sm:text-4xl lg:text-5xl"
        className="mx-auto max-w-4xl text-center"
      />

      <VideoToursGrid videos={projectVideos} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Section>
  );
}
