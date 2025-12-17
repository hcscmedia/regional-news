# Regional News Frontend

React-Anwendung für die regionale Nachrichtenseite.

## Features

- 📰 Nachrichtenübersicht mit Grid-Layout
- 🔍 Suchfunktion für Nachrichten
- 🏷️ Kategoriefilterung
- 📱 Vollständig responsives Design
- 🎨 Modernes UI mit Tailwind CSS
- ⚡ Schnelles HMR mit Vite

## Technologie-Stack

- **React 18** - UI-Framework
- **Vite** - Build-Tool und Dev-Server
- **Tailwind CSS** - Styling
- **Axios** - HTTP-Requests
- **React Router DOM** - Routing

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Die Anwendung läuft auf `http://localhost:5173`

## Build

```bash
npm run build
```

## Projektstruktur

```
src/
├── api/           # API-Service-Funktionen
│   └── newsApi.js
├── components/    # Wiederverwendbare Komponenten
│   ├── Navbar.jsx
│   ├── NewsCard.jsx
│   ├── CategoryFilter.jsx
│   └── SearchBar.jsx
├── pages/         # Seiten-Komponenten
│   ├── Home.jsx
│   └── NewsDetail.jsx
├── App.jsx        # Haupt-App-Komponente
├── main.jsx       # Entry Point
└── index.css      # Globale Styles mit Tailwind
```

## Komponenten

### Navbar
Navigationsleiste mit Logo und Links

### NewsCard
Kartenkomponente für Nachrichtenvorschau

### CategoryFilter
Filterbuttons für Nachrichtenkategorien

### SearchBar
Suchleiste für Nachrichtensuche

### Home
Hauptseite mit Nachrichtenübersicht

### NewsDetail
Detailseite für einzelne Nachricht

## API-Integration

Die Anwendung kommuniziert mit dem Backend über die `newsApi` in `src/api/newsApi.js`.

Standard-Backend-URL: `http://localhost:5000/api`

## Kategorien

- Politik
- Wirtschaft
- Sport
- Kultur
- Lokales
- Verschiedenes
