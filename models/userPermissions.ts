"use strict";
import { Model, UUIDV4 } from "sequelize";
const Permission = require('../models/permission');
import { UserPermissionsAttributes } from "../interfaces/userPermissions.interface";
const {sequelize, DataTypes} = require ('../database/index')

  class UserPermissions extends Model<UserPermissionsAttributes> {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!:string
    isWrite!: boolean;
    isRead!: boolean;

    static associate(permissions: any) {
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
  UserPermissions.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
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
    },
    {
      sequelize,
      modelName: "UserPermissions",
      freezeTableName: true,
    }
  );

  // aqui estoy ejecutando las relaciones
  UserPermissions.associate(Permission);

module.exports = UserPermissions
