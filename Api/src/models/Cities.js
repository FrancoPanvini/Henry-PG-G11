const { Model, DataTypes } = require("sequelize");

module.exports = sequelize => {
  class Cities extends Model {}
  Cities.init(
    {
      name: { name: DataTypes.STRING, allowNull: false },
    },
    { sequelize: sequelize, modelName: "Cities", timestamps: false }
  );

  Cities.beforeCreate(function (city) {
    city.name = city.name.toLowerCase();
    return city;
  });
};
