"use strict";
import { Model, UUIDV4 } from "sequelize";
//const UserPermissions = require("../models/permission");
import { PermissionsAttributes } from "../interfaces/permissions.interface";
const { sequelize, DataTypes } = require("../database/index");

//module.exports = (sequelize: any, DataTypes: any) => {
class Permission
  extends Model<PermissionsAttributes>
  implements PermissionsAttributes
{
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  id!: string;
  permission!: string;

  static associate(userpermissions: any) {
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
Permission.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    permission: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Permission",
    freezeTableName: true,
  }
);

// aqui estoy ejecutando las relaciones
//Permission.associate(UserPermissions);

module.exports = Permission;
