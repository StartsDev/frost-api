"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkCreateUser = exports.getUserServ = exports.loginUserServ = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { Op } = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
const bulkCreate_1 = require("../utils/bulkCreate");
//import path from "path";
const hbs = require("nodemailer-express-handlebars");
const transporter = require("../mailer/mailer");
const Password = require("../models/password");
const User = require("../models/user");
const Role = require("../models/role");
const Identification = require("../models/identification");
require("dotenv").config();
const secretKey = process.env.SECRET_JWT;
const registerUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findUser = yield User.findOne({ where: { numIdent: user.numIdent } });
        if (findUser) {
            if (findUser.status) {
                yield User.update({ status: false }, {
                    where: {
                        numIdent: findUser.numIdent,
                    },
                });
                return {
                    msg: "Usuario creado satisfactoriamente. Por favor verificar su correo...",
                    success: true
                };
                // Notification email
            }
            else {
                return {
                    msg: "Este usuario ya esta registrado...",
                    success: false
                };
            }
        }
        else {
            const userEmail = yield User.findOne({
                where: { email: user.email }
            });
            if (userEmail) {
                return {
                    msg: "Ya existe un susuario registrado con este email...",
                    success: false
                };
            }
            const foundIdentId = yield Identification.findOne({ where: { id: user.identId } });
            if (!foundIdentId) {
                return {
                    msg: "Tipo de identificación no existe...",
                    success: false
                };
            }
            const foundRolId = yield Role.findOne({ where: { id: user.roleId } });
            if (!foundRolId) {
                return {
                    msg: "Tipo de rol no existe...",
                    success: false
                };
            }
            const newUser = yield User.create(user);
            /*  // Notification by email
             const handlebarOptions = {
               viewEngine: {
                 extName: ".handlebars",
                 partialsDir: path.resolve("./views"),
                 defaultLayout: false,
               },
               viewPath: path.resolve("./views"),
               extName: ".handlebars",
             };
         
             transporter.use("compile", hbs(handlebarOptions));
         
             const notification = await transporter.sendMail({
               from: `'"Admon Aires S.A.S 👻" <${process.env.EMAIL_ACCOUNT}>'`, // sender address
               to: user.email, // list of receivers
               subject: "Notificación registro de usuarios Aires S.A.S ✔", // Subject line
               template: "newUser",
               context: {
                 title: "Bienvenido a Aires S.A.S",
                 text: `${user.firstName} ${user.lastName} ya hace parte del sistema Aires S.A.S, para poder ingresar a la plataforma debe solicitar la asignación de su contraseña.`,
                 textFoot:
                   "Por favor comunicarse con soporte de Aires S.A.S si tiene algun problema...",
               },
             });
             if (!notification) {
               return {
                 msg: "La notificación no pudo ser enviada...",
                 success: false,
               };
             } */
            return {
                //msg: "Usuario creado satisfactoriamente. Por favor verificar su email",
                msg: "Usuario creado satisfactoriamente",
                newUser,
                success: true
            };
        }
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.registerUser = registerUser;
const loginUserServ = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundUser = yield User.findOne({
            where: { numIdent: user.numIdent },
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
                {
                    model: Identification,
                    attributes: { exclude: ["id", "createdAt", "updatedAt"] },
                },
                {
                    model: Role,
                    attributes: { exclude: ["id", "createdAt", "updatedAt"] },
                },
            ],
        });
        if (!foundUser) {
            return {
                msg: "Usuario no encontrado...",
                success: false
            };
        }
        const foundPassword = yield Password.findOne({
            where: { userId: foundUser.id },
        });
        if (!foundPassword) {
            return {
                msg: "El password no ha sido asignado a este usuario...",
                success: false
            };
        }
        const isPasswordMatch = yield bcrypt_1.default.compare(user.password, foundPassword.dataValues.password);
        if (!isPasswordMatch) {
            return {
                msg: "Clave incorrecta...",
                success: false
            };
        }
        const token = jsonwebtoken_1.default.sign({
            userId: foundUser.id,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            numIdent: foundUser.numIdent,
            email: foundUser.email,
        }, secretKey, {
            expiresIn: "30d",
        });
        return {
            msg: "Usuario logueado satisfactoriamente...",
            token,
            user: foundUser,
            success: true
        };
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.loginUserServ = loginUserServ;
const getUserServ = (user, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findUser = yield User.findOne({
            where: { id: user.userId },
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
                {
                    model: Identification,
                    attributes: { exclude: ["id", "createdAt", "updatedAt"] },
                },
                {
                    model: Role,
                    attributes: { exclude: ["id", "createdAt", "updatedAt"] },
                },
            ],
        });
        if (!user) {
            return {
                msg: "Este usuario no existe",
                success: false
            };
        }
        return {
            user: findUser,
            token,
            succes: true
        };
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.getUserServ = getUserServ;
const bulkCreateUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, bulkCreate_1.bulkCreatefunction)(User, data);
        return 'Usuarios Creados';
    }
    catch (error) {
        console.log(error);
        return {
            message: 'hubo un error en la creacion',
            success: false,
        };
    }
});
exports.bulkCreateUser = bulkCreateUser;
