const { Model, DataTypes } = require("sequelize");

module.exports = sequelize => {
  class Provinces extends Model {}
  Provinces.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize: sequelize, modelName: "Provinces", timestamps: false }
  );

/*   Provinces.beforeCreate(function (province) {
    province.name = province.name.toLowerCase();
    return province;
  }); */
};
