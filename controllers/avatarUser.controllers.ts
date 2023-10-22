import { Response } from "express";
import { uploadAvatarServ } from "../services/avatar.service";

const { uploadImageCloud } = require("../utils/cloudinary");

const upImgAvatar = async (req: any, res: Response) => {
  try {
    if (!req.files.image) {
      res.status(400).json({ msg: "Cargue una imagen...", success: false });
    }
    const { tempFilePath } = req.files.image;
    const { id } = req.params;
    const secure_url = await uploadImageCloud(tempFilePath);
    if(!secure_url){
      res.status(400).json("No fue posible subir la imagen...");
    }
    const response = await uploadAvatarServ(secure_url, id);
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

export { upImgAvatar };
