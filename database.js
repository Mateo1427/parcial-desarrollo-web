const Database = require("better-sqlite3");

const db = new Database("usuarios.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        lastName TEXT NOT NULL,
        age INTEGER NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT NOT NULL,
        date DATE,
        password TEXT NOT NULL
    )
`);

module.exports = db;
