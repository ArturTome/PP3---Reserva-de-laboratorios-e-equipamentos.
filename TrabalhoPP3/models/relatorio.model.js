const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Relatorio = sequelize.define('Relatorio', {

    IdRelatorio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    DataGeracao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },

    Conteudo: {
        type: DataTypes.TEXT
    }
},
{
    timestamps: false
});

module.exports = Relatorio;
