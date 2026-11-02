"use client";

import { useState } from "react";
import type { Listing } from "@/types/listing";

type RoomPhotoGalleryProps = {
  listing: Listing;
};

const photoLabels = ["Vista principal", "Sala de estar", "Dormitorio", "Cocina"];

const photoTones: Record<Listing["photoTone"], string> = {
  ocean: "bg-gradient-to-br from-cyan-300 via-blue-400 to-sky-700",
  rose: "bg-gradient-to-br from-rose-200 via-orange-200 to-amber-500",
  forest: "bg-gradient-to-br from-lime-300 via-emerald-500 to-green-900",
  sand: "bg-gradient-to-br from-yellow-100 via-orange-200 to-amber-700",
  lavender: "bg-gradient-to-br from-fuchsia-200 via-violet-400 to-indigo-700",
  sky: "bg-gradient-to-br from-sky-100 via-cyan-300 to-blue-600",
};

export function RoomPhotoGallery({ listing }: RoomPhotoGalleryProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const photoCount = photoLabels.length;
  const changePhoto = (direction: -1 | 1) => {
    setActivePhotoIndex((current) => (current + direction + photoCount) % photoCount);
  };

  return (
    <section aria-label="Galería de fotos" className="relative">
      <div
        role="img"
        aria-label={`${photoLabels[activePhotoIndex]} de ${listing.title}`}
        className={`aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[16/8] ${photoTones[listing.photoTone]}`}
      >
        <div aria-hidden="true" className="h-full w-full opacity-50 [background-image:radial-gradient(circle_at_25%_30%,white_0,transparent_35%),linear-gradient(145deg,transparent_50%,rgba(0,0,0,.25))]" />
      </div>
      <button
        type="button"
        aria-label="Foto anterior"
        onClick={() => changePhoto(-1)}
        className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white text-xl shadow-md hover:bg-neutral-100"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Foto siguiente"
        onClick={() => changePhoto(1)}
        className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white text-xl shadow-md hover:bg-neutral-100"
      >
        ›
      </button>
      <p className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
        {activePhotoIndex + 1} / {photoCount}
      </p>
    </section>
  );
}
