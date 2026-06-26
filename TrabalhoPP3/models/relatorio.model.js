const {DataTypes}=require("sequelize");
const sequelize=require("../config/database");

const Relatorio=sequelize.define("Relatorio",{

    IdRelatorio:{

        type:DataTypes.INTEGER,

        autoIncrement:true,

        primaryKey:true

    },

    DataGeracao:{

        type:DataTypes.DATE,

        defaultValue:DataTypes.NOW

    },

    Descricao:{

        type:DataTypes.TEXT

    }

},{
    timestamps:false
});

module.exports=Relatorio;
