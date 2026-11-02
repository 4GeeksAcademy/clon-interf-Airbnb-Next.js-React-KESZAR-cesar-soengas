type RoomHostProps = {
  hostName: string;
  hostYears: number;
};

export function RoomHost({ hostName, hostYears }: RoomHostProps) {
  return (
    <section className="flex items-center gap-4 border-y border-neutral-200 py-6">
      <div
        aria-hidden="true"
        className="grid h-14 w-14 place-items-center rounded-full bg-neutral-200 text-xl font-semibold text-neutral-600"
      >
        {hostName.charAt(0)}
      </div>
      <div>
        <h2 className="font-semibold">Anfitrión: {hostName}</h2>
        <p className="mt-1 text-sm text-neutral-500">{hostYears} años como anfitrión</p>
      </div>
    </section>
  );
}
