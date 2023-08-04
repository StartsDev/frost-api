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
const Password = require("../models/password");
const User = require("../models/user");
const Identification = require("../models/identification");
const saltRounds = 10; // Number of salt rounds for bcrypt
const createPwdServ = (pwd) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findUser = yield User.findOne({
            where: { numIdent: pwd.numIdent },
        });
        const findIdent = yield Identification.findOne({
            where: { id: pwd.identId },
        });
        if (!findUser) {
            return {
                msg: "User is unknown...",
            };
        }
        if (!findIdent) {
            return {
                msg: "Identification type is unknown...",
            };
        }
        const findPasword = yield Password.findOne({
            where: { userId: findUser.id },
        });
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
            userId: findUser.id,
        });
        if (newPassword === null) {
            return {
                msg: "Failed to register password",
            };
        }
        return {
            msg: "Password asigned successfully...",
            status: true
        };
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.createPwdServ = createPwdServ;
