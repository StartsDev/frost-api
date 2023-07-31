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
exports.getRoleServ = exports.createRoleServ = void 0;
const Role = require('../models/role');
const createRoleServ = (role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findRole = yield Role.findOne({ where: { role: role.role } });
        if (findRole) {
            return {
                msg: "This role already exists",
            };
        }
        const newRole = yield Role.create(role);
        if (newRole === null) {
            return {
                msg: "Failed to register role",
            };
        }
        return {
            msg: "Role created successfully...",
            data: newRole,
        };
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.createRoleServ = createRoleServ;
const getRoleServ = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield Role.findAll();
        return {
            data: roles
        };
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.getRoleServ = getRoleServ;
