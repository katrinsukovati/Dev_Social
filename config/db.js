const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// Connecting to mongodb
// Async arrow function
const connectDB = async () => {
  try {
    // mongoose.connect(db) returns a promise therefore we await it
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.log(err.message);
    // Exit process with failure if we can not connect to mongoDB
    process.exit(1);
  }
};

// Exporting our function
module.exports = connectDB;
