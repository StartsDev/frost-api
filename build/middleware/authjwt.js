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
exports.isSuperUser = exports.isSuperUser_isAdmin = exports.verifyToken = void 0;
const jwt = require("jsonwebtoken");
const user_services_1 = require("../services/user.services");
require("dotenv").config();
const secretKey = process.env.SECRET_JWT;
const super_user = process.env.SUPER_USER;
const admin = process.env.ADMIN;
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Obtener token del encabezado de autorización
        const tokenArray = req.headers["x-token"] || req.headers.authorization;
        //Verificamos si el token es asignado
        if (!tokenArray) {
            return res.status(403).json({ message: "No token delivered" });
        }
        // Verificamos y decodificamos el token
        jwt.verify(tokenArray, secretKey, (err, decoded) => {
            if (err) {
                return res.status(403).json({ mensaje: "Invalid Token" });
            }
            // Agregar los datos decodificados a la solicitud para que puedan ser utilizados en los controladores
            req.decoded = decoded;
            req.token = tokenArray;
            // Llama a la siguiente función del middleware
            next();
        });
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized", error });
    }
});
exports.verifyToken = verifyToken;
// Verificamos si el rol del usuario es Administrador o Super_Usuario
const isSuperUser_isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req.decoded) === null || _a === void 0 ? void 0 : _a.userId;
        const user = yield (0, user_services_1.getUserServ)(id);
        if (user.findUser.dataValues.Role.dataValues.role !== super_user &&
            user.findUser.dataValues.Role.dataValues.role !== admin)
            return res.status(401).json({
                message: "El rol de usuario no es super usuario o administrador",
            });
        next();
    }
    catch (error) {
        return res.status(401).json({ error });
    }
});
exports.isSuperUser_isAdmin = isSuperUser_isAdmin;
const isSuperUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const id = (_b = req.decoded) === null || _b === void 0 ? void 0 : _b.userId;
        const user = yield (0, user_services_1.getUserServ)(id);
        if (user.findUser.dataValues.Role.dataValues.role !== super_user)
            return res
                .status(401)
                .json({ message: "El rol de usuario no es super usuario" });
        next();
    }
    catch (error) {
        return res.status(401).json({ error });
    }
});
exports.isSuperUser = isSuperUser;
