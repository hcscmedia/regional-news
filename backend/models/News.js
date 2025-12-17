const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Bitte geben Sie einen Titel ein'],
    trim: true,
    maxlength: [200, 'Titel darf nicht länger als 200 Zeichen sein']
  },
  content: {
    type: String,
    required: [true, 'Bitte geben Sie den Inhalt ein'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Bitte wählen Sie eine Kategorie'],
    enum: ['Politik', 'Wirtschaft', 'Sport', 'Kultur', 'Lokales', 'Verschiedenes'],
    default: 'Verschiedenes'
  },
  date: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('News', NewsSchema);
