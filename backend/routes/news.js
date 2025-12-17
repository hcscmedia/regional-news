const express = require('express');
const router = express.Router();
const News = require('../models/News');

// @route   GET /api/news
// @desc    Get all news articles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const news = await News.find(query).sort({ date: -1 });
    res.json({
      success: true,
      count: news.length,
      data: news
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Fehler beim Laden der Nachrichten'
    });
  }
});

// @route   GET /api/news/:id
// @desc    Get single news article
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

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
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Nachricht nicht gefunden'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Fehler'
    });
  }
});

// @route   POST /api/news
// @desc    Create a new news article
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { title, content, category, date } = req.body;

    // Validation
    if (!title || !content || !category) {
      return res.status(400).json({
        success: false,
        error: 'Bitte füllen Sie alle erforderlichen Felder aus'
      });
    }

    const news = await News.create({
      title,
      content,
      category,
      date: date || Date.now()
    });

    res.status(201).json({
      success: true,
      data: news
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Fehler beim Erstellen der Nachricht'
    });
  }
});

// @route   PUT /api/news/:id
// @desc    Update a news article
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const { title, content, category, date } = req.body;

    let news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        error: 'Nachricht nicht gefunden'
      });
    }

    // Update fields
    if (title) news.title = title;
    if (content) news.content = content;
    if (category) news.category = category;
    if (date) news.date = date;

    news = await news.save();

    res.json({
      success: true,
      data: news
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Nachricht nicht gefunden'
      });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Fehler beim Aktualisieren der Nachricht'
    });
  }
});

// @route   DELETE /api/news/:id
// @desc    Delete a news article
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        error: 'Nachricht nicht gefunden'
      });
    }

    await news.deleteOne();

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Nachricht nicht gefunden'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Fehler beim Löschen der Nachricht'
    });
  }
});

module.exports = router;
