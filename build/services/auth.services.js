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
const Password = require("../models/password");
const User = require("../models/user");
const Role = require("../models/role");
const Identification = require("../models/identification");
const { configParams } = require('../config');
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
            const newUser = yield User.create(user);
            return {
                msg: "Usuario creado satisfacotriamente. Por favor verificar su email",
                newUser,
                success: true
            };
            //enviar email para verificacion de cuenta con Nodemailer y Handlebars
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
            email: foundUser.email,
        }, configParams.SECRET_JWT, {
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
