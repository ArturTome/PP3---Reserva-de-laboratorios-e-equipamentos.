const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ReservaLaboratorio = sequelize.define('ReservaLaboratorio', {

    IdReservaLab: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    DataReserva: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    HoraEntrada: {
        type: DataTypes.TIME,
        allowNull: false
    },

    HoraSaida: {
        type: DataTypes.TIME,
        allowNull: false
    },

    QuantidadePessoas: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    timestamps: false
});

module.exports = ReservaLaboratorio;
