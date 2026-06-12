const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ReservaEquipamento = sequelize.define('ReservaEquipamento', {

    IdReservaEquip: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    DataReserva: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    HoraRetirada: {
        type: DataTypes.TIME,
        allowNull: false
    },

    HoraDevolucao: {
        type: DataTypes.TIME,
        allowNull: false
    }
},
{
    timestamps: false
});

module.exports = ReservaEquipamento;
