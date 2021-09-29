const server = require("./src/app.js");
const { conn } = require("./src/db.js");

//* Descomentar esta línea para restartear la DB
/* conn.sync({ force: true }).then(() => { */
//* Descomentar esta línea para NO restartear la DB
conn.sync().then(() => {
  server.listen(3001, () => {
    console.log("Server listening at 3001");
  });
});
