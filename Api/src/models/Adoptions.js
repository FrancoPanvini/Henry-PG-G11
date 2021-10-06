const { Model, DataTypes } = require("sequelize");

module.exports = sequelize => {
  class Adoptions extends Model {}
  Adoptions.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
      state: { type: DataTypes.STRING, allowNull: false, defaultValue: "p", validate: { isIn: [["p", "a", "c"]] } },
      residence: { type: DataTypes.STRING },
      residents: { type: DataTypes.STRING },
      adult: { type: DataTypes.BOOLEAN },
      dedication: { type: DataTypes.STRING },
      otherPets: { type: DataTypes.BOOLEAN },
      otherPetsDesc: { type: DataTypes.STRING },
      oldPets: { type: DataTypes.BOOLEAN },
      oldPetsDesc: { type: DataTypes.STRING },
    },
    { sequelize: sequelize, modelName: "Adoptions", timestamps: true, paranoid: true }
  );

  Adoptions.beforeCreate(function (process) {
    if (process.residence) process.residence = process.residence.toLowerCase();
    if (process.otherPetsDesc) process.otherPetsDesc = process.otherPetsDesc.toLowerCase();
    if (process.oldPetsDesc) process.oldPetsDesc = process.oldPetsDesc.toLowerCase();
    return process;
  });
};

//* state options: pendiente aprobado cerrado
