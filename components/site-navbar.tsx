import Link from "next/link";

type SiteNavbarProps = {
  searchText: string;
  onSearchTextChange: (value: string) => void;
};

export function SiteNavbar({
  searchText,
  onSearchTextChange,
}: SiteNavbarProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between gap-4 px-5 md:px-10">
        <Link
          href="/"
          aria-label="Airbnb, página de inicio"
          className="hidden shrink-0 items-center gap-2 text-rose-500 md:flex"
        >
          <AirbnbMark />
          <span className="text-[22px] font-bold tracking-tight">airbnb</span>
        </Link>

        <Link
          href="/"
          aria-label="Airbnb, página de inicio"
          className="flex shrink-0 items-center text-rose-500 md:hidden"
        >
          <AirbnbMark />
        </Link>

        <label className="flex h-12 min-w-0 flex-1 items-center gap-3 rounded-full border border-neutral-300 px-4 shadow-sm transition hover:shadow-md md:absolute md:left-1/2 md:w-[min(38vw,400px)] md:-translate-x-1/2">
          <SearchIcon />
          <span className="sr-only">Buscar alojamientos</span>
          <input
            type="search"
            value={searchText}
            onChange={(event) => onSearchTextChange(event.target.value)}
            placeholder="¿Adónde quieres ir?"
            className="min-w-0 flex-1 bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-500"
          />
        </label>

        <div className="hidden shrink-0 items-center gap-5 md:flex">
          <button className="text-sm font-medium text-neutral-800 hover:underline">
            Conviértete en anfitrión
          </button>
          <UserMenu />
        </div>

        <UserMenu compact />
      </div>
    </header>
  );
}

function AirbnbMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      className="h-8 w-8 fill-current"
    >
      <path d="M16 3.3c-1.4 0-2.6.9-3.3 2.3L4.5 22.1a5.2 5.2 0 0 0 9.1 5l2.4-4 2.4 4a5.2 5.2 0 0 0 9.1-5L19.3 5.6c-.7-1.4-1.9-2.3-3.3-2.3Zm0 4.1 7.9 16.6a1.8 1.8 0 0 1-3.1 1.8l-3.1-5.2a2 2 0 0 0-3.4 0l-3.1 5.2a1.8 1.8 0 0 1-3.1-1.8L16 7.4Z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0 fill-none stroke-current text-rose-500"
      strokeWidth="2"
    >
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function UserMenu({ compact = false }: { compact?: boolean }) {
  return (
    <button
      type="button"
      aria-label="Abrir menú de usuario"
      className={`flex h-11 shrink-0 items-center rounded-full border border-neutral-300 text-neutral-600 transition hover:shadow-md ${
        compact ? "gap-2 px-2.5 md:hidden" : "gap-3 px-3"
      }`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4 fill-none stroke-current"
        strokeWidth="2"
      >
        <path d="M4 7h16M4 12h16M4 17h16" />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-8 w-8 fill-current text-neutral-500"
      >
        <path d="M16 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 3c-6.1 0-11 3.1-11 7v2h22v-2c0-3.9-4.9-7-11-7Z" />
      </svg>
    </button>
  );
}
