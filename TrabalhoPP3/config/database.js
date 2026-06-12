const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'ReservasLabs',
    'root',
    'senha',
    {
        host: 'localhost',
        dialect: 'mysql',

        logging: false,

        define: {
            freezeTableName: true
        },

        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

module.exports = sequelize;
