type RoomAmenitiesProps = {
  category: string;
};

export function RoomAmenities({ category }: RoomAmenitiesProps) {
  const amenities = [
    { icon: "⌂", label: "Alojamiento: " + category },
    { icon: "⌁", label: "Wifi de alta velocidad" },
    { icon: "♨", label: "Cocina equipada" },
    { icon: "▣", label: "Estacionamiento gratuito" },
    { icon: "❄", label: "Aire acondicionado" },
    { icon: "◷", label: "Llegada autónoma" },
  ];

  return (
    <section className="border-b border-neutral-200 py-6">
      <h2 className="text-xl font-semibold">Servicios</h2>
      <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {amenities.map(({ icon, label }) => (
          <li key={label} className="flex items-center gap-3 text-sm text-neutral-700">
            <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-neutral-100 text-lg">
              {icon}
            </span>
            {label}
          </li>
        ))}
      </ul>
    </section>
  );
}
