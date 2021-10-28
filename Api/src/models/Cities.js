const { Model, DataTypes } = require('sequelize');

module.exports = sequelize => {
  class Cities extends Model {}
  Cities.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize: sequelize, modelName: 'Cities', timestamps: false }
  );
};
