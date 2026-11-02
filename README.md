# Clon de interfaz de Airbnb

Proyecto educativo que reproduce partes de la experiencia de Airbnb con Next.js, React, TypeScript y Tailwind CSS. La interfaz utiliza alojamientos de ejemplo locales; no tiene backend ni procesa reservas reales.

## Vistas implementadas

- **Inicio (`/`)**: búsqueda local por nombre o ubicación, filtro por categoría y tarjetas de alojamientos.
- **Catálogo (`/catalog`)**: listado compartido con Inicio, contador de resultados, orden por precio ascendente/descendente y placeholder de mapa responsive.
- **Detalle (`/rooms/[id]`)**: carga simulada por identificador, galería de placeholders, datos del alojamiento y anfitrión, servicios y contador de huéspedes en la tarjeta de reserva.

Las tarjetas enlazan al detalle y este ofrece un enlace para volver al catálogo. Los datos son demostrativos: la búsqueda, el mapa y la reserva no se conectan a servicios externos.

## Requisitos

- Node.js compatible con Next.js 16.
- npm.

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). Para comprobar lint y tipos:

```bash
npm run lint
npx tsc --noEmit
```

## Estructura

- `app/`: rutas de App Router.
- `components/`: componentes de interfaz reutilizables.
- `lib/`: datos locales compartidos de alojamientos y detalles.
- `types/`: tipos TypeScript.
- `public/img-Airbnb/`: capturas de referencia visual.
