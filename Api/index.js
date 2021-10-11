const server = require("./src/app.js");
const { conn, Pets, PetsType, UsersType, Users, Events } = require("./src/db.js");
const countryLoader = require("./utils/Countries&ProvincesArray");

//* Descomentar esta línea para restartear la DB
//conn.sync({ force: true }).then(() => {
//* Descomentar esta línea para NO restartear la DB
conn
  .sync()
  .then(() => {
    server.listen(3001, () => {
      console.log(`Server listening at 3001`);
    });
  })
  .then(() => {
    //PetsType.bulkCreate(petsTypesArray);
    //UsersType.bulkCreate(usersTypesArray);
  })
  .then(() => {
    //Users.bulkCreate(userArray);
  })
  .then(() => {
    //Pets.bulkCreate(petsArray);
    //Events.bulkCreate(eventsArray)
  });

const petsTypesArray = [
  { id: "p", type: "Perro" },
  { id: "g", type: "Gato" },
];

const userArray = [
  { name: "Franco Panvini", mail: "franco@gmail.com", phone: "5434195548", direction: "maipu 516", password: "123456", dni: 33807938 },
  { name: "lucas chaves", mail: "lucas@gmail.com", phone: "5434198576", direction: "1234 calle", password: "dfasfsadg", dni: 35248 },
  { name: "santiago petri", mail: "santi@hotmail.com", phone: "5489571556", direction: "2587asd asd", password: "sdafsa asfgas", dni: 54796315 },
];

const usersTypesArray = [
  { id: "i", type: "Individuo" },
  { id: "r", type: "Refugio" },
  { id: "a", type: "Admin" },
];

const eventsArray = [
  { name: "evento 1", description: "asd1", initDate: "2020-09-29", endDate: "2020-09-30", direction: "calle 123", Cityid: 1, UserId: 2 },
  { name: "evento 2", description: "asd2", initDate: "2020-10-01", endDate: "2020-10-02", direction: "calle 123", Cityid: 2, UserId: 1 },
  { name: "evento 3", description: "asd3", initDate: "2020-10-05", endDate: "2020-10-06", direction: "calle 123", Cityid: 1, UserId: 3 },
];

const petsArray = [
  { name: "Juancho", PetsTypeId: "p", Cityid: 1, sex: "m", size: "c", age: 0, Ownerid:1  },
  { name: "Juana", PetsTypeId: "g", Cityid: 2, sex: "h", size: "m", age: 2, Ownerid: 2 },
  { name: "Renato", PetsTypeId: "p", Cityid: 3, sex: "m", size: "g", age: 3, Ownerid: 3 },
  { name: "Pipita", PetsTypeId: "g", Cityid: 2, sex: "h", size: "g", age: 8, Ownerid: 2 },
];
