"use strict";
import { Model, UUIDV4 } from "sequelize";
import { PermissionsAttributes } from "../interfaces/permissions.interface";

module.exports = (sequelize: any, DataTypes: any) => {
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

    static associate(models: any) {
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
    }
  );
  return Permission;
};
