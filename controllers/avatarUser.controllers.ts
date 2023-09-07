import { Response } from "express";
import { uploadAvatarServ } from "../services/avatar.service";

const { uploadImageCloud } = require("../utils/cloudinary");

const upImgEquip = async (req: any, res: Response) => {
  try {
    const { tempFilePath } = req.files.image;
    const { id } = req.params;
    const secure_url = await uploadImageCloud(tempFilePath);
    const response = await uploadAvatarServ(secure_url, id);
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};


export { upImgEquip };