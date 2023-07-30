'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends sequelize_1.Model {
        // Function to get the default status value
        setDefaultStatus() {
            if (!this.userName) {
                this.userName = `${this.firstName}.${this.lastName}`;
            }
        }
        static associate(models) {
            // Password
            User.hasOne(models.Password, {
                foreignKey: 'userId',
                as: 'password',
            });
            models.Password.belongsTo(User, {
                foreignKey: 'userId',
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
        }
    }, {
        sequelize,
        modelName: 'User',
    });
    User.addHook("beforeValidate", (user) => {
        user.setDefaultStatus();
    });
    return User;
};
