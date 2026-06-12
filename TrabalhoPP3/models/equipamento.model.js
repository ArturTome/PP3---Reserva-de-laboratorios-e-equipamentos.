const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Equipamento = sequelize.define('Equipamento', {

    IdEquip: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    NomeEquip: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    Descricao: {
        type: DataTypes.TEXT
    },

    Quantidade: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
},
{
    timestamps: false
});

module.exports = Equipamento;
