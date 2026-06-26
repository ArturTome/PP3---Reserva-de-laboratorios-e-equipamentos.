const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Laboratorio = sequelize.define("Laboratorio",{

    IdLab:{

        type:DataTypes.INTEGER,

        autoIncrement:true,

        primaryKey:true

    },

    NomeLab:{

        type:DataTypes.STRING(30),

        unique:true,

        allowNull:false

    },

    HoraEntrada:{

        type:DataTypes.TIME,

        allowNull:false

    },

    HoraSaida:{

        type:DataTypes.TIME,

        allowNull:false

    }

},{
    timestamps:false
});

module.exports = Laboratorio;
