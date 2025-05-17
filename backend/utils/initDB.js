 const Educator = require('../models/Educator');

const initializeDB = async () => {
  try {
    await Educator.initEducator();
    console.log('Database initialization complete');
  } catch (err) {
    console.error('Database initialization failed:', err);
    process.exit(1);
  }
};

module.exports = initializeDB;