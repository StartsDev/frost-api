'use strict';
import { Model, UUIDV4 } from "sequelize";
import { IdentificationAttributes } from "../interfaces/identification.interface";
const User = require("../models/user")
const {sequelize, DataTypes} = require ('../database/index')

//module.exports = (sequelize:any, DataTypes:any) => {
  class Identification extends Model<IdentificationAttributes> implements IdentificationAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!:string;
    name!:string;
    static associate(user:any) {
      // define association here
      Identification.hasMany(user, {
        foreignKey: 'identId',
        as: 'users',
      });
      
      user.belongsTo(Identification, {
        foreignKey: 'identId',
      });
    }
  }
  Identification.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Identification',
    freezeTableName: true,
  });

  //Execute realtions
  Identification.associate(User);

module.exports = Identification