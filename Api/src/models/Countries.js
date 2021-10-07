const { Model, DataTypes } = require("sequelize");

module.exports = sequelize => {
  class Countries extends Model {}
  Countries.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      code: { type: DataTypes.STRING },
    },
    { sequelize: sequelize, modelName: "Countries", timestamps: false }
  );

  /* Countries.beforeCreate(function (country) {
    country.name = country.name.toLowerCase();
    return country;
  }); */
};
