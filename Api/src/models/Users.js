const { Model, DataTypes } = require("sequelize");

module.exports = sequelize => {
  class Users extends Model {}
  Users.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      mail: { type: DataTypes.STRING, allowNull: false, unique: true, isEmail: true },
      phone: { type: DataTypes.STRING, allowNull: false },
      direction: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      photo: { type: DataTypes.STRING },
      responsable: { type: DataTypes.STRING },
      dni: { type: DataTypes.INTEGER, allowNull: false },
      description: { type: DataTypes.TEXT },
      link_web: { type: DataTypes.STRING },
      link_instagram: { type: DataTypes.STRING },
      link_facebook: { type: DataTypes.STRING },
      link_donaciones: { type: DataTypes.STRING },
    },
    { sequelize: sequelize, modelName: "Users", timestamps: true, paranoid: true }
  );
  Users.beforeCreate(function (user) {
    user.name = user.name.toLowerCase();
    user.mail = user.mail.toLowerCase();
    user.direction = user.direction.toLowerCase();
    user.responsable = user.responsable.toLowerCase();
    return user;
  });
};
