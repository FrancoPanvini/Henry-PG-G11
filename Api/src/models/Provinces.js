const { Model, DataTypes } = require("sequelize");

module.exports = sequelize => {
  class Provinces extends Model {}
  Provinces.init(
    {
      name: { name: DataTypes.STRING, allowNull: false },
    },
    { sequelize: sequelize, modelName: "Provinces", timestamps: false }
  );

  Provinces.beforeCreate(function (province) {
    province.name = province.name.toLowerCase();
    return province;
  });
};
