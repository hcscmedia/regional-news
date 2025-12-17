// Mock Backend Server for Testing (without MongoDB requirement)
// This file provides a simple mock API for testing the frontend without needing MongoDB

const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
let mockNews = [
  {
    _id: '1',
    title: 'Neuer Radweg in der Innenstadt eröffnet',
    content: 'Die Stadt hat heute einen neuen Radweg durch die Innenstadt eröffnet. Der 2,5 Kilometer lange Weg verbindet den Hauptbahnhof mit dem Stadtpark und soll die Mobilität für Radfahrer deutlich verbessern. Bürgermeister Müller betonte bei der Eröffnung die Bedeutung nachhaltiger Verkehrskonzepte für die Zukunft der Stadt.',
    category: 'Lokales',
    date: new Date('2024-01-15'),
    createdAt: new Date('2024-01-15')
  },
  {
    _id: '2',
    title: 'Lokales Unternehmen expandiert international',
    content: 'Die TechInnovate GmbH aus unserer Region hat bekannt gegeben, dass sie ihre Geschäftstätigkeit auf drei weitere europäische Länder ausdehnen wird. Das mittelständische Softwareunternehmen beschäftigt derzeit 150 Mitarbeiter und plant, in den nächsten zwei Jahren 50 weitere Arbeitsplätze zu schaffen.',
    category: 'Wirtschaft',
    date: new Date('2024-01-14'),
    createdAt: new Date('2024-01-14')
  },
  {
    _id: '3',
    title: 'Stadtrat beschließt neuen Haushalt',
    content: 'In einer mehrstündigen Sitzung hat der Stadtrat gestern den Haushalt für das kommende Jahr verabschiedet. Schwerpunkte der Investitionen liegen in den Bereichen Bildung, Infrastruktur und Digitalisierung. Insgesamt umfasst der Etat 45 Millionen Euro.',
    category: 'Politik',
    date: new Date('2024-01-13'),
    createdAt: new Date('2024-01-13')
  },
  {
    _id: '4',
    title: 'Regionalliga: Heimsieg im Derby',
    content: 'Der FC Regionalstadt hat das Derby gegen den Nachbarverein mit 3:1 gewonnen. Vor 5.000 begeisterten Zuschauern im heimischen Stadion zeigten die Spieler eine starke Leistung. Mit diesem Sieg klettert das Team auf Platz 4 der Tabelle.',
    category: 'Sport',
    date: new Date('2024-01-12'),
    createdAt: new Date('2024-01-12')
  },
  {
    _id: '5',
    title: 'Stadttheater präsentiert neue Spielzeit',
    content: 'Das Stadttheater hat sein Programm für die kommende Spielzeit vorgestellt. Neben klassischen Stücken wie "Hamlet" und "Der Kirschgarten" stehen auch moderne Inszenierungen und experimentelles Theater auf dem Spielplan. Intendant Schmidt verspricht ein vielfältiges Angebot für alle Altersgruppen.',
    category: 'Kultur',
    date: new Date('2024-01-11'),
    createdAt: new Date('2024-01-11')
  },
  {
    _id: '6',
    title: 'Großes Stadtfest im Sommer geplant',
    content: 'Die Stadtverwaltung plant für den kommenden Sommer ein großes Stadtfest mit internationalen Künstlern und lokalen Bands. Das dreitägige Event soll auf dem Marktplatz stattfinden und verschiedene kulturelle Veranstaltungen, Foodstände und Kinderaktivitäten bieten.',
    category: 'Verschiedenes',
    date: new Date('2024-01-10'),
    createdAt: new Date('2024-01-10')
  }
];

let idCounter = 7;

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Willkommen zur Regional News Mock API',
    version: '1.0.0',
    endpoints: {
      news: '/api/news'
    }
  });
});

// Get all news
app.get('/api/news', (req, res) => {
  try {
    const { category, search } = req.query;
    let filteredNews = [...mockNews];

    if (category) {
      filteredNews = filteredNews.filter(item => item.category === category);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredNews = filteredNews.filter(item =>
        item.title.toLowerCase().includes(searchLower) ||
        item.content.toLowerCase().includes(searchLower)
      );
    }

    res.json({
      success: true,
      count: filteredNews.length,
      data: filteredNews.sort((a, b) => new Date(b.date) - new Date(a.date))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Fehler beim Laden der Nachrichten'
    });
  }
});

// Get single news
app.get('/api/news/:id', (req, res) => {
  try {
    const news = mockNews.find(item => item._id === req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        error: 'Nachricht nicht gefunden'
      });
    }

    res.json({
      success: true,
      data: news
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Fehler'
    });
  }
});

// Create news
app.post('/api/news', (req, res) => {
  try {
    const { title, content, category, date } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({
        success: false,
        error: 'Bitte füllen Sie alle erforderlichen Felder aus'
      });
    }

    const news = {
      _id: String(idCounter++),
      title,
      content,
      category,
      date: date || new Date(),
      createdAt: new Date()
    };

    mockNews.push(news);

    res.status(201).json({
      success: true,
      data: news
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Fehler beim Erstellen der Nachricht'
    });
  }
});

// Update news
app.put('/api/news/:id', (req, res) => {
  try {
    const { title, content, category, date } = req.body;
    const index = mockNews.findIndex(item => item._id === req.params.id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'Nachricht nicht gefunden'
      });
    }

    if (title) mockNews[index].title = title;
    if (content) mockNews[index].content = content;
    if (category) mockNews[index].category = category;
    if (date) mockNews[index].date = date;

    res.json({
      success: true,
      data: mockNews[index]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Fehler beim Aktualisieren der Nachricht'
    });
  }
});

// Delete news
app.delete('/api/news/:id', (req, res) => {
  try {
    const index = mockNews.findIndex(item => item._id === req.params.id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'Nachricht nicht gefunden'
      });
    }

    mockNews.splice(index, 1);

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Fehler beim Löschen der Nachricht'
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route nicht gefunden'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Mock Server läuft auf Port ${PORT}`);
  console.log('Hinweis: Dies ist ein Mock-Server für Tests ohne MongoDB');
});
