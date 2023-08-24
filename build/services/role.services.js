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
exports.deleteRoleServ = exports.updateRoleServ = exports.getRoleServ = exports.createRoleServ = void 0;
const Role = require('../models/role');
// Create role
const createRoleServ = (role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findRole = yield Role.findOne({ where: { role: role.role } });
        if (findRole) {
            return {
                msg: "Este rol ya existe...",
                succcess: false
            };
        }
        const newRole = yield Role.create(role);
        if (!newRole) {
            return {
                msg: "Problemas al registrar el rol...",
                success: false
            };
        }
        return {
            msg: "Rol creado satisfactoriamente...",
            newRole,
            success: true
        };
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.createRoleServ = createRoleServ;
// Get all roles
const getRoleServ = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield Role.findAll();
        return {
            roles,
            success: true
        };
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.getRoleServ = getRoleServ;
//Update role
const updateRoleServ = (id, rol) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roleFound = yield Role.findOne({ where: { id } });
        if (!roleFound) {
            return {
                msg: "Rol no encontrado",
                success: false,
            };
        }
        const [updateRole] = yield Role.update(rol, {
            where: {
                id,
            },
            returning: true,
        });
        if (updateRole <= 0) {
            return {
                msg: "Actualización no realizada...",
                success: false,
            };
        }
        const role = yield Role.findOne({ where: { id } });
        return {
            msg: "Rol actualizado satisfactoriamente...",
            role,
            success: true,
        };
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.updateRoleServ = updateRoleServ;
//Delete role
const deleteRoleServ = (rol) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = yield Role.destroy({
            where: {
                id: rol,
            },
        });
        if (!role) {
            return {
                msg: "Rol no registrado...",
                success: false,
            };
        }
        return {
            msg: "Rol eliminado...",
            success: true,
        };
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.deleteRoleServ = deleteRoleServ;
