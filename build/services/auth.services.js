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
exports.loginUserServ = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Password = require('../models/password');
const User = require('../models/user');
require("dotenv").config();
const secretKey = process.env.SECRET_JWT;
const registerUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findUser = yield User.findOne({ where: { email: user.email } });
        if (findUser) {
            return {
                msg: "This user already exists",
            };
        }
        const newUser = yield User.create(user);
        if (newUser === null) {
            return {
                msg: "Failed to register user",
            };
        }
        //enviar email para verificacion de cuenta con Nodemailer y Handlebars
        return {
            msg: "User created successfully. Please, verify your email to activate your account.",
            user: newUser,
        };
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
        });
        if (!foundUser) {
            return {
                msg: "User not found...",
            };
        }
        const foundPassword = yield Password.findOne({
            where: { userId: foundUser.id },
        });
        if (!foundPassword) {
            return {
                msg: "Password not registered to this user...",
            };
        }
        const isPasswordMatch = yield bcrypt_1.default.compare(user.password, foundPassword.dataValues.password);
        if (!isPasswordMatch) {
            return {
                msg: "Authentication failed. Incorrect password.",
            };
        }
        const token = jsonwebtoken_1.default.sign({
            userId: foundUser.id,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            email: foundUser.email,
        }, secretKey, {
            expiresIn: "1h",
        });
        return {
            msg: "User logged succesfully...",
            token,
        };
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.loginUserServ = loginUserServ;
