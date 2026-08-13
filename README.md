# 🎵 Music Hub

A free, static, GitHub Pages-hosted music hub — pick a themed playlist and enjoy a simple **Now Playing** experience: one song at a time, with Play/Pause, Previous, and Next controls, powered by YouTube's free embedded player.

**Live site:** https://dtrup00.github.io/music-hub/

## Playlists

- 🪔 **[Durga Puja](playlists/durga-puja/)** — "Maa Asche" themed page with devotional/festive songs and rotating Bengali taglines.
- 💪 **[Gym](playlists/gym/)** — "Gym Ready" themed page with workout songs and rotating motivational taglines.

## How it works

- Each playlist page shows only the **current song** (title, artist, thumbnail) — no full track list clutter.
- Controls: ⏮ Previous, ▶/⏸ Play/Pause, ⏭ Next.
- A catchy tagline is shown under the page title, and a rotating quote inside the card changes as you skip songs.
- Songs are streamed via the official, free [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference) — no paid service, no self-hosted audio files.
- Background photos are pulled live from a free keyword-based image service (no images stored in this repo).

## Project structure

```
music-hub/
├── index.html                 → Landing page linking to each playlist
├── assets/
│   └── shared/
│       ├── base.css           → Shared responsive layout for all playlist pages
│       └── player.js          → Reusable YouTube-powered player engine
└── playlists/
    ├── durga-puja/
    │   ├── index.html
    │   ├── style.css           → Theme-specific colors/background
    │   ├── songs.js             → List of {title, artist, youtubeId}
    │   └── quotes.js             → Rotating taglines
    └── gym/
        ├── index.html
        ├── style.css
        ├── songs.js
        └── quotes.js
```

## Adding a new playlist

1. Duplicate the `playlists/gym/` folder as a starting template.
2. Update `songs.js` with your own `{ title, artist, youtubeId }` entries.
3. Update `quotes.js` with your own rotating taglines.
4. Tweak `style.css` (background image/colors) and the hero title in `index.html`.
5. Add a card for it on the main `index.html` landing page.

## Editing an existing playlist

- To add/remove/reorder songs, edit the `SONGS` array in the relevant `playlists/<name>/songs.js`.
- To change the rotating taglines, edit the `QUOTES` array in `playlists/<name>/quotes.js`.

## Hosting

This site is 100% free to host — it's deployed via **GitHub Pages** directly from the `main` branch (Settings → Pages → Deploy from a branch → `main` / `root`). No build step, no server, no cost.
