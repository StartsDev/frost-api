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
exports.upImgEquip = void 0;
const avatar_service_1 = require("../services/avatar.service");
const { uploadImageCloud } = require("../utils/cloudinary");
const upImgEquip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tempFilePath } = req.files.image;
        const { id } = req.params;
        const secure_url = yield uploadImageCloud(tempFilePath);
        const response = yield (0, avatar_service_1.uploadAvatarServ)(secure_url, id);
        res.status(200).json(response);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
});
exports.upImgEquip = upImgEquip;
