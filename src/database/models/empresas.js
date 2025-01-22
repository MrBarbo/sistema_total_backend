
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Empresas extends Model {}
Empresas.init({
    name:{
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Empresas'
})