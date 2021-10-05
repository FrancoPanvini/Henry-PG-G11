const { Sequelize } = require("sequelize");
require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const fs = require("fs");
const path = require("path");

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
        define: {
          freezeTableName: true,
        },
      })
    : new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/Pets`, {
        logging: false, // set to console.log to see the raw SQL queries
        native: false,
        define: {
          freezeTableName: true,
        },
      });

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(file => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
  .forEach(file => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));

// En sequelize.models están todos los modelos importados como propiedades
const { Pets, Users, Events, Adoptions, Cities, Provinces, Countries, PetsType, UsersType, PetsPics, LostPets } = sequelize.models;

//Relaciones
Pets.belongsTo(PetsType);
PetsType.hasMany(Pets);

PetsPics.belongsTo(Pets);
Pets.hasMany(PetsPics);

Users.belongsTo(UsersType);
UsersType.hasMany(Users);

Provinces.belongsTo(Countries);
Countries.hasMany(Provinces);

Cities.belongsTo(Provinces);
Provinces.hasMany(Cities);

Pets.belongsTo(Cities);
Cities.hasMany(Pets);

Users.belongsTo(Cities);
Cities.hasMany(Users);

Events.belongsTo(Cities);
Cities.hasMany(Events);

Events.belongsTo(Users);
Users.hasMany(Events);

Pets.belongsTo(Users, { as: "Adopter", foreignKey: "Adopterid" });
Users.hasMany(Pets, { foreignKey: "Adopterid" });

Pets.belongsTo(Users, { as: "Owner", foreignKey: "Ownerid" });
Users.hasMany(Pets, { foreignKey: "Ownerid" });

Pets.belongsToMany(Users, { through: Adoptions });
Users.belongsToMany(Pets, { through: Adoptions });

LostPets.belongsTo(Cities);
Cities.hasMany(LostPets);

LostPets.belongsTo(Users);
Users.hasMany(LostPets);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
