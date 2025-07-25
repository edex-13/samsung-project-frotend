# Dashboard Scraping Samsung 📊

## Requisitos

- Node 18+
- Firebase CLI (`npm i -g firebase-tools`)

## Instalación

```bash
npm install # o pnpm / yarn
```

## Variables de entorno

Crear un archivo `.env.local`:

```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Ejecución en local con emuladores

```bash
firebase emulators:start &
npm run dev
```

## Despliegue en Vercel

1. `vercel`
2. Añadir las mismas variables de entorno.
3. Deploy listo ✅

## Scripts útiles

- `npm run dev` – servidor de desarrollo.
- `npm run build` – build producción.
- `npm run test` – pruebas unitarias con Vitest.
- `npm run lint` – ESLint.

---

> Made with ❤️ for el equipo de análisis. 