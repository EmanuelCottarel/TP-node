const {DataTypes} = require('sequelize');
const db = require('../config/database');
const Bar = require('./bar');
const Order = require('./Order');

const Beer = db.define('Beer', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    degree: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
})

Beer.belongsToMany(Bar, {through: 'BeerBar'});
Bar.belongsToMany(Beer, {through: 'BeerBar'});

Beer.belongsToMany(Order, {through: 'BeerOrder'});
Order.belongsToMany(Beer, {through: 'BeerOrder'});


module.exports = Beer;