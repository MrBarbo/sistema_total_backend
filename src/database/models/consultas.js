const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');
const Medication = require('./medicacionesrec');

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
    company: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Consultas'
});

// Define associations
Consultas.hasMany(Medication, {
    foreignKey: 'consultaId',
    onDelete: 'CASCADE'
});

// Define associations
Medication.belongsTo(Consultas, {
    foreignKey: 'consultaId',
    onDelete: 'CASCADE'
});

module.exports = Consultas;
