const { v2: cloudinary } = require('cloudinary');
import dotenv from "dotenv";
dotenv.config();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageCloud = async (filePath: string) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {folder: "aires"});
    return result.url;
  } catch (error) {
    throw new Error('Upload failed');
  }
};

const deleteImage = async (publicId: any) => {
  return await cloudinary.uploader.destroy(publicId);
};

module.exports = { uploadImageCloud, deleteImage };
