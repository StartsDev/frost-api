"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { sequelize, DataTypes } = require('../database/index');
//module.exports = (sequelize: any, DataTypes: any) => {
class UserPermissions extends sequelize_1.Model {
    static associate(models) {
        // define association here
    }
}
UserPermissions.init({
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
});
//return UserPermissions;
//};
module.exports = UserPermissions;
