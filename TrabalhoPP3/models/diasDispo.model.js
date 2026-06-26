const {DataTypes}=require("sequelize");
const sequelize=require("../config/database");

const DiasDispo=sequelize.define("DiasDispo",{

    IdDia:{

        type:DataTypes.INTEGER,

        primaryKey:true,

        autoIncrement:true

    },

    NomeDia:{

        type:DataTypes.STRING(3),

        unique:true

    }

},{
    timestamps:false
});

module.exports=DiasDispo;
