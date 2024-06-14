const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');
const Consultas = require('./consultas'); 

class Medication extends Model {}

Medication.init({
    medicationName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    drug: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    consultaId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Consultas', // 'Consultas' refers to table name
            key: 'id',
        },
        onDelete: 'CASCADE'
    }
}, {
    sequelize,
    modelName: 'Medication'
});



module.exports = Medication;
