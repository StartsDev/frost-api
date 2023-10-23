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
exports.uploadAvatarServ = void 0;
const User = require("../models/user");
const { uploadImageCloud } = require("../utils/cloudinary");
const uploadAvatarServ = (image, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findUser = yield User.findOne({
            where: { id }
        });
        if (!findUser) {
            return {
                msg: "Usuario no encontrado...",
                success: false
            };
        }
        const result = yield uploadImageCloud(image);
        const updateUser = yield User.update({ image: result }, {
            where: { id }
        });
        if (updateUser <= 0) {
            return {
                msg: "Actualización no realizada...",
                success: false,
            };
        }
        const user = yield User.findOne({ where: { id } });
        return {
            msg: "Usuario actualizado...",
            user,
            success: true
        };
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.uploadAvatarServ = uploadAvatarServ;
