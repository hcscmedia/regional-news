require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder
app.use(express.static('public'));

// Routes
app.use('/api/news', require('./routes/news'));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Willkommen zur Regional News API',
    version: '1.0.0',
    endpoints: {
      news: '/api/news'
    }
  });
});

// Error handler for 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route nicht gefunden'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Ein interner Server-Fehler ist aufgetreten'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
