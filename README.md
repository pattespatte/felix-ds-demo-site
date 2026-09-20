# felix-ds-demo-site

A demo website built with [felix-ds](https://github.com/pattespatte/felix-ds) – a thin theme layer on top of FKUI's public npm packages – showing that the theme holds up on a realistic, content-heavy site.

The site is a fictional Swedish healthcare portal ("Vårdportalen"): 25 content pages plus a 404 page, with a bilingual-safe, Swedish-only content set, client-side search, prerendering for no-JS visitors, and light/dark color modes driven entirely by the felix theme tokens.

Everything here is fictional – the clinic, prices, people and contact details are made up. The site is kept out of search indexes (noindex meta, robots.txt, X-Robots-Tag headers).

## Content notes

The content is carried over verbatim from the source demo site, with one exception: the source contact page named a real Stockholm hospital under "Akutmottagning". Per this project's neutrality rule (no real organisation names), it is replaced with the fictional "Akutmottagningen Södra, Stockholm". Every other heading, paragraph, price and link matches the source.

## Stack

- Vue 3 (`<script setup lang="ts">`) + TypeScript + Vite
- Vue Router 4 (history mode)
- FKUI 6.57.1 (`@fkui/vue`, `@fkui/design`, `@fkui/date`, `@fkui/logic`, `@fkui/icon-lib-default`; `@fkui/theme-default` comes in transitively with felix-ds and is loaded by the felix theme layer)
- felix-ds as a pinned git dependency (the dark-theme commit)
- No Tailwind, no icon CDN: layout SCSS uses felix/FKUI tokens only, icons come from the FKUI default library plus a small Phosphor extension (see [Icons](#icons)), fonts are self-hosted

## Run it

```bash
bun install
bun run dev
```

Then open the printed dev-server URL.

## Build and preview

```bash
bun run build        # search index + typecheck + vite build + prerender
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

## Update the theme

`felix-ds` is a git dependency pinned to an exact commit. `bun run felix` shows and upgrades it:

| Command                       | Description                                                                               |
| ----------------------------- | ----------------------------------------------------------------------------------------- |
| `bun run felix version`       | Show the pinned commit, the installed package and the latest commit on the default branch |
| `bun run felix upgrade -n`    | Dry run: show the upgrade plan, change nothing                                            |
| `bun run felix upgrade`       | Pin the latest commit and run `bun install`                                               |
| `bun run felix upgrade <ref>` | As above, but to a chosen sha, branch or tag                                              |

## Deploy

A GitHub Pages workflow lives in `.github/workflows/deploy.yml` (never triggered by automation here – push to `main` when you want it to run).

## How this was built

See the guide in the felix-ds repo: [docs/create-a-site.sv.md](https://github.com/pattespatte/felix-ds/blob/main/docs/create-a-site.sv.md) (Swedish) or [docs/create-a-site.en.md](https://github.com/pattespatte/felix-ds/blob/main/docs/create-a-site.en.md) (English).
