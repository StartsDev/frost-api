'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Identification extends sequelize_1.Model {
        static associate(models) {
            // define association here
            Identification.hasMany(models.User, {
                foreignKey: 'IdentId',
                as: 'users',
            });
            models.User.belongsTo(Identification, {
                foreignKey: 'IdentId',
            });
        }
    }
    Identification.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Identification',
    });
    return Identification;
};
