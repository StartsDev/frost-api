'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { sequelize, DataTypes } = require('../database/index');
//module.exports = (sequelize:any, DataTypes:any) => {
class Identification extends sequelize_1.Model {
    static associate(models) {
        // define association here
        Identification.hasMany(models.User, {
            foreignKey: 'identId',
            as: 'users',
        });
        models.User.belongsTo(Identification, {
            foreignKey: 'identId',
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
//return Identification;
//};
module.exports = Identification;
