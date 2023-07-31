'use strict';
import { Model, UUIDV4 } from "sequelize";
import { PasswordAttributes } from "../interfaces/password.interface";

module.exports = (sequelize:any, DataTypes:any) => {
  class Password extends Model<PasswordAttributes> implements PasswordAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    password!:string
    static associate(models:any) {
      // define association here
    }
  }
  Password.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  }, {
    sequelize,
    modelName: 'Password',
  });
  return Password;
};