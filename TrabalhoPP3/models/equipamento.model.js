const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Equipamento = sequelize.define("Equipamento",{

    IdEquip:{

        type:DataTypes.INTEGER,

        primaryKey:true,

        autoIncrement:true

    },

    NomeEquip:{

        type:DataTypes.STRING(30),

        allowNull:false,

        unique:true

    },

    Durabilidade:{

        type:DataTypes.STRING(12)

    },

    Quantidade:{

        type:DataTypes.INTEGER,

        defaultValue:1

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

module.exports = Equipamento;
