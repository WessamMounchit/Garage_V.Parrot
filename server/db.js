const { config } = require('dotenv')
config()
const { Pool } = require("pg")


const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE
});

/*// Utilisez la méthode `query` pour exécuter une requête SELECT simple
pool.query('SELECT * FROM users', (err, result) => {
  if (err) {
    console.error('Erreur lors de la connexion à la base de données:', err);
  } else {
    console.log('Connexion à la base de données établie avec succès. Résultat:', result.rows[2]);
  }

  // Fermez le pool de connexion après avoir vérifié la connexion
  pool.end();
});*/

module.exports = {
  query: (text, params) => pool.query(text, params),
};