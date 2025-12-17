const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/regional-news', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB verbunden: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Fehler: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
