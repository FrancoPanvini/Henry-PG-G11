const { Model, DataTypes } = require("sequelize");

module.exports = sequelize => {
  class Events extends Model {}
  Events.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING },
      photo: { type: DataTypes.STRING },
      initDate: { type: DataTypes.DATE, allowNull: false },
      endDate: { type: DataTypes.DATE, allowNull: false },
      direction: { type: DataTypes.STRING, allowNull: false },
      lat: { type: DataTypes.FLOAT },
      lng: { type: DataTypes.FLOAT }
    },
    { sequelize: sequelize, modelName: "Events", timestamps: true, paranoid: true }
  );
  Events.beforeCreate(function (event) {
    event.name = event.name.toLowerCase();
    event.direction = event.direction.toLowerCase();
    event.description = event.description.toLowerCase();
    return event;
  });
};
