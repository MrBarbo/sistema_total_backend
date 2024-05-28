const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Consultas extends Model {}

Consultas.init({
    patientName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    pathology: {
        type: DataTypes.STRING,
        allowNull: false
    },
    observations: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    medicationName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    drug: {
        type: DataTypes.STRING,
        allowNull: false
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Consultas'
});

module.exports = Consultas;
