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
exports.getAllTech = exports.deleteUser = exports.editUser = exports.getUsersRol = exports.getUser = exports.getUsers = void 0;
const user_services_1 = require("../services/user.services");
// Get all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || undefined; // Get the requested page from query parameter
        const pageSize = parseInt(req.query.pageSize) || undefined; // Get the requested page size from query parameter
        const { users, totalCount } = yield (0, user_services_1.allUsers)(page, pageSize);
        if (!page && !pageSize) {
            res.status(200).json({
                users,
                numItmes: totalCount,
            });
        }
        else {
            const totalPages = Math.ceil(totalCount / (pageSize !== null && pageSize !== void 0 ? pageSize : totalCount));
            res.status(200).json({
                users,
                numItmes: totalCount,
                currentPage: page,
                totalPages,
            });
        }
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
        res.status(400).json({
            msg: "Error",
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
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
});
exports.getUser = getUser;
// Get users by role
const getUsersRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || undefined; // Get the requested page from query parameter
        const pageSize = parseInt(req.query.pageSize) || undefined; // Get the requested page size from query parameter
        const { usersRol, totalCount } = yield (0, user_services_1.allUserRolServ)(req.params.rolId, page, pageSize);
        if (!page && !pageSize) {
            res.status(200).json({
                usersRol,
                numItmes: totalCount,
            });
        }
        else {
            const totalPages = Math.ceil(totalCount / (pageSize !== null && pageSize !== void 0 ? pageSize : totalCount));
            res.status(200).json({
                usersRol,
                totalItems: totalCount,
                currentPage: page,
                totalPages,
            });
        }
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
});
exports.getUsersRol = getUsersRol;
// Update user
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_services_1.updateUserServ)(req.params.id, req.body);
        res.status(200).json(user);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
});
exports.editUser = editUser;
// Delete user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_services_1.deleteUserServ)(req.params.id);
        res.status(200).json(user);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
});
exports.deleteUser = deleteUser;
//Get all tech
const getAllTech = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || undefined; // Get the requested page from query parameter
        const pageSize = parseInt(req.query.pageSize) || undefined; // Get the requested page size from query parameter
        const { users, totalCount } = yield (0, user_services_1.allTechServ)(page, pageSize);
        if (!page && !pageSize) {
            res.status(200).json({
                users,
                numItmes: totalCount,
            });
        }
        else {
            const totalPages = Math.ceil(totalCount / (pageSize !== null && pageSize !== void 0 ? pageSize : totalCount));
            res.status(200).json({
                users,
                numItmes: totalCount,
                currentPage: page,
                totalPages,
            });
        }
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
        res.status(400).json({
            msg: "Error",
        });
    }
});
exports.getAllTech = getAllTech;
