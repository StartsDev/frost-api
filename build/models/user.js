"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Password = require("../models/password");
const UserPermissions = require("../models/userPermissions");
const { sequelize, DataTypes } = require("../database/index");
class User extends sequelize_1.Model {
    // Function to get the default status value
    setDefaultStatus() {
        if (!this.userName) {
            this.userName = `${this.firstName}.${this.lastName}`;
        }
    }
    static associate(password, userPermissions) {
        // Password
        User.hasOne(password, {
            foreignKey: "userId",
            as: "password",
        });
        password.belongsTo(User, {
            foreignKey: "userId",
        });
        // User - Permission
        User.hasMany(userPermissions, {
            foreignKey: "userId",
            as: "userspermissions",
        });
        userPermissions.belongsTo(User, {
            foreignKey: "userId",
        });
    }
}
User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: sequelize_1.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    numIdent: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: "User",
    freezeTableName: true,
});
// aqui estoy ejecutando las relaciones
User.associate(Password, UserPermissions);
User.addHook("beforeValidate", (user) => {
    user.setDefaultStatus();
});
module.exports = User;
