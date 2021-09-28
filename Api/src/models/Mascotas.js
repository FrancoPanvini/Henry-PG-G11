const { Model, DataTypes } = require('sequelize');


module.exports = sequelize => {
  class Pets extends Model {}
  Pets.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      sex: { type: DataTypes.STRING, allowNull: true },
      age: { type: DataTypes.STRING, allowNull: true },
      size: { type: DataTypes.STRING, allowNull: true },
      description: { type: DataTypes.STRING, allowNull: true },
      adopted: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    { sequelize: sequelize, modelName: "Pets", timestamps: true, paranoid: true }
  )

  Pets.beforeCreate(function (event) {
    event.name = event.name.toLowerCase();
    event.age = event.age.toLowerCase();
    event.description = event.description.toLowerCase();
    return event;
  });
  }

