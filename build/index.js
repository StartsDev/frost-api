"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { sequelize } = require('./database/index');
const fileUpload = require('express-fileupload');
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const roleRoutes_1 = __importDefault(require("./routes/roleRoutes"));
const identificationRoutes_1 = __importDefault(require("./routes/identificationRoutes"));
const passwordRoutes_1 = __importDefault(require("./routes/passwordRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
// import { users } from "./seeders/users";
// Seeders Users
// const createUsers = () => {
//   users.forEach(function (user) {
//     db.User.create(user);
//   });
// };
// createUsers();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true
}));
app.use((0, morgan_1.default)("tiny"));
//User Routes
app.use("/api/v1/auth", authRoutes_1.default);
app.use("/api/v1/user", userRoutes_1.default);
app.use("/api/v1/role", roleRoutes_1.default);
app.use("/api/v1/identification", identificationRoutes_1.default);
app.use("/api/v1/password", passwordRoutes_1.default);
// Server listen port
// db.sequelize.sync({ force: true }).then(() => {
//   app.listen(port, () => {
//     console.log(`App listening on port ${port}`);
//   });
// });
app.listen(port, () => {
    console.log('Server run on Port =>  ' + port);
    sequelize.sync({ alter: true });
});
