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
exports.getIdentifications = exports.createIdentification = void 0;
const identification_services_1 = require("../services/identification.services");
//Register new identification
const createIdentification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const identification = yield (0, identification_services_1.createIdentServ)(req.body);
        res.status(200).json(identification);
    }
    catch (e) {
        console.log(e);
    }
});
exports.createIdentification = createIdentification;
// Get all identifications
const getIdentifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const identifications = yield (0, identification_services_1.getIdentServ)();
        res.status(200).json(identifications);
    }
    catch (e) {
        console.log(e);
    }
});
exports.getIdentifications = getIdentifications;
