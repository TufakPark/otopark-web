const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../config.env') });

const config = {
  UP_API_PORT: process.env.UP_API_PORT,
  UP_DB_CONN: process.env.UP_DB_CONN,
  UP_JWT_SECRET: process.env.UP_JWT_SECRET
};

module.exports = config;