# felix-ds-demo-site

A demo website built with [felix-ds](https://github.com/pattespatte/felix-ds) – a thin theme layer on top of FKUI's public npm packages – showing that the theme holds up on a realistic, content-heavy site.

The site is a fictional Swedish healthcare portal ("Vårdportalen"): 25 content pages plus a 404 page, with a bilingual-safe, Swedish-only content set, client-side search, prerendering for no-JS visitors, and light/dark color modes driven entirely by the felix theme tokens.

Everything here is fictional – the clinic, prices, people and contact details are made up. The site is kept out of search indexes (noindex meta, robots.txt, X-Robots-Tag headers).

## Content notes

The content is carried over verbatim from the source demo site, with one exception: the source contact page named a real Stockholm hospital under "Akutmottagning". Per this project's neutrality rule (no real organisation names), it is replaced with the fictional "Akutmottagningen Södra, Stockholm". Every other heading, paragraph, price and link matches the source.

## Stack

- Vue 3 (`<script setup lang="ts">`) + TypeScript + Vite
- Vue Router 4 (history mode)
- FKUI 6.59.0 (`@fkui/vue`, `@fkui/design`, `@fkui/date`, `@fkui/logic`, `@fkui/icon-lib-default`; `@fkui/theme-default` comes in transitively with felix-ds and is loaded by the felix theme layer)
- felix-ds from GitHub Packages, declared with a semver range (see [Upgrade felix-ds](#upgrade-felix-ds))
- No Tailwind, no icon CDN: layout SCSS uses felix/FKUI tokens only, icons come from the FKUI default library plus a small Phosphor extension (see [Icons](#icons)), fonts are self-hosted

## Styling conventions

Relative units (`rem`, `em`, `%`, viewport units) are used everywhere they affect text scaling – typography, spacing, element dimensions and rem-based media queries – so text and layout scale cleanly with user font-size preferences (WCAG 1.4.4 Resize Text). The few intentional `px` values left in the source are values that must *not* scale with text:

- hairline borders and rule weights (`1px`–`4px`), which would turn blurry or misaligned if expressed in `rem`
- the sr-only clip pattern (`width: 1px; height: 1px; margin: -1px`)
- decorative `box-shadow` offsets and blur radii
- the header dropdown's `margin-top: -20px`, which must match FKUI's pixel-based popup positioning
- the `0px` height targets in `fkui-patches.ts`, which are JavaScript transition endpoints, not CSS

Pill/circle shapes use `border-radius: 50%` (square boxes) or `999em` (text capsules) instead of the classic `999px`.

## Run it

```bash
bun install
bun run dev
```

Then open the printed dev-server URL.

## Content editing (CMS)

Seven of the content pages are edited through [Sveltia CMS](https://github.com/sveltia/sveltia-cms) rather than in code, so non-coders can update the texts:

- Om oss, Frågor och svar, Tillgänglighet, Patientinformation, Vårdgaranti, Din vårdkontakt, Integritetspolicy.
- Each page is a YAML file in `src/content/pages/` following the model in `src/content/types.ts`, rendered by the generic `src/views/ContentPage.vue` (route prop `content: '<key>'`).
- The admin UI lives at [`/admin/`](https://pattespatte.github.io/felix-ds-demo-site/admin/) (`public/admin/`). Authentication is a GitHub personal access token with Contents read/write on this repo – no OAuth server needed, which is why Sveltia over Decap on GitHub Pages.
- The CMS bundle is self-hosted and version-pinned: `@sveltia/cms` is a devDependency, and `scripts/sync-sveltia-cms.mjs` (run by `dev` and `build`) copies it from `node_modules` into `public/admin/` (gitignored).
- Editor instructions (Swedish): [docs/redigera-innehall.md](docs/redigera-innehall.md).

Saving in the CMS commits to `main`, which triggers the deploy workflow – content changes go live after the usual rebuild.

## Build and preview

```bash
bun run build        # sveltia-cms bundle + search index + typecheck + vite build + prerender
bun run preview      # serve dist/ at the production base path
```

The build prerenders every route to static HTML (light mode snapshots; the dark mode is applied at runtime by the inline pre-paint script and the color-mode module).

## Icons

The site does not deviate from the `FIcon` component – every icon renders through `<f-icon name="...">` – but it does extend the icon _library_ behind it:

- UI chrome icons (search, bars, carets, the logo cross, arrows) come from the FKUI default library (`@fkui/icon-lib-default`, 31 utility icons).
- Content icons (service cards, Mina Sidor lists, the color-mode toggle) are [Phosphor](https://phosphoricons.com) glyphs – the same icons the sibling [swedish-healthcare-demo-site](https://github.com/pattespatte/swedish-healthcare-demo-site) uses for the same concepts. The FKUI defaults have no medical or content glyphs (no stethoscope, baby, prescription, …), which previously forced hand-drawn inline SVGs scattered through components.

The Phosphor set is injected as extra `f-icon-*` symbols in the same `"f"` spritesheet library, which is FKUI's documented pattern for icons beyond the defaults ("Skapa eget ikonbibliotek" in the FKUI docs, normally built with `@fkui/icon-lib-builder`). Names that exist in the default library are deliberately not duplicated.

| File                                        | Role                                                                                                                                                    |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/icons/phosphor-spritesheet.ts`         | Generated symbols (Phosphor MIT license), injected on load                                                                                              |
| `scripts/generate-phosphor-spritesheet.mjs` | Regenerates the file above (`bun run generate:icons`) by server-rendering `@phosphor-icons/vue` (a devDependency, pinned to the sibling site's version) |

Note: the sibling site writes `<PhChild>` for the BVC card, but `@phosphor-icons/vue` 2.x has no such icon (it renders nothing there). This site uses `baby-carriage` for that concept instead.

## Upgrade felix-ds

`@pattespatte/felix-ds` is installed from GitHub Packages (restricted visibility), declared with a semver range in `package.json` and locked in `bun.lockb`. The tracked `.npmrc` points the `@pattespatte` scope at the registry and reads its token from the `GITHUB_PACKAGES_TOKEN` environment variable (a PAT with `read:packages`; the Pages workflow maps `secrets.GITHUB_TOKEN` onto it).

The theme has no CLI – it is a plain CSS package – so upgrading is a dependency update. With `GITHUB_PACKAGES_TOKEN` exported:

```bash
bun update @pattespatte/felix-ds
```

This resolves the newest published version allowed by the range in `package.json`, rewrites that range to the new version and updates `bun.lockb`. The `@fkui/*` packages are pinned to exact versions and are not touched, as long as they stay inside the theme's peer range (`@fkui/theme-default >=6.57.0 <7.0.0`). Restart the dev server afterwards – Vite pre-bundles the old CSS – and run `bun run build` before committing.

To see which version is installed, run `npm ls @pattespatte/felix-ds` (local lookup, no token needed). `npm view @pattespatte/felix-ds versions` lists every published version – it needs the token and must run from the repo root so `.npmrc` applies. To install a specific release instead of the newest one, `bun add @pattespatte/felix-ds@1.4.0` pins that exact version, while `bun add @pattespatte/felix-ds@latest` writes a fresh caret range – use it when a major release falls outside the current range, which `bun update` never crosses. The registry has no dist-tags other than `latest`.

## Deploy

A GitHub Pages workflow lives in `.github/workflows/deploy.yml` (never triggered by automation here – push to `main` when you want it to run).

## How this was built

See the guide in the felix-ds repo: [docs/create-a-site.sv.md](https://github.com/pattespatte/felix-ds/blob/main/docs/create-a-site.sv.md) (Swedish) or [docs/create-a-site.en.md](https://github.com/pattespatte/felix-ds/blob/main/docs/create-a-site.en.md) (English).
