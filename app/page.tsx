"use client";

import { useEffect, useMemo, useState } from "react";
import { CategoryFilter } from "@/components/category-filter";
import { ListingCard } from "@/components/listing-card";
import { SiteNavbar } from "@/components/site-navbar";
import { sampleListings } from "@/lib/listings";
import type { Listing, ListingCategory } from "@/types/listing";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState<ListingCategory | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setListings(sampleListings);
      setIsLoading(false);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, []);

  const visibleListings = useMemo(() => {
    const normalizedSearch = searchText.trim().toLocaleLowerCase();
    return listings.filter((listing) => {
      const matchesText = `${listing.title} ${listing.location}`
        .toLocaleLowerCase()
        .includes(normalizedSearch);
      const matchesCategory = !activeCategory || listing.category === activeCategory;
      return matchesText && matchesCategory;
    });
  }, [activeCategory, listings, searchText]);

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <SiteNavbar searchText={searchText} onSearchTextChange={setSearchText} />
      <CategoryFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <section
        aria-label="Alojamientos disponibles"
        className="mx-auto max-w-[1600px] px-5 pb-12 pt-6 md:px-10 md:pt-8"
      >
        {isLoading ? (
          <div
            role="status"
            className="flex min-h-56 items-center justify-center gap-3 text-sm text-neutral-600"
          >
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-300 border-t-rose-500" />
            <span>Cargando alojamientos…</span>
          </div>
        ) : visibleListings.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {visibleListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-sm text-neutral-600">
            No hay alojamientos que coincidan con tu búsqueda.
          </p>
        )}
      </section>
    </main>
  );
}
