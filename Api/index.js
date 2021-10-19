const server = require('./src/app.js');
const { conn, Pets, PetsType, UsersType, Users, Events } = require('./src/db.js');

conn
  .sync({alter: true})
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`Server listening at ${process.env.PORT}`);
    });
  })
  .then(() => {
    // PetsType.bulkCreate(petsTypesArray);
    // UsersType.bulkCreate(usersTypesArray);
  })
 

const petsTypesArray = [
  { id: 'p', type: 'Perro' },
  { id: 'g', type: 'Gato' },
];

const usersTypesArray = [
  { id: 'i', type: 'Individuo' },
  { id: 'r', type: 'Refugio' },
  { id: 'a', type: 'Admin' },
];
