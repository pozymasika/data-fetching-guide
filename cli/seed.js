var { createConnection, createTable, seedDatabase } = require("../src/database");

async function run() {
  const db = await createConnection();
  await createTable(db);
  await seedDatabase(db);
  db.close();
}

run()
  .then(() => {
    console.log("Done.");
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
