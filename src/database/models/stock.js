const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Stock extends Model {}
Stock.init({
    Producto: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Producto cannot be null"
            },
            len: {
                args: [1, 50],
                msg: "Producto must be between 1 and 50 characters"
            }
        }
    },

    Droga: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Droga cannot be null"
            },
            len: {
                args: [1, 50],
                msg: "Droga must be between 1 and 50 characters"
            }
        }
    },

    Accion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Accion cannot be null"
            },
            len: {
                args: [1, 50],
                msg: "Accion must be between 1 and 50 characters"
            }
        }
    },

    Cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Cantidad cannot be null"
            },
            isInt: {
                args: true,
                msg: "Cantidad must be an integer"
            },
            min: {
                args: -1,
                msg: "Cantidad must be 0 or a positive integer"
            }
        }
    },

    Vencimiento: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Vencimiento cannot be null"
            },
            isDate: {
                args: true,
                msg: "Vencimiento must be a valid date"
            }
        }
    }
}, {
    sequelize,
    modelName: "Stock"
});

module.exports = Stock;
