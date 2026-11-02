"use client";

import { useMemo, useState } from "react";
import { ListingCard } from "@/components/listing-card";
import { MapPlaceholder } from "@/components/map-placeholder";
import { SiteNavbar } from "@/components/site-navbar";
import { sampleListings } from "@/lib/listings";

type PriceOrder = "asc" | "desc";

export default function CatalogPage() {
  const [priceOrder, setPriceOrder] = useState<PriceOrder>("asc");

  const sortedListings = useMemo(
    () =>
      [...sampleListings].sort((first, second) =>
        priceOrder === "asc"
          ? first.nightlyPrice - second.nightlyPrice
          : second.nightlyPrice - first.nightlyPrice,
      ),
    [priceOrder],
  );

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <SiteNavbar searchText="" onSearchTextChange={() => {}} />

      <section className="mx-auto max-w-[1600px] px-5 pb-12 pt-6 md:px-10 md:pt-8">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">Alojamientos disponibles</h1>
            <p className="mt-1 text-sm text-neutral-600">
              {sortedListings.length} alojamientos
            </p>
          </div>

          <label className="flex items-center gap-2 text-sm font-medium">
            Ordenar por precio
            <select
              value={priceOrder}
              onChange={(event) => setPriceOrder(event.target.value as PriceOrder)}
              className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
            >
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
          </label>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2">
            {sortedListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
          <MapPlaceholder />
        </div>
      </section>
    </main>
  );
}
