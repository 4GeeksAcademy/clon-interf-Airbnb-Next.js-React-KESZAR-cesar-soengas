import Link from "next/link";
import type { Listing } from "@/types/listing";

type ListingCardProps = {
  listing: Listing;
};

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <article className="relative min-w-0">
      <Link href={`/rooms/${listing.id}`} className="group block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900">
        <div
          role="img"
          aria-label={`Imagen ilustrativa: ${listing.title}`}
          className={`relative aspect-square overflow-hidden rounded-xl ${photoTones[listing.photoTone]}`}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_25%_30%,white_0,transparent_35%),linear-gradient(145deg,transparent_50%,rgba(0,0,0,.2))]"
          />
        </div>
        <div className="mt-3 flex items-start justify-between gap-2">
          <h2 className="truncate text-sm font-semibold text-neutral-900 group-hover:underline">
            {listing.title}
          </h2>
          <p className="flex shrink-0 items-center gap-1 text-sm text-neutral-800">
            <span aria-hidden="true" className="text-xs">★</span>
            {listing.rating.toFixed(2)}
          </p>
        </div>
        <p className="mt-1 truncate text-sm text-neutral-500">{listing.location}</p>
        <p className="mt-2 text-sm text-neutral-900">
          <span className="font-semibold">${listing.nightlyPrice}</span> por noche
        </p>
      </Link>
      <div className="pointer-events-none absolute left-0 right-0 top-0 aspect-square">
        <button
          type="button"
          aria-label={`Guardar ${listing.title} en favoritos`}
          className="pointer-events-auto absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-white drop-shadow-[0_1px_2px_rgba(0,0,0,.8)] transition hover:scale-110"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-6 w-6 fill-black/30 stroke-white"
            strokeWidth="1.8"
          >
            <path d="M20.8 8.8c0 5.5-8.8 11-8.8 11s-8.8-5.5-8.8-11a4.7 4.7 0 0 1 8.8-2.3 4.7 4.7 0 0 1 8.8 2.3Z" />
          </svg>
        </button>
      </div>
    </article>
  );
}

const photoTones: Record<Listing["photoTone"], string> = {
  ocean: "bg-gradient-to-br from-cyan-300 via-blue-400 to-sky-700",
  rose: "bg-gradient-to-br from-rose-200 via-orange-200 to-amber-500",
  forest: "bg-gradient-to-br from-lime-300 via-emerald-500 to-green-900",
  sand: "bg-gradient-to-br from-yellow-100 via-orange-200 to-amber-700",
  lavender: "bg-gradient-to-br from-fuchsia-200 via-violet-400 to-indigo-700",
  sky: "bg-gradient-to-br from-sky-100 via-cyan-300 to-blue-600",
};
