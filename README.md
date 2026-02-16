# wa-petly

This template should help get you started developing with Vue 3 in Vite.

## Connecting to the backend API

The frontend is expected to talk to a Java/Spring API running locally on port 8080 or in production at `https://ms-petly.onrender.com`.

Environment variables control the base URL used for requests. Vite will expose any variable prefixed with `VITE_` via `import.meta.env`.

Files are provided for convenience:

- `.env` – used during development (`http://localhost:8080`).
- `.env.production` – baked into the build for production (`https://ms-petly.onrender.com`).

You can override these values by creating your own `.env.local` or setting the variables in the hosting environment.

A minimal API service has been added under `src/services/api.ts` containing a `registerUser` function that posts to `/users`.

The registration page (`src/views/Register.vue`) now collects user input, validates it, and calls the service; on success it navigates to the login page.

Make sure the backend is running before attempting to register a user. Example cURL call:

```bash
curl -X POST http://localhost:8080/users \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"test@example.com","crmv":"12345","password":"secret"}'
```



## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
