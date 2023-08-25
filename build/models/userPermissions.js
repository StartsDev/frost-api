"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Permission = require('../models/permission');
const { sequelize, DataTypes } = require('../database/index');
class UserPermissions extends sequelize_1.Model {
    static associate(permissions) {
        // define association here
        permissions.hasMany(UserPermissions, {
            foreignKey: "permissionId",
            as: "userspermissions",
        });
        UserPermissions.belongsTo(permissions, {
            foreignKey: "permissionId",
        });
    }
}
UserPermissions.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: sequelize_1.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isWrite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: "UserPermissions",
    freezeTableName: true,
});
// aqui estoy ejecutando las relaciones
UserPermissions.associate(Permission);
module.exports = UserPermissions;
