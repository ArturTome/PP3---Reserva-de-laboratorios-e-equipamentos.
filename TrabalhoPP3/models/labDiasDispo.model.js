const {DataTypes}=require("sequelize");
const sequelize=require("../config/database");

const LabDiasDispo=sequelize.define("Lab_DiasDispo",{

    IdLab:{

        type:DataTypes.INTEGER,

        primaryKey:true

    },

    IdDia:{

        type:DataTypes.INTEGER,

        primaryKey:true

    }

},{
    timestamps:false
});

module.exports=LabDiasDispo;
