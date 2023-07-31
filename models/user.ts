'use strict';
import { Model, UUIDV4 } from "sequelize";
import { UserAttributes } from "../interfaces/auth.interface";
const {sequelize, DataTypes} = require ('../database/index')


// module.exports = (sequelize:any, DataTypes:any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!:string;
    numIdent!:string;
    firstName!:string;
    lastName!:string;
    userName!:string;
    email!:string;
    phone!:string;
    status!:boolean;

     // Function to get the default status value
     public setDefaultStatus(): void {
      if (!this.userName) {
        this.userName = `${this.firstName}.${this.lastName}`;
      }
    }

    static associate(models:any) {

      // Password
      User.hasOne(models.Password, {
        foreignKey: 'userId',
        as: 'password',
      }); 
      models.Password.belongsTo(User, {
        foreignKey: 'userId',
      });

      // User - Permission
      User.hasMany(models.UserPermissions, {
        foreignKey: 'userId',
        as: 'userspermissions',
      });
      
      models.UserPermissions.belongsTo(User, {
        foreignKey: 'userId',
      });
    }
  }
  User.init({
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
  User.addHook("beforeValidate", (user: User) => {
    user.setDefaultStatus();
  });
  // return User;
// };

module.exports = User
