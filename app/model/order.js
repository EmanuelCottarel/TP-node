const {DataTypes} = require('sequelize');
const db = require('../config/database');
const Bar = require("./bar");

const Order = db.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending'
    }
})

Bar.hasMany(Order, {
    foreignKey: 'bar_id',
});
Order.belongsTo(Bar, {
    foreignKey: 'bar_id',
});

module.exports = Order;