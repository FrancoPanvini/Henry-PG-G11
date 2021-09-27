const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        type:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: user
        },
        
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        mail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            isEmail: true
        },

        phone: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        location: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        image:{
            type: DataTypes.STRING
        },

        dni: {
            type: DataTypes.INTEGER
        },

        description: {
            type: DataTypes.TEXT
        },

        link_web: {
            type: DataTypes.STRING
        },

        link_instagram: {
            type: DataTypes.STRING
        },

        link_facebook: {
            type: DataTypes.STRING
        },

        link_donaciones: {
            type: DataTypes.STRING
        },
    })
}