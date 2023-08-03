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
exports.getUserInfo = exports.loginUser = exports.createUser = void 0;
const auth_services_1 = require("../services/auth.services");
//Register new user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, auth_services_1.registerUser)(req.body);
        res.status(200).json(data);
    }
    catch (e) {
        console.log(e);
    }
});
exports.createUser = createUser;
//Login user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, auth_services_1.loginUserServ)(req.body);
        res.status(201).json(data);
    }
    catch (e) {
        console.log(e);
    }
});
exports.loginUser = loginUser;
//Get user info
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, auth_services_1.getUserServ)(req.decoded);
        res.status(201).json(data);
    }
    catch (e) {
        console.log(e);
    }
});
exports.getUserInfo = getUserInfo;
