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
exports.allTechServ = exports.deleteUserServ = exports.updateUserServ = exports.allUserRolServ = exports.getUserServ = exports.allUsers = void 0;
const users_1 = require("./../seeders/users");
const User = require("../models/user");
const Identification = require("../models/identification");
const Role = require("../models/role");
const axios_1 = __importDefault(require("axios"));
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
const updateUserServ = (id, userp, token) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const URL = process.env.URL_PRODUCTION_CORE || process.env.URL_DEVELOP_CORE;
    const baseUrlPatchCustomer = `${URL}/client/update-client`;
    const baseUrlGetCustomer = `${URL}/client/get-client`;
    try {
        const { numIdent, firstName, lastName, email, phone, identId, roleId, clientId, status, deleteClient } = userp;
        if (deleteClient) {
            try {
                const [updateUser] = yield User.update({ numIdent, firstName, lastName, email, phone, identId, roleId, clientId: null, status }, {
                    where: {
                        id,
                    },
                    returning: true,
                });
                const { data } = yield axios_1.default.get(`${baseUrlGetCustomer}/${clientId}`);
                const userAppArray = (_c = (_b = (_a = data.client) === null || _a === void 0 ? void 0 : _a.client) === null || _b === void 0 ? void 0 : _b.user_app) === null || _c === void 0 ? void 0 : _c.filter((c) => c.user_id !== id);
                yield axios_1.default.patch(`${baseUrlPatchCustomer}/${clientId}`, Object.assign(Object.assign({}, data.client.client), { user_app: userAppArray }), {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-token': token
                    }
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
            }
            catch (error) {
                console.log('error: ', error);
                throw ('ERROR: ' + error);
            }
        }
        else {
            const [updateUser] = yield User.update({ numIdent, firstName, lastName, email, phone, identId, roleId, clientId, status }, {
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
//Tech
const allTechServ = (page, pageSize) => __awaiter(void 0, void 0, void 0, function* () {
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
                        where: { role: "Tecnico", status: false },
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
exports.allTechServ = allTechServ;
