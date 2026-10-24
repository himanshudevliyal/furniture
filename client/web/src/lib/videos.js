// Project walkthrough videos shown on the homepage.
// Files: /public/vedio/<slug>.mp4 (H.264, 720x1280) and poster
// /public/img/videos/<slug>.webp (frame picked from the video).

export const projectVideos = [
  {
    slug: "natraj-modern-office-tour",
    title: "Modern Office Tour",
    description:
      "Walk through a modern office furnished by Natraj — glass-partition cabins, open workstations with ergonomic chairs, a collaboration corner and a lounge.",
    duration: "PT3M55S",
    durationLabel: "3:55",
  },
  {
    slug: "natraj-orange-office-walkthrough",
    title: "Open-Plan Office Walkthrough",
    description:
      "An open-plan office with orange-accent workstations, executive cabins, storage and a pantry, designed and installed by Natraj Office Furniture.",
    duration: "PT1M12S",
    durationLabel: "1:12",
  },
  {
    slug: "natraj-open-plan-workstations",
    title: "Large Workstation Floor",
    description:
      "Rows of modular workstations with pedestals and privacy screens across a large open office floor, delivered by Natraj Office Furniture.",
    duration: "PT1M3S",
    durationLabel: "1:03",
  },
  {
    slug: "natraj-office-fitout-handover",
    title: "Office Fit-Out at Handover",
    description:
      "A freshly completed office fit-out at handover — workstations, meeting rooms and a cafeteria, with new chairs still in their protective covers.",
    duration: "PT38S",
    durationLabel: "0:38",
  },
].map((v) => ({
  ...v,
  src: `/vedio/${v.slug}.mp4`,
  poster: `/img/videos/${v.slug}.webp`,
  // Date the footage was recorded (from the original file names).
  uploadDate: "2026-10-22",
}));
