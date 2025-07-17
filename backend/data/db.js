
const mysql = require("mysql2");

// Connexion simple
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "location_voiture"
});

module.exports = db;
