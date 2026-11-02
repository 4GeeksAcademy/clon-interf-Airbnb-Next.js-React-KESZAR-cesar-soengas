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

## Estado de la implementación

Esta sección registra lo que existe actualmente en el prototipo; las tablas y especificaciones posteriores describen la referencia visual y una arquitectura propuesta, no funcionalidades ya implementadas.

- Rutas actuales: `/` (Home), `/catalog` (catálogo) y `/rooms/[id]` (detalle).
- Los datos de ejemplo se comparten desde `lib/listings.ts`; el catálogo ordena por precio y muestra un placeholder de mapa.
- Home ofrece búsqueda local por título o ubicación y filtro por categoría.
- El detalle carga datos locales con una espera simulada. La galería usa placeholders visuales; los controles cambian el índice mostrado, no cargan fotografías distintas. Los datos de anfitrión, reseñas y capacidad son demostrativos.
- El contador de huéspedes es interactivo dentro del límite configurado. El botón «Reservar» no inicia una reserva; no hay fechas, pagos, backend ni mapa interactivo.
- Componentes reutilizables actuales en `components/`: `SiteNavbar`, `CategoryFilter`, `ListingCard`, `MapPlaceholder`, `RoomPhotoGallery`, `RoomHost`, `RoomAmenities` y `RoomBookingCard`. `SiteNavbar` también contiene auxiliares visuales (`AirbnbMark`, `SearchIcon` y `UserMenu`).

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
- La navegación implementada usa `Link` de Next.js entre `/`, `/catalog` y `/rooms/[id]`. La página de detalle incluye un enlace para regresar a `/catalog`. La conservación de los criterios de búsqueda al navegar todavía no está implementada.

<!--
ESPECIFICACIÓN DE COMPONENTES
Referencia: las tres capturas de public/img-Airbnb.
Formato: Componente | props propuestas | ubicación y responsabilidad.
Los callbacks comunican acciones; no implican backend ni nuevas features.

COMPARTIDOS
SiteHeader | variant, navigation, search, actions | Cabecera superior; compone marca y slots, sin gestionar búsquedas.
CategoryNav | items, activeId, onSelect | Slot navigation; presenta las categorías y comunica selección.
UserMenu | onProfileClick, onMenuClick | Slot actions; presenta los accesos, sin autenticar usuarios.
SearchBar | variant, value, onChange, onSubmit | Slot search; coordina campos y envío, sin filtrar alojamientos.
DestinationField | value, onChange | Dentro de SearchBar; selecciona el destino.
DateField | value, onChange | Dentro de SearchBar; selecciona el intervalo de fechas.
GuestField | value, onChange, min, max | Dentro de SearchBar; selecciona la cantidad de huéspedes.
ListingCard | listing, variant, detailHref, isFavorite, onFavoriteChange | Dentro de carrusel o grid; compone el resumen enlazable.
FavoriteButton | pressed, onToggle, label | Sobre la foto o dentro de ListingActions; comunica la acción, sin persistir datos.
GuestFavoriteBadge | label | Sobre la foto o dentro de GuestRatingPanel; muestra el distintivo.
PriceSummary | amount, currency, basis, nights | Dentro de tarjeta o panel; formatea un precio ya calculado.
RatingSummary | value, reviewCount | Dentro de tarjeta o panel; presenta puntuación y cantidad de evaluaciones.
RoomFacts | bedrooms, beds, bathrooms | Dentro de ListingCard o debajo de ListingOverview; presenta la distribución.
FeesNotice | message | Junto al encabezado del catálogo o encima del panel de precio; informa sobre tarifas.

HOME
ListingSection | title, href, children | Dentro de main; agrupa el encabezado del destino y su colección.
ListingCarousel | children, label | Dentro de ListingSection; gestiona desplazamiento horizontal y controles.
Composición: SiteHeader + main > ListingSection repetida > ListingCarousel > ListingCard.
Cabecera: marca a la izquierda, CategoryNav centrada y UserMenu a la derecha.
SearchBar expandida ocupa una segunda fila; cada tarjeta compone foto, distintivo, favorito, precio y valoración.

