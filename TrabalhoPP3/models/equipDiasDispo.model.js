const {DataTypes}=require("sequelize");
const sequelize=require("../config/database");

const EquipDiasDispo=sequelize.define("Equip_DiasDispo",{

    IdEquip:{

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

module.exports=EquipDiasDispo;
