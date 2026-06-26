const {DataTypes}=require("sequelize");
const sequelize=require("../config/database");

const ReservaEquipamento=sequelize.define("ReservaEquipamento",{

    IdReservaEquip:{

        type:DataTypes.INTEGER,

        autoIncrement:true,

        primaryKey:true

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

    DataCriacao:{

        type:DataTypes.DATE,

        defaultValue:DataTypes.NOW

    }

},{
    timestamps:false
});

module.exports=ReservaEquipamento;
