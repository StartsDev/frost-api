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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { v2: cloudinary } = require('cloudinary');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadImageCloud = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cloudinary.uploader.upload(filePath, { folder: "aires" });
        return result.url;
    }
    catch (error) {
        throw new Error('Upload failed');
    }
});
const deleteImage = (publicId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cloudinary.uploader.destroy(publicId);
});
module.exports = { uploadImageCloud, deleteImage };
