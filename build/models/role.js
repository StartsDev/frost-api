'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const { sequelize, DataTypes } = require('../database/index');
const sequelize_1 = require("sequelize");
// module.exports = (sequelize:any, DataTypes:any) => {
class Role extends sequelize_1.Model {
    static associate(models) {
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
        defaultValue: sequelize_1.UUIDV4,
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
module.exports = Role;
