const { Model, DataTypes } = require("sequelize");

module.exports = sequelize => {
  class Adoptions extends Model {}
  Adoptions.init(
    {
      state: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize: sequelize, modelName: "Adoptions", timestamps: false }
  );
};