CATÁLOGO
FilterBar | children | Debajo de SiteHeader; organiza los controles, sin aplicar filtros.
FilterControl | label, kind, value, options, onChange | Dentro de FilterBar; edita un único criterio.
ResultsHeading | destination, count, isApproximate | Encima del grid; presenta destino y cantidad recibida.
ListingGrid | children | Columna de resultados; distribuye tarjetas, sin consultar ni filtrar datos.
ListingImageCarousel | photos, label | Zona visual de ListingCard de resultados; gestiona foto activa e indicadores.
CancellationBadge | label | Debajo del precio de ListingCard; muestra una condición recibida.
ResultsMap | markers, selectedId, onSelect | Columna derecha del catálogo; presenta ubicaciones y controla la cámara.
MapPriceMarker | position, amount, currency, selected, onSelect | Dentro de ResultsMap; muestra un precio seleccionable.
Composición: SiteHeader compacto + FilterBar + main con resultados a la izquierda y ResultsMap a la derecha.
Resultados: ResultsHeading y FeesNotice sobre ListingGrid > ListingCard.
La tarjeta compone ListingImageCarousel, distintivos, favorito, valoración, RoomFacts y PriceSummary.

DETALLE
ListingTitle | title | Primera fila de main, a la izquierda; presenta el título.
ListingActions | children | Primera fila de main, a la derecha; agrupa acciones.
ShareButton | onShare, label | Dentro de ListingActions; comunica la intención de compartir.
PhotoGallery | photos, onOpenAll | Debajo del título y acciones; compone imágenes y acceso a la colección completa.
ListingOverview | accommodationType, location, guestCapacity | Debajo de la galería, columna izquierda; presenta datos generales.
GuestRatingPanel | rating, reviewCount, isGuestFavorite, description | Debajo del resumen; compone distintivo y RatingSummary.
StayPricePanel | amount, currency, basis, nights | Debajo de FeesNotice, columna derecha; compone el resumen de precio, sin reservas.
Composición: SiteHeader compacto + main > fila de título/acciones + PhotoGallery + dos columnas.
Columna izquierda: ListingOverview, RoomFacts y GuestRatingPanel.
Columna derecha: FeesNotice y StayPricePanel.
PhotoGallery de escritorio: imagen principal y cuatro secundarias; un modal sería otro componente, pendiente de solicitud.

CONTRATOS Y LÍMITES
listing contiene datos de presentación; photos contiene imágenes con src y alt; markers incluye id, posición y precio.
Los slots navigation, search, actions y children reciben contenido React; variant selecciona una presentación, no una lógica de negocio distinta.
SearchBar.value agrupa destino, fechas y huéspedes; los campos reciben únicamente su valor correspondiente.
basis distingue precio por noche de total por estancia; nights indica la duración cuando corresponda.
Las páginas coordinan datos y navegación; filtros y cálculos pertenecen a funciones independientes de la UI.
Los callbacks se conectarán dentro de límites Client Component, no como funciones ordinarias desde Server Components.
En ListingCard, los botones de favorito y carrusel quedan fuera del enlace de navegación.
Estos contratos son una propuesta previa; sus tipos concretos se definirán en /types al implementar la feature correspondiente.

RESPONSIVE Y ALCANCE
Base 375px: contenido apilado, controles accesibles y desplazamiento limitado a carruseles.
Desde 768px: ampliar columnas según espacio; el mapa lateral no debe comprimir los resultados.
Estas adaptaciones móviles son propuestas; las capturas solo muestran escritorio.
Mapa, filtros avanzados, fechas y acciones adicionales requieren autorización por feature.
-->

## Forma de trabajo

Este mini-brief se crea antes del código de la aplicación. La implementación avanzará feature por feature, solo siguiendo las indicaciones del usuario. Al entregar cada feature se proporcionará un ejemplo de mensaje de commit; el usuario realizará los commits y las subidas al repositorio.