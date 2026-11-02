import type { ListingCategory } from "@/types/listing";

const categories: { name: ListingCategory; symbol: string }[] = [
  { name: "Tendencias", symbol: "↗" },
  { name: "Playa", symbol: "☼" },
  { name: "Mansiones", symbol: "⌂" },
  { name: "Vistas increíbles", symbol: "◉" },
  { name: "Cabañas", symbol: "⌂" },
  { name: "Piscinas", symbol: "◌" },
  { name: "Frente al mar", symbol: "≈" },
  { name: "Casas rurales", symbol: "⌁" },
];

type CategoryFilterProps = {
  activeCategory: ListingCategory | null;
  onCategoryChange: (category: ListingCategory | null) => void;
};

export function CategoryFilter({
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <nav aria-label="Filtrar por categoría" className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-[1600px] gap-8 overflow-x-auto px-5 pt-4 md:gap-10 md:px-10">
        {categories.map((category) => {
          const active = activeCategory === category.name;
          return (
            <button
              key={category.name}
              type="button"
              aria-pressed={active}
              onClick={() => onCategoryChange(active ? null : category.name)}
              className={`group flex min-w-fit flex-col items-center gap-2 border-b-2 pb-3 text-xs font-medium transition ${
                active
                  ? "border-neutral-900 text-neutral-900"
                  : "border-transparent text-neutral-500 hover:border-neutral-400 hover:text-neutral-800"
              }`}
            >
              <span aria-hidden="true" className="text-2xl leading-6">
                {category.symbol}
              </span>
              {category.name}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
