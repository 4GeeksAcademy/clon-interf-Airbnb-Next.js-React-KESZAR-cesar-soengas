"use client";

import { useEffect, useMemo, useState } from "react";
import { CategoryFilter } from "@/components/category-filter";
import { ListingCard } from "@/components/listing-card";
import { SiteNavbar } from "@/components/site-navbar";
import type { Listing, ListingCategory } from "@/types/listing";

const sampleListings: Listing[] = [
  { id: "1", title: "Casa frente al mar", location: "Mar del Plata, Argentina", nightlyPrice: 120, rating: 4.96, category: "Playa", photoTone: "ocean" },
  { id: "2", title: "Mansión entre jardines", location: "Tigre, Argentina", nightlyPrice: 245, rating: 4.91, category: "Mansiones", photoTone: "forest" },
  { id: "3", title: "Refugio con vistas al lago", location: "Bariloche, Argentina", nightlyPrice: 165, rating: 4.99, category: "Vistas increíbles", photoTone: "sky" },
  { id: "4", title: "Loft luminoso en la ciudad", location: "Buenos Aires, Argentina", nightlyPrice: 89, rating: 4.87, category: "Tendencias", photoTone: "rose" },
  { id: "5", title: "Cabaña rodeada de bosque", location: "San Martín de los Andes, Argentina", nightlyPrice: 138, rating: 4.94, category: "Cabañas", photoTone: "forest" },
  { id: "6", title: "Villa con piscina privada", location: "Córdoba, Argentina", nightlyPrice: 198, rating: 4.89, category: "Piscinas", photoTone: "lavender" },
  { id: "7", title: "Departamento frente al mar", location: "Pinamar, Argentina", nightlyPrice: 152, rating: 4.92, category: "Frente al mar", photoTone: "sand" },
  { id: "8", title: "Casa rural con patio", location: "Mendoza, Argentina", nightlyPrice: 110, rating: 4.85, category: "Casas rurales", photoTone: "rose" },
  { id: "9", title: "Casa de playa luminosa", location: "Villa Gesell, Argentina", nightlyPrice: 130, rating: 4.90, category: "Playa", photoTone: "sky" },
  { id: "10", title: "Mansión con piscina", location: "Pilar, Argentina", nightlyPrice: 290, rating: 4.98, category: "Mansiones", photoTone: "lavender" },
  { id: "11", title: "Cabaña sobre la montaña", location: "Villa La Angostura, Argentina", nightlyPrice: 175, rating: 4.97, category: "Cabañas", photoTone: "forest" },
  { id: "12", title: "Casa con vistas panorámicas", location: "Salta, Argentina", nightlyPrice: 142, rating: 4.88, category: "Vistas increíbles", photoTone: "sand" },
];

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
