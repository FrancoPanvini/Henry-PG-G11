const { Model, DataTypes } = require('sequelize');

module.exports = sequelize => {
  class Countries extends Model {}
  Countries.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize: sequelize, modelName: 'Countries', timestamps: false }
  );
};
