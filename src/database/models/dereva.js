// models/Derivacion.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Derivacion extends Model {}

Derivacion.init({
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  direction: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patientName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pathology: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pendiente', // default value
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'Derivacion',
});

module.exports = Derivacion;
