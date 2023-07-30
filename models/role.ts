'use strict';
const {sequelize, DataTypes} = require ('../database/index')
import { Model, UUIDV4 } from "sequelize";
import { RoleAttributes } from "../interfaces/role.interface";

// module.exports = (sequelize:any, DataTypes:any) => {
  class Role extends Model<RoleAttributes> implements RoleAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!:string;
    description!:string;
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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  // return Role;
// };

module.exports = Role
