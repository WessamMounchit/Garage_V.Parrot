const Pool = require("pg").Pool

const pool = new Pool({
  user: "postgres",
  password: "007James",
  host: "localhost",
  port: 5432,
  database: "garage"
});

module.exports = pool;