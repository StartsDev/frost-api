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
exports.createNewPasswords = exports.forgotPasswordsServ = exports.createPwdServ = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = require('jsonwebtoken');
const Password = require("../models/password");
const User = require("../models/user");
const Identification = require("../models/identification");
const path = require('path');
const hbs = require('nodemailer-express-handlebars');
const transporter = require('../mailer/mailer');
require('dotenv').config();
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
const forgotPasswordsServ = (email, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email) {
        return {
            message: res.status(400).send({ msg: "Email incorrecto" })
        };
    }
    let verificationLink;
    let emailStatus = 'Ok';
    let user;
    try {
        user = yield User.findOne({ email });
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET_RESET, {
            expiresIn: '1h'
        });
        verificationLink = `${process.env.FRONTEND_URL_LOCAL}/auth/new-password/${token}`;
        user.resetToken = token;
        user.save();
    }
    catch (error) {
        return {
            message: "User not found",
        };
    }
    try {
        // send mail with defined transport object
        // Handlebars templates
        const handlebarOptions = {
            viewEngine: {
                extName: ".handlebars",
                partialsDir: path.resolve('./views'),
                defaultLayout: false,
            },
            viewPath: path.resolve('./views'),
            extName: ".handlebars",
        };
        transporter.use('compile', hbs(handlebarOptions));
        yield transporter.sendMail({
            from: `'"Admon Aires 👻" <${process.env.EMAIL_ACCOUNT}>'`,
            to: user.email,
            subject: "Notificación cambio de contraseña ✔",
            /*  html: `<b>Por favor da click en este enlace o pegalo en tu navegador para completar el proceso:</b>
             <a href="${verificationLink}">${verificationLink}</a>`, // html body */
            template: 'email',
            context: {
                title: 'Notificación cambio de contraseña',
                text: 'Por favor da click en este enlace o pegalo en tu navegador para completar el proceso:',
                verificationLink: verificationLink,
                textFoot: 'Por favor comunicarse con soporte de Aires si tiene algun problema'
            }
        });
    }
    catch (error) {
        return {
            message: "El email no pudo ser enviado",
        };
    }
    return {
        status: emailStatus,
        message: "Verifica tu correo para un link de reseteo de tu password"
    };
});
exports.forgotPasswordsServ = forgotPasswordsServ;
const createNewPasswords = (data, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newPassword } = data.body;
    const resetToken = data.headers['reset'];
    if (!resetToken && newPassword) {
        return {
            status: res.status(400),
            message: "Todos los campos son requeridos"
        };
    }
    // Password validation
    if (newPassword.length < 8) {
        return {
            status: res.status(400),
            msg: "Por favor ingresa un password de maximo 8 carateres",
        };
    }
    let user;
    let jwtPayload;
    let pwdEncrypt;
    try {
        jwtPayload = jwt.verify(resetToken, process.env.JWT_SECRET_RESET);
        user = yield User.findOne({ email: jwtPayload.email });
    }
    catch (error) {
        return {
            status: res.status(400),
            message: error
        };
    }
    pwdEncrypt = bcrypt_1.default.hashSync(newPassword, 10);
    user.password = pwdEncrypt;
    try {
        yield user.save();
    }
    catch (error) {
        return {
            message: error
        };
    }
    return {
        message: "Su password se ha cambiado correctamente"
    };
});
exports.createNewPasswords = createNewPasswords;
