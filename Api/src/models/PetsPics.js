const { Model, DataTypes } = require("sequelize");

module.exports = sequelize => {
  class PetsPics extends Model {}
  PetsPics.init(
    {
      url: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize: sequelize, modelName: "PetsPics", timestamps: false }
  );
};
