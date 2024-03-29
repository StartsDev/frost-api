"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const fs = require("fs");
// const path = require("path");
// const Sequelize = require("sequelize");
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../config/config.js")[env];
// const db:any = {};
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { DB_USER, DB_NAME, DB_PASS, DB_HOST, DATABASE_URL } = process.env;
const { Sequelize, DataTypes, Op } = require('sequelize');
// let sequelize: any;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }
//para uso con variable de entorno locales y por ambiente
// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//   // esta configuraion es por si es requerido por webserver desplegado, local no es necesario
//   // dialectOptions:{
//   //   ssl: {
//   //     require : true,
//   //     rejectUnauthorized: false
//   //   }
//   // }
// });
//para uso desplegado
const sequelize = new Sequelize(DATABASE_URL, {
    logging: false,
    native: false,
    // esta configuraion es por si es requerido por webserver desplegado, local no es necesario
    dialectOptions: {
        ssl: {
            require: false,
            rejectUnauthorized: false
        }
    }
});
// fs.readdirSync(__dirname)
//   .filter((file: string) => {
//     return (
//       file.indexOf(".") !== 0 &&
//       file !== basename &&
//       file.slice(-3) === ".ts" &&
//       file.indexOf(".test.ts") === -1
//     );
//   })
//   .forEach((file: any) => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     );
//     db[model.name] = model;
//   });
// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     console.log(`${modelName} model conectado`);
//     db[modelName].associate(db);
//   }
// });
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;
// console.log(db);
sequelize.authenticate()
    .then(() => console.log('Postgres database connected'))
    .catch((error) => console.log('Something goes wrong ' + error.message));
module.exports = { sequelize, DataTypes, Op };
