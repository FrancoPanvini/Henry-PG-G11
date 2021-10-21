const { Model, DataTypes } = require("sequelize");

module.exports = sequelize => {
  class PetsPics extends Model {}
  PetsPics.init(
    {
      url: { type: DataTypes.TEXT, allowNull: false },
    },
    { sequelize: sequelize, modelName: "PetsPics", timestamps: false }
  );
};
