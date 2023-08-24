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
exports.deleteUserServ = exports.updateUserServ = exports.allUserRolServ = exports.getUserServ = exports.allUsers = void 0;
const users_1 = require("./../seeders/users");
const User = require("../models/user");
const Identification = require("../models/identification");
const Role = require("../models/role");
const allUsers = (page, pageSize) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let users;
        if (page && pageSize) {
            const offset = (page - 1) * pageSize;
            users = yield User.findAll({
                offset,
                limit: pageSize,
                where: { status: false },
                attributes: { exclude: ["updatedAt"] },
                order: [["createdAt", "DESC"]],
                include: [
                    {
                        model: Identification,
                        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
                    },
                    {
                        model: Role,
                        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
                    },
                ],
            });
            if (!users) {
                return {
                    msg: "No existen usuarios registrados...",
                    users,
                    success: false,
                };
            }
            const totalCount = yield User.count({ where: { status: false } });
            return {
                users,
                totalCount,
                success: true,
            };
        }
        else {
            users = yield User.findAll({
                where: { status: false },
                attributes: { exclude: ["updatedAt"] },
                order: [["createdAt", "DESC"]],
                include: [
                    {
                        model: Identification,
                        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
                    },
                    {
                        model: Role,
                        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
                    },
                ],
            });
            if (!users) {
                return {
                    msg: "No existen usuarios registrados...",
                    users,
                    success: false,
                };
            }
            const totalCount = yield User.count({ where: { status: false } });
            return {
                users,
                totalCount,
                success: true,
            };
        }
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.allUsers = allUsers;
const getUserServ = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findUser = yield User.findOne({
            where: { id: user },
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
                {
                    model: Identification,
                    attributes: { exclude: ["id", "createdAt", "updatedAt"] },
                },
                {
                    model: Role,
                    attributes: { exclude: ["id", "createdAt", "updatedAt"] },
                },
            ],
        });
        if (!user) {
            return {
                msg: "Este usuario no existe...",
                success: false,
            };
        }
        return {
            findUser,
            success: true,
        };
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.getUserServ = getUserServ;
const allUserRolServ = (user, page, pageSize) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let usersRol;
        if (page && pageSize) {
            const offset = (page - 1) * pageSize;
            usersRol = yield User.findAll({
                offset,
                limit: pageSize,
                where: { roleId: user },
                attributes: { exclude: ["updatedAt"] },
                order: [["createdAt", "DESC"]],
                include: [
                    {
                        model: Identification,
                        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
                    },
                    {
                        model: Role,
                        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
                    },
                ],
            });
            if (!usersRol) {
                return {
                    msg: "No existen usuarios con este rol...",
                    users: users_1.users,
                    success: false,
                };
            }
            const totalCount = yield User.count({
                where: { status: false, roleId: user },
            });
            return {
                usersRol,
                totalCount,
                success: true,
            };
        }
        else {
            usersRol = yield User.findAll({
                where: { roleId: user },
                attributes: { exclude: ["updatedAt"] },
                order: [["createdAt", "DESC"]],
                include: [
                    {
                        model: Identification,
                        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
                    },
                    {
                        model: Role,
                        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
                    },
                ],
            });
            if (!usersRol) {
                return {
                    msg: "No existen usuarios con este rol...",
                    users: users_1.users,
                    success: false,
                };
            }
            const totalCount = yield User.count({
                where: { status: false, roleId: user },
            });
            return {
                usersRol,
                totalCount,
                success: true,
            };
        }
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.allUserRolServ = allUserRolServ;
const updateUserServ = (id, userp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { numIdent, firstName, lastName, email, phone, identId, roleId } = userp;
        const [updateUser] = yield User.update({ numIdent, firstName, lastName, email, phone, identId, roleId }, {
            where: {
                id,
            },
            returning: true,
        });
        if (!updateUser) {
            return {
                msg: "Usuario no válido...",
                success: false,
            };
        }
        if (updateUser <= 0) {
            return {
                msg: "Actualización no realizada...",
                success: false,
            };
        }
        const user = yield User.findOne({ where: { id } });
        return {
            msg: "Usuario actualizado satisfactoriamente...",
            user,
            success: true,
        };
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.updateUserServ = updateUserServ;
const deleteUserServ = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findUser = yield User.findOne({ where: { id } });
        if (findUser.status) {
            return {
                msg: "User no válido...",
                success: false,
            };
        }
        const deletedUser = yield User.update({ status: true }, {
            where: {
                id,
            },
        });
        if (!deletedUser) {
            return {
                msg: "User no válido...",
                success: false,
            };
        }
        return {
            msg: "Usuario eliminado satisfactoriamente...",
            success: true,
        };
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.deleteUserServ = deleteUserServ;
