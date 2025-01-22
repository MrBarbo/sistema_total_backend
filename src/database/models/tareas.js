const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Task extends Model {}
Task.init({

    Tarea: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    Descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    Responsable: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    FechaDeInicio: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    FechaDeFin: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    Estatus: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    Sede: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: "Task"
});

module.exports = Task;
