# Regional News Website

Eine moderne regionale Nachrichtenseite mit React, Node.js, Express und MongoDB.

## Projektstruktur

```
regional-news/
├── backend/          # Node.js Express API
│   ├── config/       # Datenbank-Konfiguration
│   ├── models/       # Mongoose-Modelle
│   ├── routes/       # API-Routen
│   ├── public/       # Statische Dateien
│   ├── server.js     # Express-Server
│   └── seed.js       # Datenbank-Seed-Skript
├── frontend/         # React-Anwendung
│   ├── src/
│   │   ├── api/      # API-Service
│   │   ├── components/ # React-Komponenten
│   │   ├── pages/    # Seiten-Komponenten
│   │   └── App.jsx   # Haupt-App-Komponente
│   └── package.json
└── README.md
```

## Technologien

### Backend
- **Node.js** - JavaScript-Laufzeitumgebung
- **Express.js** - Web-Framework
- **MongoDB** - NoSQL-Datenbank
- **Mongoose** - MongoDB ODM

### Frontend
- **React** - UI-Framework
- **Vite** - Build-Tool
- **Tailwind CSS** - Utility-First CSS Framework
- **Axios** - HTTP-Client
- **React Router** - Client-seitiges Routing

## Funktionen

- ✅ Nachrichtenübersicht mit Grid-Layout
- ✅ Einzelansicht für Nachrichtenartikel
- ✅ Kategoriefilterung (Politik, Wirtschaft, Sport, Kultur, Lokales, Verschiedenes)
- ✅ Suchfunktion
- ✅ Responsives Design
- ✅ CRUD-API für Artikel (Create, Read, Update, Delete)
- ✅ MongoDB-Integration
- ✅ Fehlerbehandlung

## Installation und Start

### Voraussetzungen
- Node.js (v14 oder höher)
- MongoDB (lokal installiert oder Cloud-Instanz)

### Backend einrichten

1. Navigiere zum Backend-Verzeichnis:
```bash
cd backend
```

2. Installiere Abhängigkeiten:
```bash
npm install
```

3. Erstelle eine `.env` Datei:
```bash
cp .env.example .env
```

4. Bearbeite die `.env` Datei nach Bedarf:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/regional-news
NODE_ENV=development
```

5. Starte MongoDB (falls lokal):
```bash
mongod
```

6. Fülle die Datenbank mit Beispieldaten:
```bash
npm run seed
```

7. Starte den Backend-Server:
```bash
npm run dev
```

Der Backend-Server läuft nun auf `http://localhost:5000`

### Frontend einrichten

1. Öffne ein neues Terminal und navigiere zum Frontend-Verzeichnis:
```bash
cd frontend
```

2. Installiere Abhängigkeiten:
```bash
npm install
```

3. Starte den Development-Server:
```bash
npm run dev
```

Die Frontend-Anwendung läuft nun auf `http://localhost:5173`

## API-Endpunkte

### Nachrichten

- `GET /api/news` - Alle Nachrichten abrufen
  - Query-Parameter: `?category=Politik&search=keyword`
- `GET /api/news/:id` - Einzelne Nachricht abrufen
- `POST /api/news` - Neue Nachricht erstellen
- `PUT /api/news/:id` - Nachricht aktualisieren
- `DELETE /api/news/:id` - Nachricht löschen

### Request-Body-Beispiel (POST/PUT)
```json
{
  "title": "Nachrichtentitel",
  "content": "Nachrichteninhalt...",
  "category": "Politik",
  "date": "2024-01-15T00:00:00.000Z"
}
```

## Branches

Das Projekt kann in separaten Branches organisiert werden:

- `main` / `copilot/create-news-website-structure` - Hauptbranch mit vollständiger Integration
- `frontend` - Kann erstellt werden, um nur Frontend-Code zu enthalten
- `backend` - Kann erstellt werden, um nur Backend-Code zu enthalten

Um separate Branches zu erstellen:

### Backend-Branch erstellen
```bash
git checkout -b backend
rm -rf frontend
git add -A
git commit -m "Backend branch - only backend code"
git push -u origin backend
```

### Frontend-Branch erstellen
```bash
git checkout -b frontend
rm -rf backend
git add -A
git commit -m "Frontend branch - only frontend code"
git push -u origin frontend
```

## Entwicklung

### Backend-Entwicklung
```bash
cd backend
npm run dev  # Verwendet nodemon für Auto-Reload
```

### Frontend-Entwicklung
```bash
cd frontend
npm run dev  # Vite Development Server mit HMR
```

## Sicherheit

Siehe [SECURITY.md](SECURITY.md) für Sicherheitshinweise und Empfehlungen für den Produktionseinsatz.

## Lizenz

MIT
