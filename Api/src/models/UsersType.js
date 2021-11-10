const { Model, DataTypes } = require('sequelize');

module.exports = sequelize => {
  class UsersType extends Model {}
  UsersType.init(
    {
      id: { type: DataTypes.STRING, primaryKey: true, allowNull: false, validate: { is: /[a-z]/i } },
      type: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize: sequelize, modelName: 'UsersType', timestamps: false }
  );

  UsersType.beforeCreate(function (petsType) {
    petsType.type = petsType.type.toLowerCase();
    return petsType;
  });
};
