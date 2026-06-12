const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {

    IdUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    Login: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },

    Senha: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    StatusADM: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},
{
    timestamps: false
});

module.exports = Usuario;
