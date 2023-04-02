var sqlite3 = require("sqlite3").verbose();

function createConnection() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database("./database.db", (err) => {
      if (err) {
        reject(err.message);
      }
      console.log("Connected to database.");
      resolve(db);
    });
  });
}

function createTable(db) {
  return new Promise((resolve, reject) => {
    // create cities table with id, name, slug fields
    db.run(
      `CREATE TABLE IF NOT EXISTS cities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT NOT NULL
    )`,
      (err) => {
        if (err) {
          reject(err.message);
        }
        console.log("Created cities table.");
        resolve();
      }
    );
  });
}

function seedDatabase(db) {
  return new Promise((resolve, reject) => {
    // insert cities into cities table
    db.run(
      `INSERT INTO cities (name, slug) VALUES
      ("New York", "new-york"),
      ("Nairobi", "nairobi"),
      ("London", "london"),
      ("Tokyo", "tokyo"),
      ("Sydney", "sydney")`,
      (err) => {
        if (err) {
          reject(err.message);
        }
        console.log("Seeded cities table.");
        resolve();
      }
    );
  });
}

/**
 * get all cities from cities table
 * @param {*} db
 * @returns {Promise<Array<{ id: string; name: string; slug: string }>>}
 */
async function getCities(db) {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM cities", (err, rows) => {
      if (err) {
        reject(err.message);
      }
      resolve(rows);
    });
  });
}

/**
 *
 * @param {*} db
 * @param {string} slug
 * @returns {Promise<{ id: string; name: string; slug: string }>}
 */
async function getCityBySlug(db, slug) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM cities WHERE slug = ?", [slug], (err, row) => {
      if (err) {
        reject(err.message);
      }
      resolve(row);
    });
  });
}

module.exports = {
  createConnection,
  createTable,
  seedDatabase,
  getCities,
  getCityBySlug,
};
