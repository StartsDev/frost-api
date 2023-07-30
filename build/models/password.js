'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Password extends sequelize_1.Model {
        static associate(models) {
            // define association here
        }
    }
    Password.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        password: {
            type: DataTypes.STRING,
            defaultValue: null,
        }
    }, {
        sequelize,
        modelName: 'Password',
    });
    return Password;
};
