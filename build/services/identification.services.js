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
exports.getIdentServ = exports.createIdentServ = void 0;
const Identification = require('../models/identification');
const createIdentServ = (ident) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findIdent = yield Identification.findOne({ where: { name: ident.name } });
        if (findIdent) {
            return {
                msg: "This identification type already exists",
            };
        }
        const newIdent = yield Identification.create(ident);
        if (newIdent === null) {
            return {
                msg: "Failed to register identification type",
            };
        }
        return {
            msg: "Identification type created successfully...",
            data: newIdent,
        };
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.createIdentServ = createIdentServ;
const getIdentServ = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const identifications = yield Identification.findAll();
        return {
            data: identifications
        };
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.getIdentServ = getIdentServ;
