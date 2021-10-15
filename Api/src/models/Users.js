const { Model, DataTypes } = require("sequelize");

module.exports = sequelize => {
  class Users extends Model {}
  Users.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      mail: { type: DataTypes.STRING, allowNull: false, unique: true, isEmail: true },
      phone: { type: DataTypes.STRING },
      direction: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING },
      photo: { type: DataTypes.STRING },
      responsable: { type: DataTypes.STRING },
      dni: { type: DataTypes.INTEGER },
      description: { type: DataTypes.TEXT },
      link_web: { type: DataTypes.STRING },
      link_instagram: { type: DataTypes.STRING },
      link_facebook: { type: DataTypes.STRING },
      link_donaciones: { type: DataTypes.STRING },
      lat: { type: DataTypes.FLOAT },
      lng: { type: DataTypes.FLOAT }
    },
    { sequelize: sequelize, modelName: "Users", timestamps: true }
  );

  Users.beforeCreate(function (user) {
    user.name = user.name.toLowerCase();
    user.mail = user.mail.toLowerCase();
    if (user.responsable) {
      user.responsable = user.responsable.toLowerCase();
    }
    if (user.description) {
      user.description = user.description.toLowerCase();
    }
    return user;
  });
};
