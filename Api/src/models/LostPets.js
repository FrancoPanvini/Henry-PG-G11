const { Model, DataTypes } = require("sequelize");

module.exports = sequelize => {
  class LostPets extends Model {}
  LostPets.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      size: { type: DataTypes.STRING, allowNull: true, validate: { isIn: [["g", "m", "c"]] } },
      sex: { type: DataTypes.STRING, allowNull: true, validate: { isIn: [["m", "h"]] } },
      age: { type: DataTypes.INTEGER, allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      found: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    },
    { sequelize: sequelize, modelName: "LostPets", timestamps: true, paranoid: true }
  );

  LostPets.beforeCreate(function (pet) {
    pet.name = pet.name.toLowerCase();
    pet.description = pet.description.toLowerCase();
    return pet;
  });
};