const { Model, DataTypes } = require("sequelize");

module.exports = sequelize => {
  class LostPets extends Model {}
  LostPets.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      size: { type: DataTypes.STRING, allowNull: true, validate: { isIn: [["g", "m", "c"]] } },
      description: { type: DataTypes.TEXT, allowNull: true },
      photo: {type: DataTypes.STRING, allowNull: true},
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