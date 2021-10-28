const server = require('./src/app.js');
const { conn, PetsType, UsersType } = require('./src/db.js');

conn.sync().then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`Server listening at ${process.env.PORT}`);
  });
});

/*
//* Líneas para precargar la DB con PetsTypes y UsersTypes  
  .then(() => {
    PetsType.bulkCreate(petsTypesArray);
    UsersType.bulkCreate(usersTypesArray);
  });
const petsTypesArray = [
  { id: 'p', type: 'Perro' },
  { id: 'g', type: 'Gato' },
];
const usersTypesArray = [
  { id: 'i', type: 'Individuo' },
  { id: 'r', type: 'Refugio' },
  { id: 'a', type: 'Admin' },
];
*/
