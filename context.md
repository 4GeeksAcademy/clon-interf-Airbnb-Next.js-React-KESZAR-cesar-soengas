# Contexto del proyecto: interfaz de Airbnb

## Objetivo y alcance

Construir una interfaz de alojamientos inspirada en Airbnb con Next.js 16, TypeScript, Tailwind CSS y componentes de React, utilizando el App Router. El objetivo es aprender a dividir una interfaz de producción en componentes pequeños, con una responsabilidad clara, e identificar qué datos comparten las distintas vistas.

El prototipo utilizará datos locales y búsqueda local, sin backend, cuentas ni reservas reales. Este documento describe la referencia y la estructura prevista; no autoriza a implementar todas sus funcionalidades de una vez. Cada feature se realizará únicamente cuando se solicite, sin commits ni push automáticos.

## Referencias visuales

Las siguientes capturas de Airbnb.com proporcionadas por el usuario son la referencia visual de este documento:

- [Home](public/img-Airbnb/Home-Airbnb.png).
- [Resultados de búsqueda](public/img-Airbnb/res-busqueda.png).
- [Detalle del alojamiento](public/img-Airbnb/detail-busqueda.png).

Las tres imágenes muestran escritorio y solo la parte visible de cada página. No permiten confirmar el comportamiento de menús, modales ni secciones fuera de la captura. La adaptación móvil descrita más abajo es una propuesta, no una observación de estas imágenes.

## Usuario y objetivo

La plataforma está dirigida a una persona que organiza un viaje y necesita encontrar un alojamiento adecuado a su destino, compañía y presupuesto. Quiere explorar opciones, comparar fotos, ubicación, capacidad, precios y valoraciones, y consultar el detalle de una habitación o vivienda antes de decidir dónde hospedarse. En este prototipo podrá recorrer ese proceso de búsqueda y comparación, sin efectuar una reserva real.

## 1. Página de inicio (Home)

Es el punto de entrada para explorar destinos y comenzar una búsqueda. La captura muestra una cabecera con marca, categorías de navegación y accesos de usuario; debajo aparece un buscador de lugar, fechas y viajeros. El contenido se organiza en filas de alojamientos por destino, como Buenos Aires y Rosario, con títulos y controles de carrusel. Cada tarjeta presenta una foto, un distintivo opcional, un corazón para guardar, el tipo de alojamiento y su destino, el precio para una estancia y la valoración.

### Componentes principales

| Componente | Responsabilidad |
| --- | --- |
| `SiteHeader` | Organizar la marca, la navegación y los accesos de la cabecera. |
| `CategoryNav` | Mostrar las categorías observadas: Todo, Alojamientos, Experiencias y Servicios. |
| `UserMenu` | Agrupar los accesos de perfil y menú; su contenido desplegado no aparece en la captura. |
| `SearchBar` | Reunir los campos de lugar, fechas y viajeros y la acción de buscar. |
| `DestinationField`, `DateField`, `GuestField` | Representar cada criterio de búsqueda de forma independiente. |
| `ListingSection` | Presentar una colección de alojamientos bajo un título de destino. |
| `ListingCarousel` | Organizar las tarjetas de una fila y sus controles de desplazamiento. |
| `ListingCard` | Mostrar el resumen de un alojamiento y ofrecer acceso a su detalle. |
| `FavoriteButton` | Representar la acción de guardar un alojamiento. |
| `GuestFavoriteBadge` | Identificar un alojamiento destacado entre los huéspedes. |
| `PriceSummary`, `RatingSummary` | Mostrar, respectivamente, precio con moneda y duración, y valoración. |

Las categorías de experiencias y servicios y los accesos de anfitrión forman parte de la referencia visual, pero no añaden páginas al alcance de las tres vistas acordadas.

## 2. Página de catálogo (resultados de búsqueda)

Permite comparar alojamientos para una búsqueda concreta. La referencia muestra una cabecera con buscador compacto que resume destino, fechas y viajeros. Debajo hay filtros de precio, tipo de alojamiento, servicios y habitaciones. El cuerpo presenta un encabezado con cantidad de resultados y destino, un aviso sobre tarifas, tarjetas más detalladas y un mapa lateral con marcadores de precio. Las tarjetas incluyen fotos con controles e indicadores, valoración con número de evaluaciones, descripción breve, dormitorios, camas, baños, precio y una condición de cancelación cuando corresponde.

### Componentes principales

