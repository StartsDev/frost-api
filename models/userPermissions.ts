"use strict";
import { Model, UUIDV4 } from "sequelize";
import { UserPermissionsAttributes } from "../interfaces/userPermissions.interface";
const {sequelize, DataTypes} = require ('../database/index')

//module.exports = (sequelize: any, DataTypes: any) => {
  class UserPermissions extends Model<UserPermissionsAttributes> {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    isWrite!: boolean;
    isRead!: boolean;

    static associate(models: any) {
      // define association here
    }
  }
  UserPermissions.init(
    {
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
    }
  );
  //return UserPermissions;
//};

module.exports = UserPermissions
