const Usuario = require('./usuario.model');
const Laboratorio = require('./laboratorio.model');
const Equipamento = require('./equipamento.model');

const ReservaLaboratorio =
require('./reservaLaboratorio.model');

const ReservaEquipamento =
require('./reservaEquipamento.model');

const Relatorio =
require('./relatorio.model');

/* ======================
   LABORATÓRIOS
====================== */

Usuario.hasMany(
    ReservaLaboratorio,
    {
        foreignKey: 'IdUser'
    }
);

ReservaLaboratorio.belongsTo(
    Usuario,
    {
        foreignKey: 'IdUser'
    }
);

Laboratorio.hasMany(
    ReservaLaboratorio,
    {
        foreignKey: 'IdLab'
    }
);

ReservaLaboratorio.belongsTo(
    Laboratorio,
    {
        foreignKey: 'IdLab'
    }
);

/* ======================
   EQUIPAMENTOS
====================== */

Usuario.hasMany(
    ReservaEquipamento,
    {
        foreignKey: 'IdUser'
    }
);

ReservaEquipamento.belongsTo(
    Usuario,
    {
        foreignKey: 'IdUser'
    }
);

Equipamento.hasMany(
    ReservaEquipamento,
    {
        foreignKey: 'IdEquip'
    }
);

ReservaEquipamento.belongsTo(
    Equipamento,
    {
        foreignKey: 'IdEquip'
    }
);

module.exports = {

    Usuario,

    Laboratorio,

    Equipamento,

    ReservaLaboratorio,

    ReservaEquipamento,

    Relatorio
};
