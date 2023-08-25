'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const User = require("../models/user");
const { sequelize, DataTypes } = require('../database/index');
//module.exports = (sequelize:any, DataTypes:any) => {
class Identification extends sequelize_1.Model {
    static associate(user) {
        // define association here
        Identification.hasMany(user, {
            foreignKey: 'identId',
            as: 'users',
        });
        user.belongsTo(Identification, {
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
    freezeTableName: true,
});
//Execute realtions
Identification.associate(User);
module.exports = Identification;
