const { Model, DataTypes } = require("sequelize");

module.exports = sequelize => {
  class PetsType extends Model {}
  PetsType.init(
    {
      id: { type: DataTypes.STRING, allowNull: false, validate: { is: /[a-z]/i } },
      type: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize: sequelize, modelName: "PetsType", timestamps: false }
  );

  PetsType.beforeCreate(function (petsType) {
    petsType.type = petsType.type.toLowerCase();
    return petsType;
  });
};
