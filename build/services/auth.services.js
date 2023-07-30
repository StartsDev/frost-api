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
exports.loginUser = exports.registerUser = void 0;
const models_1 = __importDefault(require("../models"));
require("dotenv").config();
const registerUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findUser = yield models_1.default.User.findOne({ where: { email: user.email } });
        if (findUser) {
            return {
                msg: "This user already exists",
            };
        }
        const newUser = yield models_1.default.User.create(user);
        if (newUser === null) {
            return {
                msg: "Failed to register user",
            };
        }
        //enviar email para verificacion de cuenta con Nodemailer y Handlebars
        return {
            msg: "User created successfully. Please, verify your email to activate your account.",
            data: newUser,
        };
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.registerUser = registerUser;
const loginUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Type your code here...
        return {
            msg: "User logged",
        };
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.loginUser = loginUser;
