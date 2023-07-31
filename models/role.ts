'use strict';
const {sequelize, DataTypes} = require ('../database/index')
import { Model, UUIDV4 } from "sequelize";
import { RoleAttributes } from "../interfaces/role.interface";


  class Role extends Model<RoleAttributes> implements RoleAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!:string;
    role!:string;
    static associate(models:any) {
      // define association here

      Role.hasMany(models.User, {
        foreignKey: 'roleId',
        as: 'users',
      });
      
      models.User.belongsTo(Role, {
        foreignKey: 'roleId',
      });

    }
  }
  Role.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Role',
  });


module.exports = Role
