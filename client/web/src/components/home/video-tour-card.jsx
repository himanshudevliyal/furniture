"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

// Shows the poster with a play button. Nothing is downloaded until the
// visitor presses play; the video then plays muted (sound can be turned on
// from the controls). Starting one video pauses the others.
export default function VideoTourCard({ video, playingSlug, onPlay }) {
  const [started, setStarted] = useState(false);
  const videoRef = useRef(null);

  // Another card started playing -> pause this one.
  useEffect(() => {
    if (started && playingSlug !== video.slug) videoRef.current?.pause();
  }, [playingSlug, started, video.slug]);

  const start = () => {
    setStarted(true);
    onPlay(video.slug);
  };

  return (
    <figure className="group relative aspect-[9/16] w-full overflow-hidden rounded-[20px] bg-neutral-900">
      {started ? (
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          title={video.title}
          aria-label={video.title}
          controls
          muted
          playsInline
          autoPlay
          preload="metadata"
          onPlay={() => onPlay(video.slug)}
          className="h-full w-full object-cover"
        />
      ) : (
        <button
          type="button"
          onClick={start}
          aria-label={`Play video: ${video.title} (${video.durationLabel})`}
          className="absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900"
        >
          <Image
            src={video.poster}
            alt={`${video.title} — video poster`}
            fill
            sizes="(max-width: 640px) 75vw, (max-width: 1024px) 40vw, 300px"
            className="object-cover"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/10 transition-colors duration-500 group-hover:from-black/80"
          />
          {/* Play button */}
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-neutral-900 shadow-lg ring-8 ring-white/25 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          >
            <Play className="ml-1 h-6 w-6 fill-current" />
          </span>
          {/* Duration */}
          <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium tabular-nums text-white">
            {video.durationLabel}
          </span>
          {/* Title */}
          <span className="absolute inset-x-0 bottom-0 p-5 text-left">
            <span className="block text-lg font-semibold leading-snug text-white">
              {video.title}
            </span>
          </span>
        </button>
      )}
      <figcaption className="sr-only">{video.description}</figcaption>
    </figure>
  );
}
