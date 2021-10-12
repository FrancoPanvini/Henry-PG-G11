const { Model, DataTypes } = require("sequelize");

module.exports = sequelize => {
  class LostPetsPics extends Model {}
  LostPetsPics.init(
    {
      url: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize: sequelize, modelName: "LostPetsPics", timestamps: false }
  );
};
