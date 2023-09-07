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
Object.defineProperty(exports, "__esModule", { value: true });
exports.newPassword = exports.VerifyRToken = exports.forgotPassword = exports.createPassword = void 0;
const password_services_1 = require("../services/password.services");
//Register new role
const createPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const password = yield (0, password_services_1.createPwdServ)(req.body);
        res.status(200).json(password);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
});
exports.createPassword = createPassword;
//Update password notification email
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const password = yield (0, password_services_1.forgotPasswordsServ)(email);
        res.status(200).json(password);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
});
exports.forgotPassword = forgotPassword;
//Verify reset token
const VerifyRToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        const verifyToken = yield (0, password_services_1.verifyResetToken)(token);
        res.status(200).json(verifyToken);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
});
exports.VerifyRToken = VerifyRToken;
//Create new password password
const newPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.body;
        const tokenArray = req.headers["reset-token"] || req.headers.authorization;
        const updatedPassword = yield (0, password_services_1.createNewPasswordServ)(tokenArray, password);
        res.status(200).json(updatedPassword);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
});
exports.newPassword = newPassword;
