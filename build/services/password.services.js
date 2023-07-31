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
exports.createPwdServ = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Password = require('../models/password');
const User = require('../models/user');
const saltRounds = 10; // Number of salt rounds for bcrypt
const createPwdServ = (pwd) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //console.log(pwd)
        const findUser = yield User.findOne({ where: { id: pwd.userId } });
        if (!findUser) {
            return {
                msg: "This user has not registered before",
            };
        }
        console.log(findUser);
        console.log(pwd.userId);
        const findPasword = yield Password.findOne({ where: { userId: pwd.userId } });
        if (findPasword) {
            return {
                msg: "This user has a password asigned currently",
            };
        }
        // Generate a salt and hash the password
        const salt = yield bcrypt_1.default.genSalt(saltRounds);
        const hashedPassword = yield bcrypt_1.default.hash(pwd.password, salt);
        const newPassword = yield Password.create({
            password: hashedPassword,
            userId: pwd.userId,
        });
        if (newPassword === null) {
            return {
                msg: "Failed to register password",
            };
        }
        return {
            msg: "Password asigned successfully...",
        };
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.createPwdServ = createPwdServ;
