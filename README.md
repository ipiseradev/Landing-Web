# FERROX — Landing page industrial con Three.js

Landing page multi-página de alto nivel visual para **FERROX**, una ferretería
y proveedora de suministros **conceptual** (marca ficticia creada con fines
de demostración de portfolio). El proyecto combina dirección de arte
editorial, un visor 3D interactivo construido con React Three Fiber y una
experiencia de scroll cuidada, pensado como pieza destacada de portfolio
técnico y de diseño.

**[Demo en vivo →](#)** _(agregar URL de Vercel al desplegar)_

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss)
![Three.js](https://img.shields.io/badge/Three.js-R3F-000000?logo=three.js)

---

## Vista previa

| Hero 3D | Catálogo |
|---|---|
| Taladro procedural interactivo (sin assets externos) | Filtro por categoría + fotografía duotono |

> Capturas sugeridas: agregar `docs/hero.png` y `docs/catalogo.png` y
> enlazarlas acá antes de compartir el repo.

## Stack técnico

| Capa | Elección | Motivo |
|---|---|---|
| Framework | **Next.js 16** (App Router, Cache Components / PPR) | Server Components por defecto, streaming, SEO nativo |
| UI | **React 19** + **TypeScript** (modo estricto) | Tipado de punta a punta, cero `any` |
| Estilos | **Tailwind CSS v4** (`@theme` CSS-first) | Tokens de marca sin config JS, utilidades con `tailwind-merge` |
| 3D | **Three.js** + **React Three Fiber** + **drei** | Escena del hero y visor de producto |
| Animación | **GSAP** (ScrollTrigger) + **Motion** (ex Framer Motion) | GSAP para reveals de texto con scrub; Motion para microinteracciones y transición entre páginas |
| Iconografía | **lucide-react** | Set lineal consistente con la dirección de arte |

No se usa ningún modelo 3D externo (`.glb`/`.gltf`): el taladro del hero y el
visor de producto son **geometría procedural** construida con primitivas de
Three.js (`DrillModel.tsx`), con materiales PBR (`meshPhysicalMaterial`) e
iluminación de estudio armada con `Lightformer` de drei (sin HDRI remoto).

## Características

- **Hero 3D interactivo**: taladro procedural con rotación por cursor,
  reacción al scroll, idle animation y fallback automático si WebGL no está
  disponible (`isWebglAvailable.ts` + `WebGLFallback.tsx`).
- **Visor de producto 3D**: arrastre para rotar, zoom limitado, hotspots con
  ficha técnica. Los hotspots se proyectan manualmente a espacio de pantalla
  (sin `drei/Html`) para evitar conflictos con las transiciones de página
  animadas — ver nota en [Decisiones de ingeniería](#decisiones-de-ingeniería).
- **Catálogo multi-página real**: `/productos` (con filtro por categoría vía
  query param), `/categorias`, `/nosotros`, cada una con metadata SEO propia.
- **Transiciones de página animadas** vía `Motion` (`AnimatePresence` +
  `usePathname`), respetando `prefers-reduced-motion`.
- **Fotografía de producto con licencia verificada**: imágenes de Unsplash
  (Unsplash License, uso comercial permitido) procesadas con un tratamiento
  duotono carbón/naranja para mantener coherencia de marca. Créditos en
  [`public/images/products/CREDITS.md`](public/images/products/CREDITS.md).
- **Accesibilidad**: navegación por teclado, foco visible, `aria-*` en
  controles 3D y modales, focus trap en menú mobile y modal de producto,
  contenido legible sin JavaScript en las secciones de texto.
- **Rendimiento**: `frameloop="demand"` en escenas sin animación continua,
  Canvas pausado fuera de viewport (`IntersectionObserver`), DPR limitado,
  Server Components por defecto con Client Components aislados solo donde
  hace falta interactividad.

## Estructura del proyecto

```
src/
├── app/                      # Rutas (App Router)
│   ├── page.tsx              # Home
│   ├── productos/page.tsx    # Catálogo completo + filtro por categoría
│   ├── categorias/page.tsx
│   ├── nosotros/page.tsx
│   ├── layout.tsx            # Navbar + PageTransition + Footer (shell persistente)
│   ├── icon.tsx               # Favicon generado (ImageResponse)
│   ├── opengraph-image.tsx    # OG image generada
│   ├── robots.ts / sitemap.ts
│   └── globals.css            # Tokens de marca (@theme) + utilidades
├── components/
│   ├── sections/              # Una sección = un archivo (Hero, Categories, Benefits, ...)
│   ├── three/                 # Todo lo que toca Three.js/R3F, aislado y "use client"
│   ├── catalog/                # ProductCatalog: grilla + filtro + modal reutilizable
│   ├── layout/                 # Navbar, Footer, MobileMenu, PageTransition
│   └── ui/                     # Primitivas: Button, Modal, ProductImage, Reveal, ...
└── lib/
    ├── data/                   # Catálogo y categorías tipados (sin `any`)
    ├── config/brand.ts         # Marca, contacto demo, WhatsApp centralizado
    ├── hooks/                   # useReducedMotion, useWebglAvailable, useInView, ...
    └── three/isWebglAvailable.ts
```

## Cómo correrlo

Requiere Node.js 20+.

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # build de producción
npm run start    # sirve el build
npm run lint     # ESLint
npx tsc --noEmit # typecheck
```

## Decisiones de ingeniería

Algunas decisiones no obvias que vale la pena documentar para quien revise o
continúe el código:

- **`drei/Html` fue reemplazado por proyección manual a pantalla** en el
  visor de producto (`ProductViewer3D.tsx`). El componente `Html` de drei
  crea un portal al DOM que entra en conflicto con el unmount animado de
  `AnimatePresence` durante la navegación entre páginas (`removeChild` en un
  nodo ya desmontado). La solución: anclas `<object3D>` dentro de la escena
  + `camera.project()` en `useFrame`, renderizando los hotspots como HTML
  absolutamente posicionado fuera del `<Canvas>`. Más robusto y sin
  dependencia de un portal de terceros.
- **`cn()` usa `tailwind-merge`, no solo `clsx`.** Sin el merge, pasar
  `className="absolute inset-0"` a un componente cuya clase base ya incluye
  `relative` deja ambas clases en el string final; cuál "gana" depende del
  orden de generación del CSS de Tailwind, no del orden en el string. Esto
  rompió en silencio el fondo fotográfico de las tarjetas de categoría
  (contenedor colapsado a `height: 0`) hasta que se migró a `twMerge`.
- **Ningún ícono (`LucideIcon`) viaja como prop de Server a Client
  Component.** Los componentes de ícono son funciones, y React Server
  Components no puede serializar funciones a través del límite
  servidor/cliente. Los datos de catálogo (`PRODUCTS`) no incluyen `icon`;
  los íconos de categoría se renderizan directamente dentro del Server
  Component que los importa, nunca se pasan como prop a un Client Component.
- **`Footer` es un Server Component async** que usa `connection()` de
  `next/server` para poder calcular `new Date().getFullYear()` sin romper el
  prerender estático (Next 16 con Cache Components exige aislar acceso a
  APIs dinámicas detrás de `<Suspense>`).
- **Sin modelos 3D externos ni fotografía de stock del sitio de
  referencia.** El catálogo usa nombres de producto y categorías genéricos
  (sin marcas reales) y fotografía de Unsplash con licencia verificada — ver
  el historial de la conversación de diseño para el razonamiento completo
  sobre por qué no se reutilizó contenido de un comercio real.

## Contenido de demostración

Este es un proyecto de **portfolio**, no un comercio real:

- Precios, stock y disponibilidad son **ilustrativos**.
- El número de WhatsApp y los enlaces de redes sociales en
  `src/lib/config/brand.ts` son **placeholders** — reemplazar por los
  canales reales antes de cualquier uso comercial.
- La marca "FERROX" es conceptual; no representa una empresa existente.

## Licencia de imágenes

Las fotografías de producto provienen de Unsplash bajo la
[Unsplash License](https://unsplash.com/license) (uso comercial permitido,
sin necesidad de atribución). Detalle de cada imagen en
[`public/images/products/CREDITS.md`](public/images/products/CREDITS.md).
