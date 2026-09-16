"use client";

export default function HeroSlider() {
  return (
    <div className="relative h-[82vh] w-full overflow-hidden ">
    <div className="absolute inset-0 bg-black/20" />
      <video
        className=" h-full w-full object-cover"
        src="/vedio/banner-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
    </div>
  );
}
