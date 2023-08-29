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
exports.bulkCreatefunction = void 0;
const bulkCreatefunction = (model, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield model.bulkCreate(data);
        console.log(res);
        return res;
    }
    catch (error) {
        return {
            message: 'hubo un error en la creacion',
            success: false
        };
    }
});
exports.bulkCreatefunction = bulkCreatefunction;
