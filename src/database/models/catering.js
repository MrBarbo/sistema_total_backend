const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Catering extends Model {}

Catering.init({
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    location:{
        type: DataTypes.STRING,
        allowNull: false
    },
    doctor:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'Catering'
});

module.exports = Catering;
