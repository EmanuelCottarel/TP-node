const {Sequelize} = require('sequelize');

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: console.log
});

db.sync({ alter: true });

module.exports = db;