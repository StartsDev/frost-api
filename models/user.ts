"use strict";
import { Model, UUIDV4 } from "sequelize";
import { UserAttributes } from "../interfaces/auth.interface";
const Password = require("../models/password");
const UserPermissions = require("../models/userPermissions");
const { sequelize, DataTypes } = require("../database/index");

class User extends Model<UserAttributes> implements UserAttributes {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  id!: string;
  numIdent!: string;
  firstName!: string;
  lastName!: string;
  userName!: string;
  image!: string;
  email!: string;
  phone!: string;
  status!: boolean;

  
  // Function to get the default status value
  public setDefaultStatus(): void {
    if (!this.userName) {
      this.userName = `${this.firstName}.${this.lastName}`;
    }
  }

  static associate(password: any, userPermissions: any) {
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
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
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
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
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
  },
  {
    sequelize,
    modelName: "User",
    freezeTableName: true,
  }
);

// aqui estoy ejecutando las relaciones
User.associate(Password, UserPermissions);

User.addHook("beforeValidate", (user: User) => {
  user.setDefaultStatus();
});

module.exports = User;
