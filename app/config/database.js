const {Sequelize} = require('sequelize');

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

db.sync();

module.exports = db;