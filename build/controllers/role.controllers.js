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
exports.deleteRole = exports.updateRole = exports.getRoles = exports.createRole = void 0;
const role_services_1 = require("../services/role.services");
//Register new role
const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = yield (0, role_services_1.createRoleServ)(req.body);
        res.status(200).json(role);
    }
    catch (e) {
        console.log(e);
    }
});
exports.createRole = createRole;
const getRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield (0, role_services_1.getRoleServ)();
        res.status(200).json(roles);
    }
    catch (e) {
        console.log(e);
    }
});
exports.getRoles = getRoles;
//Update role
const updateRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const identification = yield (0, role_services_1.updateRoleServ)(req.params.id, req.body);
        res.status(200).json(identification);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
});
exports.updateRole = updateRole;
// Delete role
const deleteRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const identifications = yield (0, role_services_1.deleteRoleServ)(req.params.id);
        res.status(200).json(identifications);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
});
exports.deleteRole = deleteRole;
