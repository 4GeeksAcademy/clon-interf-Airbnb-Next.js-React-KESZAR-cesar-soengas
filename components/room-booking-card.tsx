"use client";

import { useState } from "react";

type RoomBookingCardProps = {
  nightlyPrice: number;
  maxGuests: number;
};

const minGuests = 1;

export function RoomBookingCard({ nightlyPrice, maxGuests }: RoomBookingCardProps) {
  const [guestCount, setGuestCount] = useState(minGuests);

  return (
    <aside className="rounded-xl border border-neutral-200 p-6 shadow-lg">
      <p className="text-xl">
        <span className="font-semibold">${nightlyPrice}</span>
        <span className="text-sm text-neutral-600"> por noche</span>
      </p>

      <div className="mt-5 flex items-center justify-between rounded-lg border border-neutral-300 p-3">
        <div>
          <p className="text-sm font-medium">Huéspedes</p>
          <p aria-live="polite" className="text-sm text-neutral-500">
            {guestCount} {guestCount === 1 ? "huésped" : "huéspedes"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Reducir huéspedes"
            disabled={guestCount <= minGuests}
            onClick={() => setGuestCount((count) => Math.max(minGuests, count - 1))}
            className="grid h-8 w-8 place-items-center rounded-full border border-neutral-400 text-lg disabled:cursor-not-allowed disabled:opacity-40"
          >
            −
          </button>
          <button
            type="button"
            aria-label="Aumentar huéspedes"
            disabled={guestCount >= maxGuests}
            onClick={() => setGuestCount((count) => Math.min(maxGuests, count + 1))}
            className="grid h-8 w-8 place-items-center rounded-full border border-neutral-400 text-lg disabled:cursor-not-allowed disabled:opacity-40"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        className="mt-5 w-full rounded-lg bg-rose-600 px-5 py-3 font-semibold text-white transition hover:bg-rose-700"
      >
        Reservar
      </button>
      <p className="mt-3 text-center text-xs text-neutral-500">
        No se te cobrará nada todavía
      </p>
    </aside>
  );
}
