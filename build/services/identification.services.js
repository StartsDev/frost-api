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
exports.deleteIdentServ = exports.updateIdentServ = exports.getIdentServ = exports.createIdentServ = void 0;
const Identification = require("../models/identification");
// Create identification
const createIdentServ = (ident) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findIdent = yield Identification.findOne({
            where: { name: ident.name },
        });
        if (findIdent) {
            return {
                msg: "Este tipo de identificación ya está registrada...",
                success: false,
            };
        }
        const newIdent = yield Identification.create(ident);
        if (!newIdent) {
            return {
                msg: "Error al registrar el tipo de identifiación...",
                success: false,
            };
        }
        return {
            msg: "Identificación registrada satisfactoriamente...",
            newIdent,
            success: true,
        };
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.createIdentServ = createIdentServ;
// Get all identifications
const getIdentServ = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const identifications = yield Identification.findAll();
        return {
            identifications,
            success: true,
        };
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.getIdentServ = getIdentServ;
//Update identification
const updateIdentServ = (id, cli) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const identFound = yield Identification.findOne({ where: { id } });
        if (!identFound) {
            return {
                msg: "Identificación no encontrada",
                success: false,
            };
        }
        const [updateIdent] = yield Identification.update(cli, {
            where: {
                id,
            },
            returning: true,
        });
        if (updateIdent <= 0) {
            return {
                msg: "Actualización no realizada...",
                success: false,
            };
        }
        const ident = yield Identification.findOne({ where: { id } });
        return {
            msg: "Identificación actualizada satisfactoriamente...",
            ident,
            success: true,
        };
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.updateIdentServ = updateIdentServ;
//Delete identification
const deleteIdentServ = (ident) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const identification = yield Identification.destroy({
            where: {
                id: ident,
            },
        });
        if (!identification) {
            return {
                msg: "El tipo de identificación no esta registrado...",
                success: false,
            };
        }
        return {
            msg: "Identificación eliminada...",
            success: true,
        };
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.deleteIdentServ = deleteIdentServ;
