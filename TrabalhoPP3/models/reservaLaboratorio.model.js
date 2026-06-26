const {DataTypes}=require("sequelize");
const sequelize=require("../config/database");

const ReservaLaboratorio=sequelize.define("ReservaLaboratorio",{

    IdReservaLab:{

        type:DataTypes.INTEGER,

        primaryKey:true,

        autoIncrement:true

    },

    DataReserva:{

        type:DataTypes.DATEONLY

    },

    HoraEntrada:{

        type:DataTypes.TIME

    },

    HoraSaida:{

        type:DataTypes.TIME

    },

    QuantidadePessoas:{

        type:DataTypes.INTEGER

    },

    DataCriacao:{

        type:DataTypes.DATE,

        defaultValue:DataTypes.NOW

    }

},{
    timestamps:false
});

module.exports=ReservaLaboratorio;
