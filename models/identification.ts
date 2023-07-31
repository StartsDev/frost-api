'use strict';
import { Model, UUIDV4 } from "sequelize";
import { IdentificationAttributes } from "../interfaces/identification.interface";

module.exports = (sequelize:any, DataTypes:any) => {
  class Identification extends Model<IdentificationAttributes> implements IdentificationAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!:string;
    name!:string;
    static associate(models:any) {
      // define association here
      Identification.hasMany(models.User, {
        foreignKey: 'identId',
        as: 'users',
      });
      
      models.User.belongsTo(Identification, {
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
  });
  return Identification;
};