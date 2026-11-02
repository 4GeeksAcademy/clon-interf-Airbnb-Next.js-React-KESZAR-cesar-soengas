"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { RoomAmenities } from "@/components/room-amenities";
import { RoomBookingCard } from "@/components/room-booking-card";
import { RoomHost } from "@/components/room-host";
import { RoomPhotoGallery } from "@/components/room-photo-gallery";
import { SiteNavbar } from "@/components/site-navbar";
import { roomDetailsByListingId } from "@/lib/room-details";
import { sampleListings } from "@/lib/listings";
import type { Listing } from "@/types/listing";

type RoomData = Listing & {
  hostName: string;
  hostYears: number;
  reviewCount: number;
  maxGuests: number;
};

export default function RoomDetailPage() {
  const params = useParams<{ id: string }>();
  const roomId = params.id;
  const [loadedRoom, setLoadedRoom] = useState<{
    id: string;
    room: RoomData | null;
  } | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const listing = sampleListings.find((item) => item.id === roomId);
      const details = roomDetailsByListingId[roomId];
      setLoadedRoom({
        id: roomId,
        room: listing && details ? { ...listing, ...details } : null,
      });
    }, 700);

    return () => window.clearTimeout(timer);
  }, [roomId]);

  const room = loadedRoom?.id === roomId ? loadedRoom.room : null;
  const isLoading = loadedRoom?.id !== roomId;

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <SiteNavbar searchText="" onSearchTextChange={() => {}} />

      {isLoading ? (
        <div role="status" className="flex min-h-96 items-center justify-center gap-3 text-sm text-neutral-600">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-300 border-t-rose-500" />
          <span>Cargando alojamiento…</span>
        </div>
      ) : room ? (
        <article className="mx-auto max-w-6xl px-5 pb-12 pt-6 md:px-8 md:pt-8">
          <header className="mb-5">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{room.title}</h1>
            <p className="mt-2 text-sm text-neutral-700">
              <span aria-label={`${room.rating} de 5 estrellas`} className="font-medium">★ {room.rating.toFixed(2)}</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span className="underline">{room.reviewCount} reseñas</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>{room.location}</span>
            </p>
          </header>

          <RoomPhotoGallery listing={room} />

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)]">
            <div>
              <RoomHost hostName={room.hostName} hostYears={room.hostYears} />
              <RoomAmenities category={room.category} />
            </div>
            <div className="lg:sticky lg:top-24 lg:self-start">
              <RoomBookingCard nightlyPrice={room.nightlyPrice} maxGuests={room.maxGuests} />
            </div>
          </div>
        </article>
      ) : (
        <section className="mx-auto max-w-6xl px-5 py-20 text-center">
          <h1 className="text-2xl font-semibold">No encontramos este alojamiento</h1>
          <p className="mt-2 text-neutral-600">Comprueba el enlace o vuelve al catálogo.</p>
        </section>
      )}
    </main>
  );
}
