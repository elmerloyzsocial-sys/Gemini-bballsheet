/
├── index.html          # Team A page (interactive, editable)
├── team-b.html         # Team B page (static, read-only)
├── style.css           # Shared NBA-inspired styles
├── app.js              # Team A logic and interactivity
├── team-b.js           # Team B display logic and data
├── team-b-logo.png     # Team B logo image (replace with your actual logo)
├── README.md           # Project overview and instructions
├── manifest.json       # (optional) PWA manifest
├── service-worker.js   # (optional) For offline/PWA support

# Basketball Scoresheet (Advanced)

A feature-rich, mobile-friendly basketball scoresheet web app for teams, officials, fans, and leagues.

## Features

- **Player Substitution Tracker**: Track who's on court and time played per player.
- **Advanced Stats**: Steals, blocks, turnovers, FG/FT/3PT made/attempted, auto percentages.
- **Team Summary**: Total team stats, running score, lead changes.
- **Period Log / Game Events**: Auto/game event log (scoring, subs, fouls, etc.).
- **Export to CSV/Excel**: Export all stats, log, and game info.
- **Player Portraits**: Upload player photos.
- **Customizable Periods**: Support O.T., custom period names.
- **Theme Switcher**: Light/dark mode.
- **Team Logo Upload**: Upload team badges.
- **Auto Save to Cloud**: LocalStorage persistence (Google Drive placeholder).
- **Mobile Web App Features**: Add to home screen, offline support (PWA).
- **Referee/Officials Section**
- **Game Location/Date**

## Usage

1. Host with GitHub Pages.
2. Use on mobile or desktop.
3. All data auto-saves; use "Reset Scoresheet" to clear.
4. Export, print, or save to cloud.

## File Structure

```
basketball-scoresheet/
├── index.html
├── style.css
├── app.js
├── manifest.json
├── service-worker.js
└── README.md
```

## PWA/Offline

- Add to home screen.
- Offline: Service worker caches files.

## To enable offline:

Add this to your repo and set up GitHub Pages!
