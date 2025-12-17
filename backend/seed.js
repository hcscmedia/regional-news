require('dotenv').config();
const mongoose = require('mongoose');
const News = require('./models/News');

// Sample data
const sampleNews = [
  {
    title: 'Neuer Radweg in der Innenstadt eröffnet',
    content: 'Die Stadt hat heute einen neuen Radweg durch die Innenstadt eröffnet. Der 2,5 Kilometer lange Weg verbindet den Hauptbahnhof mit dem Stadtpark und soll die Mobilität für Radfahrer deutlich verbessern. Bürgermeister Müller betonte bei der Eröffnung die Bedeutung nachhaltiger Verkehrskonzepte für die Zukunft der Stadt.',
    category: 'Lokales',
    date: new Date('2024-01-15')
  },
  {
    title: 'Lokales Unternehmen expandiert international',
    content: 'Die TechInnovate GmbH aus unserer Region hat bekannt gegeben, dass sie ihre Geschäftstätigkeit auf drei weitere europäische Länder ausdehnen wird. Das mittelständische Softwareunternehmen beschäftigt derzeit 150 Mitarbeiter und plant, in den nächsten zwei Jahren 50 weitere Arbeitsplätze zu schaffen.',
    category: 'Wirtschaft',
    date: new Date('2024-01-14')
  },
  {
    title: 'Stadtrat beschließt neuen Haushalt',
    content: 'In einer mehrstündigen Sitzung hat der Stadtrat gestern den Haushalt für das kommende Jahr verabschiedet. Schwerpunkte der Investitionen liegen in den Bereichen Bildung, Infrastruktur und Digitalisierung. Insgesamt umfasst der Etat 45 Millionen Euro.',
    category: 'Politik',
    date: new Date('2024-01-13')
  },
  {
    title: 'Regionalliga: Heimsieg im Derby',
    content: 'Der FC Regionalstadt hat das Derby gegen den Nachbarverein mit 3:1 gewonnen. Vor 5.000 begeisterten Zuschauern im heimischen Stadion zeigten die Spieler eine starke Leistung. Mit diesem Sieg klettert das Team auf Platz 4 der Tabelle.',
    category: 'Sport',
    date: new Date('2024-01-12')
  },
  {
    title: 'Stadttheater präsentiert neue Spielzeit',
    content: 'Das Stadttheater hat sein Programm für die kommende Spielzeit vorgestellt. Neben klassischen Stücken wie "Hamlet" und "Der Kirschgarten" stehen auch moderne Inszenierungen und experimentelles Theater auf dem Spielplan. Intendant Schmidt verspricht ein vielfältiges Angebot für alle Altersgruppen.',
    category: 'Kultur',
    date: new Date('2024-01-11')
  },
  {
    title: 'Großes Stadtfest im Sommer geplant',
    content: 'Die Stadtverwaltung plant für den kommenden Sommer ein großes Stadtfest mit internationalen Künstlern und lokalen Bands. Das dreitägige Event soll auf dem Marktplatz stattfinden und verschiedene kulturelle Veranstaltungen, Foodstände und Kinderaktivitäten bieten.',
    category: 'Verschiedenes',
    date: new Date('2024-01-10')
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/regional-news', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB verbunden');

    // Clear existing data
    await News.deleteMany({});
    console.log('Alte Daten gelöscht');

    // Insert sample data
    await News.insertMany(sampleNews);
    console.log('Beispieldaten eingefügt');

    process.exit(0);
  } catch (error) {
    console.error('Fehler beim Seeden:', error);
    process.exit(1);
  }
};

seedDB();
