"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { sequelize, DataTypes } = require("../database/index");
const sequelize_1 = require("sequelize");
const User = require("../models/user");
class Role extends sequelize_1.Model {
    static associate(user) {
        // define association here
        Role.hasMany(user, {
            foreignKey: "roleId",
            as: "users",
        });
        user.belongsTo(Role, {
            foreignKey: "roleId",
        });
    }
}
Role.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: sequelize_1.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "Role",
    freezeTableName: true,
});
//Execute realtions
Role.associate(User);
module.exports = Role;