| Componente | Responsabilidad |
| --- | --- |
| `SiteHeader`, `SearchBar` | Reutilizar la cabecera y el buscador en una presentación compacta. |
| `FilterBar` | Organizar los controles de filtrado visibles. |
| `FilterControl` | Representar un filtro individual de precio, tipo, servicios o capacidad. |
| `ResultsHeading` | Mostrar el destino y el número de alojamientos encontrados. |
| `FeesNotice` | Comunicar si el precio mostrado incluye las tarifas. |
| `ListingGrid` | Distribuir los resultados en una cuadrícula. |
| `ListingCard` | Reutilizar la tarjeta con información ampliada para comparar resultados. |
| `ListingImageCarousel` | Recorrer las fotos de una tarjeta y mostrar la posición actual. |
| `RoomFacts` | Resumir dormitorios, camas y baños. |
| `CancellationBadge` | Mostrar la condición de cancelación del alojamiento cuando exista. |
| `ResultsMap`, `MapPriceMarker` | Representar el mapa de resultados y cada marcador de precio. |

El mapa y los filtros avanzados están identificados en la captura, pero su implementación requiere una feature solicitada expresamente. La búsqueda local acordada contempla inicialmente destino y huéspedes. Un estado sin resultados será necesario para esa búsqueda, aunque no aparece en la imagen.

## 3. Vista de detalle de una habitación o alojamiento

Permite examinar una opción seleccionada. Aunque el proyecto contempla el detalle de una habitación, la captura concreta corresponde a un departamento completo; la vista debe poder describir ambos tipos. Se observa una cabecera compacta, el título del anuncio y las acciones de compartir y guardar. La galería combina una foto principal con cuatro secundarias y un acceso para mostrar todas las fotos. Debajo aparecen el tipo de alojamiento, la ubicación, la capacidad y la distribución de habitaciones, además de un resumen de reputación. A la derecha se ven un aviso de tarifas y el inicio de un panel de precio por estancia.

### Componentes principales

| Componente | Responsabilidad |
| --- | --- |
| `SiteHeader`, `SearchBar` | Mantener la navegación y la búsqueda compacta compartidas. |
| `ListingTitle` | Mostrar el nombre del alojamiento. |
| `ListingActions` | Agrupar las acciones de compartir y guardar. |
| `ShareButton`, `FavoriteButton` | Representar cada acción de forma independiente. |
| `PhotoGallery` | Presentar las fotos del alojamiento y el acceso a la colección completa. |
| `ListingOverview` | Mostrar el tipo de alojamiento, la ubicación y el número de huéspedes. |
| `RoomFacts` | Reutilizar el resumen de dormitorios, camas y baños. |
| `GuestRatingPanel` | Reunir el distintivo de favorito, la puntuación y el número de evaluaciones. |
| `FeesNotice` | Reutilizar el aviso sobre tarifas incluidas. |
| `StayPricePanel` | Presentar el precio y la duración de la estancia. |

La captura corta la parte inferior del panel de precio y del bloque de reputación: no se presupone el contenido restante. Una descripción ampliada y una lista de servicios serían complementos propuestos, no elementos confirmados por esta imagen. No se implementarán pagos ni reservas reales.

## Componentes compartidos y datos

Las piezas reutilizables se organizarán en `/components`. Las páginas compondrán esas piezas sin concentrar en un único componente toda la presentación y la lógica. Se compartirán especialmente cabecera, buscador, tarjetas, favoritos, precios, valoraciones y datos de habitaciones; sus variantes no deben duplicar responsabilidades.

Cada alojamiento necesitará un identificador estable, tipo, título, destino, fotos con texto alternativo, capacidad, distribución, precio, moneda y valoración. Los distintivos y condiciones serán opcionales. Un precio por noche se distinguirá de un total para varias noches. Las tres vistas usarán la misma fuente de datos locales para mantener coherencia entre una tarjeta y su detalle. El estado de búsqueda incluirá destino y huéspedes; las fechas se identifican en la referencia y se concretarán al solicitar esa interacción.

## Diseño responsive y navegación

- Diseñar primero para un viewport de 375px: cabecera compacta, controles cómodos para interacción táctil y contenido sin desbordamiento horizontal de la página.
- En móvil, proponer tarjetas en una columna o filas desplazables dentro de su propia sección, filtros accesibles y una galería que priorice una imagen a la vez. No comprimir toda la composición de escritorio en 375px.
- Adaptar el diseño desde 768px, aumentando columnas según el espacio disponible. Si se solicita el mapa, decidir su presentación móvil por separado y reservar la disposición lateral para anchuras suficientes.
- Mantener etiquetas accesibles, foco visible, contraste legible y textos alternativos para las imágenes.
- Conectar Home, catálogo y detalle mediante navegación del App Router con `Link` de Next.js y navegación de cliente para formularios, sin recargar el documento completo.
- Conservar los criterios de búsqueda al consultar un alojamiento y regresar al catálogo. Las rutas propuestas son `/`, `/search` y `/rooms/[id]`.

## Forma de trabajo

Este mini-brief se crea antes del código de la aplicación. La implementación avanzará feature por feature, solo siguiendo las indicaciones del usuario. Al entregar cada feature se proporcionará un ejemplo de mensaje de commit; el usuario realizará los commits y las subidas al repositorio.