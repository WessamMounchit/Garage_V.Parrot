const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();


const dbURL = process.env.PG_CONNECTION_STRING

const pool = new Pool({
  connectionString: dbURL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
