const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Permanencia extends Model {}

Permanencia.init({
    doctor:{
        type: DataTypes.STRING,
        allowNull: false
    },
    from: {
        type: DataTypes.DATE,
        allowNull: false
    },
    to: {
        type: DataTypes.DATE,
        allowNull: false
    },
    hours: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    location:{
        type: DataTypes.STRING,
        allowNull: false
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false
    },
    
},{
    sequelize,
    modelName: 'Permanencia'
});

module.exports = Permanencia;

