"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { sequelize, DataTypes } = require("../database/index");
//module.exports = (sequelize: any, DataTypes: any) => {
class Permission extends sequelize_1.Model {
    static associate(userpermissions) {
        // define association here
        // Permission - User
        /*    Permission.hasMany(userpermissions, {
             foreignKey: "permissionId",
             as: "userspermissions",
           });
       
           userpermissions.belongsTo(Permission, {
             foreignKey: "permissionId",
           }); */
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
    freezeTableName: true,
});
// aqui estoy ejecutando las relaciones
//Permission.associate(UserPermissions);
module.exports = Permission;
