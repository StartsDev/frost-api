"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { sequelize, DataTypes } = require('../database/index');
//module.exports = (sequelize: any, DataTypes: any) => {
class Permission extends sequelize_1.Model {
    static associate(models) {
        // define association here
        // Permission - User
        Permission.hasMany(models.UserPermissions, {
            foreignKey: 'permissionId',
            as: 'userspermissions',
        });
        models.UserPermissions.belongsTo(Permission, {
            foreignKey: 'permissionId',
        });
    }
}
Permission.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: sequelize_1.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    permission: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "Permission",
});
//return Permission;
//};
module.exports = Permission;
