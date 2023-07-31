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
exports.deleteUser = exports.editUser = exports.getUsersRol = exports.getUser = exports.getUsers = void 0;
const user_services_1 = require("../services/user.services");
// Get all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_services_1.allUsers)();
        res.status(200).json(users);
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            msg: "Error"
        });
    }
});
exports.getUsers = getUsers;
// Get user by id
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_services_1.getUserServ)(req.params.id);
        res.status(200).json(user);
    }
    catch (e) {
        console.log(e);
    }
});
exports.getUser = getUser;
// Get users by role
const getUsersRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_services_1.allUserRolServ)(req.params.rolId);
        res.status(200).json(users);
    }
    catch (e) {
        console.log(e);
    }
});
exports.getUsersRol = getUsersRol;
// Update user
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_services_1.updateUserServ)(req.params.id, req.body);
        res.status(200).json(user);
    }
    catch (e) {
        console.log(e);
    }
});
exports.editUser = editUser;
// Delete user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_services_1.deleteUserServ)(req.params.id);
        res.status(200).json(user);
    }
    catch (e) {
        console.log(e);
    }
});
exports.deleteUser = deleteUser;
