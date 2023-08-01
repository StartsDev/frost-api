"use strict";
const { sequelize, DataTypes } = require("../database/index");
import { Model, UUIDV4 } from "sequelize";
const User = require("../models/user")
import { RoleAttributes } from "../interfaces/role.interface";

class Role extends Model<RoleAttributes> implements RoleAttributes {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  id!: string;
  role!: string;
  static associate(user: any) {
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
Role.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Role",
    freezeTableName: true,
  }
);

//Execute realtions
Role.associate(User);

module.exports = Role;
