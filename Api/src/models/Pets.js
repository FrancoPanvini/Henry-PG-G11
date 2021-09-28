const { Model, DataTypes } = require("sequelize");

module.exports = sequelize => {
  class Pets extends Model {}
  Pets.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      size: { type: DataTypes.STRING, allowNull: true, validate: { isIn: ["g", "m", "c"] } },
      sex: { type: DataTypes.STRING, allowNull: true, validate: { isIn: ["m", "h"] } },
      age: { type: DataTypes.INTEGER, allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      adopted: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    { sequelize: sequelize, modelName: "Pets", timestamps: true, paranoid: true }
  );

  Pets.beforeCreate(function (event) {
    event.name = event.name.toLowerCase();
    return event;
  });
};
