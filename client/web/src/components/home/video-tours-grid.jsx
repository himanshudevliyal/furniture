"use client";

import { useState } from "react";
import VideoTourCard from "./video-tour-card";

// Keeps track of which video is playing so only one plays at a time.
export default function VideoToursGrid({ videos }) {
  const [playingSlug, setPlayingSlug] = useState(null);

  return (
    <ul className="-mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4 lg:gap-6 [&::-webkit-scrollbar]:hidden">
      {videos.map((video) => (
        <li key={video.slug} className="w-[72%] shrink-0 snap-center sm:w-auto">
          <VideoTourCard
            video={video}
            playingSlug={playingSlug}
            onPlay={setPlayingSlug}
          />
        </li>
      ))}
    </ul>
  );
}
