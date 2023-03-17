const { config } = require('dotenv');
const { connect, set } = require('mongoose');

config();

const DB_URI = process.env.DB_URI;

set('strictQuery', false);

async function mongoDB() {
  try {
    await connect(DB_URI);
    console.log('MongoDB is connected');
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = { mongoDB }