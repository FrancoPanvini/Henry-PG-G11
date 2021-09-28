const { Model, DataTypes } = require("sequelize");

module.exports = sequelize => {
  class Events extends Model {}
  Events.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING },
      //* Agregar una imagen de not available en cloudinary y poner esa URL
      photo: {
        type: DataTypes.STRING /*,defaultValue='https://www.ecpgr.cgiar.org/fileadmin/templates/ecpgr.org/Assets/images/No_Image_Available.jpg'*/,
      },
      initDate: { type: DataTypes.DATE, allowNull: false },
      endDate: { type: DataTypes.DATE, allowNull: false },
      location: { type: DataTypes.STRING, allowNull: false },
      direction: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize: sequelize, modelName: "Events", timestamps: true, paranoid: true }
  );
  //* guardar todo en lowercase les copa?
  Events.beforeCreate(function (event) {
    event.name = event.name.toLowerCase();
    event.direction = event.direction.toLowerCase();
    return event;
  });
};
