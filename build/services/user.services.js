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
const User = require('../models/user');
const Identification = require('../models/identification');
const Role = require('../models/role');
const allUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.findAll({
            where: { status: false },
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
        return {
            users,
        };
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
                msg: "This user doesn't exist",
                success: false
            };
        }
        return {
            user: findUser,
            success: true
        };
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.getUserServ = getUserServ;
const allUserRolServ = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersRol = yield User.findAll({
            where: { roleId: user },
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
        if (!usersRol) {
            return {
                msg: "Users does exist with that role",
                users: [],
            };
        }
        return { users: usersRol };
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.allUserRolServ = allUserRolServ;
const updateUserServ = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { numIdent, firstName, lastName, email, phone, identId, roleId } = user;
        const [updateUser] = yield User.update({ numIdent, firstName, lastName, email, phone, identId, roleId }, {
            where: {
                id,
            },
            returning: true,
        });
        if (!updateUser) {
            return {
                msg: "User no valid",
            };
        }
        return {
            msg: "User updated succesfully"
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
                msg: "User no valid",
            };
        }
        const deletedUser = yield User.update({ status: true }, {
            where: {
                id,
            },
        });
        if (!deletedUser) {
            return {
                msg: "User no valid",
            };
        }
        return {
            msg: "User deleted succesfully",
        };
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.deleteUserServ = deleteUserServ;
